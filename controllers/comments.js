const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const { checkComment } = require('../utils/commentHandling')
const { addComment, removeComment } = require('../services/commentService')
const { authenticate } = require('../utils/middleware')
const Place = require('../models/place')
const logger = require('../utils/logger')

/**
 * Receives a get request to get all the comments of an user
 */
commentsRouter.get('/', async (req, res) => {

  try {
    const comments = await Comment.find({}).populate('user', { name: 1, avatar: 1, username: 1})

    res.status(200).json(comments.map(place => place.toJSON()))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives a get request to find all the comments for a specific place.
 * Checks if there is a place and then finds its' comments.
 * Sends back the list of comments.
 */
commentsRouter.get('/:place_name', async (req, res) => {

  try {
    const place = await Place.findOne({ name: req.params.place_name })

    if (!place) {
      res.status(404).json({ error: 'We couln\'t find the place you were looking for.' })
    }

    const comments = await Comment.find({ place: place._id }).populate('user', { name: 1, avatar: 1, username: 1 })

    res.status(200).json(comments.map(comment => comment.toJSON()))
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives: a post request
 * Does:
 * Returns: 
 */
commentsRouter.post('/', authenticate, async (req, res) => {

  try {
    const body = req.body
    const newComment = await checkComment(body, body.id, req.user)
    const addedComment = await addComment(newComment)
    const comment = await Comment.findById(addedComment.id ).populate('user', { name: 1, avatar: 1, username: 1 })
    console.log({comment})
    
    res.status(201).json(comment.toJSON())
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * Receives: a delete request
 * Does:
 * Returns: 
 */
commentsRouter.delete('/:id', authenticate, async (req, res) => {
  
  try {
    await removeComment(req.params.id, req.user.id)
    res.json(204).end()
  } catch (err) {
    res.status(40).json({ error: err.message })
  }
})

module.exports = commentsRouter