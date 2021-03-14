const placesRouter = require('express').Router()
const Place = require('../models/place')
const upload = require('../utils/multer')
const { checkPlace } = require('../utils/placeHandling')
const { addPlace, updatePlace, removePlace, updatePlaceImage } = require('../services/placeService')
const { authenticate } = require('../utils/middleware')
const { checkAdmin, checkVerified } = require('../utils/loginHandling')
const logger = require('../utils/logger')

/**
 * Receives: a get request
 * Does:
 * Returns: 
 */
placesRouter.get('/', async (req, res) => {

  try {
    const places = await Place.find({})

    res.json(places.map(place => place.toJSON()))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives: a post request
 * Does:
 * Returns: 
 */
placesRouter.post('/', authenticate, upload.single('imageData'), async (req, res) => {

  try {
    // if (!req.file) {
    //   res.status(400).json({ error: 'You must upload a picture for the place.' })
    // }
    // const file = req.file
    const body = req.body.place
    const parsed = JSON.parse(body)
    console.log({ parsed })

    await checkAdmin(req.user.username)
    checkVerified(req.user.verified)
    const newPlace = checkPlace(parsed)
    const addedPlace = await addPlace( newPlace)

    res.status(201).json(addedPlace.toJSON())
  } catch (err) {
    console.log({ err })

    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives: a put request
 * Does:
 * Returns: 
 */
placesRouter.put('/:id', authenticate, upload.single('imageData'), async (req, res) => {

  try {
    // let file
    // logger.info(req.file)
    // file = req.file
    const body = req.body.place
    const parsed = JSON.parse(body)
    const id = parsed.id
    logger.info(parsed)

    await checkAdmin(req.user.username)
    checkVerified(req.user.verified)
    const place = checkPlace(parsed)
    const updated = await updatePlace(id, place)

    res.json(updated.toJSON()).status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives: a put request
 * Does:
 * Returns: 
 */
placesRouter.put('/upload/:id', authenticate, upload.single('imageData'), async (req, res) => {

  try {
    const file = req.file
    await checkAdmin(req.user.username)
    checkVerified(req.user.verified)

    const updated = await updatePlaceImage(req.params.id, file)

    res.json(updated.toJSON()).status(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives: a delete request
 * Does:
 * Returns: 
 */
placesRouter.delete('/:id', authenticate, async (req, res) => {

  try {
    await checkAdmin(req.user.id)
    checkVerified(req.user.verified)
    await removePlace(req.params.id)

    res.json(204).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = placesRouter