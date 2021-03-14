const AdminUser = require('../../models/adminUser')
const bcrypt = require('bcrypt')
const OnSiteUser = require('../../models/onSiteUser')
const ThirdPartyUser = require('../../models/thirdPartyUser')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const logger = require('../logger')
const UserBase = require('../../models/userBase')
const { hashPassword } = require('../../services/userService')

/**
 * 
 * @param {*} user_data 
 * @returns 
 */
const userChecker = async (user_data) => {


  if (!user_data.password) {
    throw new Error('Password is invalid')
  }
  const passwords = { newPassword: user_data.password, newPasswordAgain: user_data.passwordagain }
  const passwordHash = await hashPassword(passwords)

  if (user_data.adminVerification && user_data.adminVerification === process.env.ADMINSECRET) {
    return createAdmin(user_data, passwordHash)
  }

  return createOnSite(user_data, passwordHash)
}

/**
 * 
 * @param {*} user_data 
 * @returns 
 */
const userCheckerThirdParty = async (user_data) => {

  if (user_data.iss !== process.env.PROJECT_ISS || user_data.aud !== process.env.PROJECT_ID || !checkIatExp(user_data.iat, user_data.exp)) {
    throw new Error('User token is not authenticated by google.')
  }

  const user = await createThirdParty(user_data)


  if (!user) {
    throw new Error('User creation failed.')
  }

  return user
}

/**
 * 
 * @param {*} iat 
 * @param {*} exp 
 * @returns 
 */
const checkIatExp = (iat, exp) => {
  const iatCorrect = ((Math.round((new Date()).getTime() / 1000)) > iat)
  const expCorrect = ((Math.round((new Date()).getTime() / 1000)) < exp)
  return (iatCorrect && expCorrect)
}

/**
 * 
 * @param {*} thirdParty_data 
 * @returns 
 */
const createThirdParty = async (thirdParty_data) => {

  if (!thirdParty_data.email_verified) {
    throw new Error('In order to use a Google account to sign in, you must have your google account verified.')
  }
  const thirdParty = new ThirdPartyUser({
    username: await hashUsername(thirdParty_data.name),
    idSub: thirdParty_data.sub,
    name: thirdParty_data.name,
    verified: thirdParty_data.email_verified,
    email: thirdParty_data.email,
    avatar: thirdParty_data.picture
  })


  return thirdParty
}

/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
const rndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 
 * @param {*} name 
 * @returns 
 */
const hashUsername = async (name) => {

  const nameSplitted = name.split(' ')
  let boolean = true
  let usernameJoined = ''
  while (boolean) {
    const username = nameSplitted.map(namePart => namePart.substring(0, rndInteger(0, namePart.length)))
    usernameJoined = username.join('').toLowerCase()
    const user = await UserBase.find({ username: username })

    if (user.length > 0) {
      continue
    }

    if (usernameJoined.length < 6) continue
    boolean = false
  }



  return usernameJoined

}

/**
 * 
 * @param {*} admin_data 
 * @param {*} passwordHash 
 * @returns 
 */
const createAdmin = (admin_data, passwordHash) => {

  const admin = new AdminUser({
    name: admin_data.username,
    username: admin_data.username,
    email: admin_data.email,
    password: passwordHash,
    city: admin_data.city,
    description: admin_data.description
  })

  return admin
}

/**
 * 
 * @param {*} onSite_data 
 * @param {*} passwordHash 
 * @returns 
 */
const createOnSite = (onSite_data, passwordHash) => {

  const onSite = new OnSiteUser({
    name: onSite_data.username,
    username: onSite_data.username,
    email: onSite_data.email,
    password: passwordHash,
    city: onSite_data.city,
    description: onSite_data.description
  })

  return onSite
}

/**
 * 
 * @param {*} image 
 * @returns 
 */
const resizeImage = async (image) => {

  try {
    const resizePath = `${process.env.UPLOAD_FOLDER_RESIZED}${image.filename}`
    const resized = await sharp(image.path)
      .resize({
        fit: sharp.fit.contain,
        width: 370
      })
      .webp({ quality: 85, lossless: true })
      .toFile(
        path.resolve(resizePath)
      )

    fs.unlinkSync(image.path)

    return resizePath
  } catch (e) {
    logger.error(e.message)
  }
}

module.exports = {
  userChecker,
  userCheckerThirdParty,
  resizeImage
}