const morgan = require('morgan')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

/**
 * Stringifies the token
 */
morgan.token('contents', function (req) {
  return JSON.stringify(req.body)
})

//Logs the request info
const morg = morgan(':method :url :status :res[content-length] - :response-time ms :contents')

/**
 * Receives a not defined endpoint
 * @param {*} request 
 * @param {*} response 
 */
const unknownEndpoint = (request, response) => {
  console.log({request})
  
  response.status(404).send({ error: 'Unknown place' })
}

/**
 * Handles errors
 * @param {*} error 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns 
 */
const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  logger.error(error.message)

  next(error)
}

const authenticate = (req, res, next) => {

  const token = req.cookies.token

  try {
    if (!token) {
      res.clearCookie('token').status(401).send('Unauthorized: No token provided').end()
    } else {
      const decodedToken = jwt.verify(token, process.env.SECRET)

      req.user = {
        username: decodedToken.username,
        description: decodedToken.description,
        name: decodedToken.name,
        favouritePlaces: decodedToken.favouritePlaces,
        role: decodedToken.role,
        email: decodedToken.email,
        verified: decodedToken.verified,
        avatar: decodedToken.avatar,
        city: decodedToken.city,
        type: decodedToken.type
      }

      next()
    }
  } catch (err) {
    res.clearCookie('token').status(401).send('Unauthorized: Invalid token').end()
  }

}

const resetAuthentication = (req, res, next) => {
  const token = req.cookies.token_reset

  try {
    if (!token) {
      res.status(404).send('Page was not found').end()
    } else {
      const decodedToken = jwt.verify(token, process.env.RESET_SECRET)
      if (!decodedToken) {
        res.status(404).send('Page was not found').end()
      }
      req.id = decodedToken.user.id
      next()
    }
  } catch (err) {
    res.status(401).send('Unauthorized: Invalid token').end()
  }

}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  morg,
  unknownEndpoint,
  errorHandler,
  authenticate,
  resetAuthentication,
  tokenExtractor
}
