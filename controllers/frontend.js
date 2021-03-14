const frontendRouter = require('express').Router()
const path = require('path')


frontendRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

frontendRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

module.exports = frontendRouter