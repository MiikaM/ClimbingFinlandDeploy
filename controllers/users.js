const usersRouter = require('express').Router()
const UserBase = require('../models/userBase')
const { userChecker, resizeImage } = require('../utils/userHandling')
const { removeUser, sendVerificationEmail, updateUser, changePassword } = require('../services/userService')
const logger = require('../utils/logger')
const upload = require('../utils/multer')
const fs = require('fs')
const { authenticate } = require('../utils/middleware')
const { checkVerified } = require('../utils/loginHandling')
const jwt = require('jsonwebtoken')

/**
 * Get's all the users
 */
usersRouter.get('/', async (req, res) => {

  try {
    const users = await UserBase.find({}).populate('favouritePlaces', { name: 1, description: 1 })

    res.status(200).json(users.map(u => u.toJSON()))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Get's users info based on their username
 */
usersRouter.get('/:username', async (req, res) => {

  try {
    const user = await UserBase.findOne({ username: req.params.username })

    if (!user) res.status(404).json({ error: `Couldn\'t find the user: ${req.params.username}.` })
    res.status(200).json(user.toJSON())
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives a post request for user creation sends the data to be checked. Saves the data and sends the verification email. 
 */
usersRouter.post('/', async (req, res) => {

  try {
    const body = req.body

    const userToSave = await userChecker(body)
    const savedUser = await userToSave.save()

    sendVerificationEmail(savedUser)
    res.status(200).send('Successful registeration.').end()
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
})

/**
 * Receives a delete request to remove an user.
 */
usersRouter.delete('/:username', authenticate, async (req, res) => {

  try {
    await removeUser(req.params.username, req.user.username)
    res.json(204).end()
  } catch (err) {
    logger.error(err)
    res.status(401).json({ error: err.message })
  }
})


/**
 * Receives a put request to update user info.
 * Checks if the user is verified, sends the data to be updated.
 * Handles a token for a new user session and sends back the user object.
 */
usersRouter.put('/:username', authenticate, async (req, res) => {

  try {
    const body = req.body
    checkVerified(req.user.verified)
    const updatedUser = await updateUser(req.params.username, req.user, body)
    logger.info({ updatedUser })

    const userForToken = {
      username: updatedUser.username,
      description: updatedUser.description,
      name: updatedUser.name,
      favouritePlaces: updatedUser.favouritePlaces,
      role: updatedUser.role,
      email: updatedUser.email,
      verified: updatedUser.verified,
      avatar: updatedUser.avatar,
      city: updatedUser.city,
      type: updatedUser.type
    }
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
      .send({
        username: updatedUser.username,
        description: updatedUser.description,
        name: updatedUser.name,
        favouritePlaces: updatedUser.favouritePlaces,
        role: updatedUser.role,
        email: updatedUser.email,
        verified: updatedUser.verified,
        avatar: updatedUser.avatar,
        city: updatedUser.city,
        type: updatedUser.type

      })
  } catch (err) {
    logger.error({ err })
    res.status(400).json({ err: err.message })
  }
})

/**
 * Receives a put request to change an users password.
 */
usersRouter.put('/changePassword/:username', authenticate, async (req, res) => {
  const body = req.body

  try {
    await changePassword(body, req.user)
    res.status(204).end()
  } catch (err) {
    res.status(401).send(err.message)
  }

})

/**
 * Receives a put request to upload a profile picture for the user.
 * Verifies the user and finds the user by username. 
 * Sends the imagefile to be resized and deletes an old image if there is one and replaces it with the new one.
 * Handles a token for a new user session and sends back the user object.
 */
usersRouter.put('/update/uploadImage', authenticate, upload.single('imageData'), async (req, res) => {

  try {
    const body = req.body
    const file = req.file

    checkVerified(req.user.verified)

    const user = await UserBase.findOne({ username: req.user.username })

    if (!user) res.status(404).json({ error: `Couldn\'t find user: ${req.user.username}` })

    const resizedImagePath = await resizeImage(file)

    if (user.avatar === null || user.avatar !== '') {
      try {
        fs.unlinkSync(user.avatar)
      } catch (err) {
        logger.error(err.message)
      }
    }

    user.avatar = resizedImagePath
    const updatedUser = await user.save()

    const userForToken = {
      username: updatedUser.username,
      description: updatedUser.description,
      name: updatedUser.name,
      favouritePlaces: updatedUser.favouritePlaces,
      role: updatedUser.role,
      email: updatedUser.email,
      verified: updatedUser.verified,
      avatar: updatedUser.avatar,
      city: updatedUser.city,
      type: updatedUser.type
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
      .send({
        username: updatedUser.username,
        description: updatedUser.description,
        name: updatedUser.name,
        favouritePlaces: updatedUser.favouritePlaces,
        role: updatedUser.role,
        email: updatedUser.email,
        verified: updatedUser.verified,
        avatar: updatedUser.avatar,
        city: updatedUser.city,
        type: updatedUser.type

      })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = usersRouter