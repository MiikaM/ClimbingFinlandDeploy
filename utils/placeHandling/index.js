const { parsePhoneNumber ,parseAddress, parseName, parseCity, parseDescription, parseOpenHours, parseTags, parseImage, parsePrices, parseUrl, parseEmail
} = require('../parse')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const logger = require('../../utils/logger')

/**
 * 
 * @param {*} object 
 * @returns 
 */
const checkPlace = (object) => {
  const checkedPlace = {
    name: parseName(object.name),
    description: parseDescription(object.description),
    url: parseUrl(object.url),
    openingHours: parseOpenHours(object.openingHours),
    prices: parsePrices(object.prices),
    // image: parseImage(object.image),
    tags: parseTags(object.tags),
    city: parseCity(object.city),
    address: parseAddress(object.address),
    phone: parsePhoneNumber(object.phone),
    email: parseEmail(object.email),
  }

  return checkedPlace
}

/**
 * 
 * @param {*} image 
 * @returns 
 */
const uploadImage = async (image) => {
  try {
    const newPath = `${process.env.UPLOAD_FOLDER_PLACE}${image.filename}`
    const resized = await sharp(image.path)
      .webp({ quality: 85, lossless: true })
      .toFile(
        path.resolve(newPath)
      )

    fs.unlinkSync(image.path)

    return newPath
  } catch (e) {
    logger.error(e.message)
  }
}
module.exports = {checkPlace, uploadImage}