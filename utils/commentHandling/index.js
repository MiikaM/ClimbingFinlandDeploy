const { parseComment, parseDate } = require('../parse')
const Place = require('../../models/place')
const UserBase = require('../../models/userBase')

/**
 * 
 * @param {*} object 
 * @param {*} place 
 * @param {*} user 
 * @returns 
 */
const checkComment = async (object, place, user) => {
  const date = new Date()
  const placeInDb = await Place.findById(place)
  const userInDb = await UserBase.findOne({ username: user.username })

  if (!placeInDb) {
    throw new Error('We couln\'t find the place you were looking for.')
  }
  if (!placeInDb) {
    throw new Error('Not logged in.')
  }

  const checkedPlace = {
    comment: parseComment(object.comment),
    user: userInDb.id,
    place: place,
    date: parseDate(date),
  }

  return checkedPlace
}

module.exports = { checkComment }