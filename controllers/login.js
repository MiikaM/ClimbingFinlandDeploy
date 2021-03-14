const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { validateGoogleUser, validateOnSiteUser } = require('../utils/loginHandling')
const logger = require('../utils/logger')
const { authenticate } = require('../utils/middleware')

/**
 * Receives a post request to create an user. 
 * Checks if the user is thirdparty or an on-site user and sends the data to be validated.
 * Checks if the user is verified. You are unable to login without being verified. 
 * Handles a token for a new user session and sends back the user object.
 */
loginRouter.post('/', async (req, res) => {

  try {
    const body = req.body
    let validatedUser

    if (body.type === 'google') {
      validatedUser = await validateGoogleUser(req.token)
    }

    if (body.type === 'onSite') {
      validatedUser = await validateOnSiteUser(body.user)
    }

    // res.status(204).end()
    if (!validatedUser) {
      res.status(404).json({
        error: 'Invalid username or password'
      })
    }

    if (!validatedUser.verified) {
      res.status(401).json({ error: 'Please confirm your email to login.' })
    }

    const userForToken = {
      username: validatedUser.username,
      description: validatedUser.description,
      name: validatedUser.name,
      favouritePlaces: validatedUser.favouritePlaces,
      role: validatedUser.role,
      email: validatedUser.email,
      verified: validatedUser.verified,
      avatar: validatedUser.avatar,
      city: validatedUser.city,
      type: validatedUser.type
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

    res.status(200).cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
      .send({
        username: validatedUser.username,
        description: validatedUser.description,
        name: validatedUser.name,
        favouritePlaces: validatedUser.favouritePlaces,
        role: validatedUser.role,
        email: validatedUser.email,
        verified: validatedUser.verified,
        avatar: validatedUser.avatar,
        city: validatedUser.city,
        type: validatedUser.type
      })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Checks if an user is logged in by checking the token.
 */
loginRouter.get('/check', authenticate, (req, res) => {
  res.status(200).send(req.user)
})

/**
 * Logs out the user.
 */
loginRouter.get('/logout', (req, res) => {
  res.clearCookie('token').status(204).end()
})

module.exports = loginRouter