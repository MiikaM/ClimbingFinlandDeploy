const Place = require('../models/place')
const logger = require('../utils/logger')
const { uploadImage } = require('../utils/placeHandling')
const fs = require('fs')

/**
 * 
 * @param {*} place 
 * @returns 
 */
const addPlace = async ( place, file=null) => {

  // if (file !== null) {
  //   const imagePath = await uploadImage(file)
  //   place.image = imagePath
  // }
  console.log({place})
  

  const newPlace = new Place({
    ...place
  })

  console.log({newPlace})
  

  const savedPlace = await newPlace.save()
  return savedPlace
}

/**
 * 
 * @param {*} id 
 * @param {*} place 
 * @returns 
 */
const updatePlace = async (id, place, file = null) => {
  // if (file !== null) {
  //   const imagePath = await uploadImage(file)
  //   place.image = imagePath
  // }

  // logger.info({ place, id, file })

  const placeToUpdate = await Place.findByIdAndUpdate(id, place, { runValidators: true, context: 'query' })

  // if (file === null && placeToUpdate.image !== null && placeToUpdate.image !== '') {
  //   try {
  //     fs.unlinkSync(placeToUpdate.image)
  //   } catch (err) {
  //     logger.error(err.message)
  //   }
  // }
  console.log({ placeToUpdate })

  if (!placeToUpdate) {
    throw new Error('Couldn\'t find the place you were trying to update.')
  }

  const newPlace = await Place.findById(id)
  console.log({ newPlace })

  return newPlace
}

/**
 * 
 * @param {*} id 
 * @param {*} image 
 * @returns 
 */
const updatePlaceImage = async (id, image) => {
  const placeToUpdate = await Place.findById(id)

  if (!placeToUpdate) {
    throw new Error('Couldn\'t find the place you were trying to update.')
  }



  const updatedPlace = await placeToUpdate.save()

  return updatedPlace
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const removePlace = async (id) => {
  const placeToRemove = await Place.findByIdAndDelete(id)

  if (!placeToRemove) {
    throw new Error('Couldn\'t find the place you were trying to remove.')
  }

  return placeToRemove
}

module.exports = {
  addPlace,
  updatePlace,
  removePlace,
  updatePlaceImage
}