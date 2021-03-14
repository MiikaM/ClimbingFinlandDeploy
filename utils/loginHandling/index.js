const admin = require('../../services/firebaseService')
const bcrypt = require('bcrypt')
const ThirdPartyUser = require('../../models/thirdPartyUser')
const UserBase = require('../../models/userBase')
const { userCheckerThirdParty } = require('../userHandling')
const logger = require('../logger')

/**
 * 
 * @param {*} token 
 * @returns 
 */
const validateGoogleUser = async (token) => {
  const ticket = await checkTicket(token)
  const userId = ticket['sub']
  let userInDb = await ThirdPartyUser.findOne({ idSub: userId })

  if (!userInDb) {
    try {
      const userToSave = await userCheckerThirdParty(ticket)
      userInDb = await userToSave.save()
    } catch (e) {
      logger.error(e.message)
      throw new Error('Error on registering thirdparty user.')
    }
  }


  return userInDb

}

/**
 * 
 * @param {*} user 
 * @returns 
 */
const validateOnSiteUser = async (user) => {

  const userInDb = await UserBase.findOne({ username: user.username })

  if (!userInDb) {
    throw Error('Invalid username or password.')
  }


  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(user.password, userInDb.password)

  if (!(user && passwordCorrect)) {
    throw Error('invalid username or password')
  }


  return userInDb
}

/**
 * 
 * @param {*} token 
 * @returns 
 */
const checkTicket = async (token) => {
  try {
    const ticket = await admin.auth().verifyIdToken(token)
    return ticket
  } catch (err) {
    logger.error(err.message)
  }
}

/**
 * 
 * @param {*} username 
 */
const checkAdmin = async (username) => {
  console.log({username})
  
  const user = await UserBase.findOne({username: username})

  if (!user) {
    throw new Error('invalid username or password')
  }

  const boolean = (user.type === 'AdminUser' && user.role === 'Admin')

  if (!boolean) {
    throw new Error('You are not authorized to add a new place.')
  }
}

/**
 * 
 * @param {*} verified 
 */
const checkVerified = (verified) => {
  if (!verified) {
    throw new Error('You have to verify your account first.')
  }
}

module.exports = {
  validateGoogleUser,
  validateOnSiteUser,
  checkAdmin,
  checkVerified
}