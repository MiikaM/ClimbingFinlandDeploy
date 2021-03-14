const UserBase = require('../models/userBase')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const { transporter } = require('../utils/nodemailer')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')
const fs = require('fs')

/**
 * 
 * @param {*} userDeleted 
 * @param {*} userDeleting 
 */
const removeUser = async (userDeleted, userDeleting) => {
  logger.info({ userDeleted }, { userDeleting })
  const userToRemove = await UserBase.findOne({ username: userDeleted })
  const userRemoving = await UserBase.findOne({ username: userDeleting })

  logger.info({ userToRemove }, { userRemoving })
  if (!userToRemove) {
    throw new Error('User doesn\'t exist or has already been removed')
  }
  logger.info('id jota poistetaan ', userToRemove._id, ' id joka poistaa ', userRemoving._id)

  logger.info(userToRemove._id !== userRemoving._id)
  logger.info(userToRemove._id === userRemoving._id)
  logger.info(userToRemove._id.equals(userRemoving._id))

  if (!(userToRemove._id.equals(userRemoving._id))) {
    throw new Error('You are not authorized to remove this user')
  }

  const userComments = await Comment.find({ user: userToRemove._id })

  if (userToRemove.avatar !== null && userToRemove.avatar !== '') {
    try {
      fs.unlinkSync(userToRemove.avatar)
    } catch (err) {
      logger.error(err.message)
    }
  }

  await userToRemove.remove()

  const removeComments = userComments.map(async comment => {
    await comment.remove()
  })

  Promise.all(removeComments)

}

/**
 * 
 * @param {*} userToUpdate_username 
 * @param {*} userUpdating 
 * @param {*} newUser 
 * @returns 
 */
const updateUser = async (userToUpdate_username, userUpdating, newUser) => {
  try {
    logger.info({ userToUpdate_username }, { userUpdating }, { newUser })
    if (userToUpdate_username !== userUpdating.username) {
      throw new Error('Only logged in user can update their information.')
    }
    const userToUpdate = { ...newUser, verified: userUpdating.verified }

    const userUpdated = await UserBase.findOneAndUpdate({ username: userToUpdate.username }, userToUpdate, { new: true, runValidators: true, context: 'query' }) //runValidators: true, context: 'query'

    return userUpdated
  } catch (err) {
    logger.error(err.message)
    throw new Error(err.message)
  }
}

/**
 * 
 * @param {*} passwords 
 * @param {*} user 
 */
const changePassword = async (passwords, user) => {
  const oldPassword = passwords.oldPassword
  const userInDb = await UserBase.findOne({ username: user.username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(oldPassword, userInDb.password)

  if (!(userInDb && passwordCorrect)) {
    throw Error('invalid password')
  }

  if (!passwords.newPassword || passwords.newPassword.length < 8) {
    throw new Error('Password minimun length is 8')
  }

  const boolean = (passwords.newPassword === passwords.newPasswordAgain)

  if (!boolean) {
    throw new Error('Passwords doesn\'t match')
  }


  try {
    const newPass = passwords.newPassword

    const saltRounds = parseInt(process.env.SALT_WORK_FACTOR)
    const passwordHash = await bcrypt.hash(newPass, saltRounds)

    userInDb.password = passwordHash

    await userInDb.save()
  } catch (err) {
    logger.error(err.message)
  }
}

/**
 * 
 * @param {*} passwords 
 * @returns 
 */
const hashPassword = async (passwords) => {

  if (!passwords.newPassword || passwords.newPassword.length < 8) {
    throw new Error('Password minimun length is 8')
  }

  const boolean = (passwords.newPassword === passwords.newPasswordAgain)

  if (!boolean) {
    throw new Error('Passwords don\'t match')
  }

  const newPass = passwords.newPassword

  const saltRounds = parseInt(process.env.SALT_WORK_FACTOR)
  const passwordHash = await bcrypt.hash(newPass, saltRounds)

  return passwordHash

}

/**
 * 
 * @param {*} user 
 */
const sendVerificationEmail = (user) => {

  const token = jwt.sign({ user: user.id }, process.env.EMAIL_SECRET, { expiresIn: '1d' })
  const url = `https://climbing-finland-v2.herokuapp.com/api/verification/${token}`

  transporter.sendMail({
    to: user.email, // list of receivers
    subject: 'Verify your account', // Subject line
    html: `<h1>Verify</h1><div>Verify your email by clicking the link below <br/> <a href=${url}>${url}</a></p></div>`, // html body
  })

}

/**
 * 
 * @param {*} user 
 */
const sendResetPasswordEmail = (user) => {
  try {
    const token = jwt.sign({ user }, process.env.RESET_SECRET, { expiresIn: '1h' })

    const url = `https://climbing-finland-v2.herokuapp.com/api/passwordReset/${token}`

    transporter.sendMail({
      to: user.email,
      subject: 'Reset your password',
      html: `<h1>Link to reset your Password</h1> 
      <div>You can reset your password by clicking on the link below <br/>
      <a href=${url}>${url}</a>
      </div>`
    })
  } catch (err) {
    logger.error(err.message)
  }
}

module.exports = {
  removeUser,
  sendVerificationEmail,
  updateUser,
  changePassword,
  hashPassword,
  sendResetPasswordEmail
}