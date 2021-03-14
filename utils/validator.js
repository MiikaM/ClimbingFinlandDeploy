const logger = require('./logger')
const validator = require('validator')
const cities = require('../data/cities.json')
const _ = require('lodash')

const timeReg = /\d\d:\d\d/
const pictReg = /\.(gif|jpg|jpeg|tiff|png|webp)/

//Checks if input is a string
const isString = (text) => {
  return typeof text === 'string' || text instanceof String
}

//Checks if input is a string array
const isStringArray = (array) => {
  let length = 0

  for (const str in array) {
    if (isString(str)) {
      length++
    }
  }

  return (length === array.length)
}

//Checks if input is a valid URL
const isUrl = (url) => {
  return validator.isURL(url)
}

//Checks if input is an object
const isObject = (object) => {
  return ((typeof object === 'object' || object instanceof Object) &&
    Object.keys(object).length && Object.keys(object).length !== 0 && !(object.length !== undefined))
}

//Checks if input is a valid city
const isCity = (city) => {
  return cities.includes(city)
}

//Checks if input is a picture
const isPicture = (picture) => {
  return pictReg.test(picture)
}

//Checks if input is has prices
const hasPrices = (prices) => {
  logger.info({prices}, '+', prices.length)

  if (!prices || prices.length <= 0) {
    throw new TypeError('Incorrect or missing pricing input')
  }

  try {
    prices.map(priceCategory => {
      hasPriceCategories(priceCategory)
    })

    return true
  } catch (e) {
    logger.error(e.message)
  }
  return false
}

//Checks if input has price categories: onetime, tentime and month
const hasPriceCategories = (priceCategory) => {

  if (!priceCategory || !isObject(priceCategory)) {
    throw new TypeError('Missing or invalid price category input')
  }

  const prices = { ...priceCategory }


  if (!Object.prototype.hasOwnProperty.call(prices, 'onetime') || !Object.prototype.hasOwnProperty.call(prices, 'tentime') || !Object.prototype.hasOwnProperty.call(prices, 'month')) {
    throw new Error('Incorrect input of price array: prices need to be defined for "onetime", "tentime" and "month"')
  }

  const withoutName = { onetime: prices.onetime, tentime: prices.tentime, month: prices.month }

  Object.values(withoutName).map(price => {
    if (!isPrice(price)) {
      throw new Error('Incorrect input of price')
    }
  })

  return true

}

//Checks if input is has correct prices
const isPrice = (price) => {
  let result = false

  if (typeof price === 'number' || price instanceof Number) result = true
  if (isNaN(price)) return result
  if (price < 0) result = false

  return result
}

//Checks if input is an object and exists
const hasDays = (open_hours) => {
  if (!open_hours || open_hours === undefined || !isObject(open_hours)) {
    throw new TypeError('Incorrect or missing week input')
  }
  try {
    Object.values(open_hours).map(day => {
      hasOpenClose(day)
    })
    return true
  } catch (e) {
    logger.error(e.message)
  }
  return false
}

//Checks if input is a day, object and exists. Also checks if the day has an opening and a closing time
const hasOpenClose = (day) => {

  if (!day || !isObject(day) || !day.open || !day.close) {
    throw new TypeError('Missing opening or closing time input')
  }

  const opening = day.open
  const closing = day.close


  if (!hasHourMinutes(opening) || !hasHourMinutes(closing)) {
    throw new TypeError('Incorrect opening or closing time input')
  }

  return true
}

//Checks if input is a time
const hasHourMinutes = (time) => {

  if (time === 'Closed') return true
  const separator = time.indexOf(':')


  if (separator === -1) return false

  const correctReg = timeReg.test(time)

  let hour = parseInt(time.substring(0, separator))
  let minutes = parseInt(time.substring(separator + 1, time.length))

  if (hour < 24 && hour >= 0) {
    hour = true
  } else hour = false
  if (minutes < 60 && minutes >= 0) { minutes = true } else minutes = false

  return (hour && minutes && correctReg)
}

//Checks if input is a valid phonenumber
const isPhonenumber = (phonenumber) => {
  if (phonenumber === '-') return true

  let numberArray = phonenumber.split(' ').join('').split('')

  switch (numberArray[0]) {
    case '0':
      if (numberArray[1] === '8' && numberArray.length === 9) {
        break
      }
      if (numberArray.length !== 10) {
        return false
      }
      break
    case '+':

      if (numberArray.length !== 13) {
        return false
      }
      numberArray = _.drop(numberArray)
      break
    default:
      return false
  }


  for (let i = 0; i < numberArray.length; i++) {
    const num = parseInt(numberArray[i])

    if (isNaN(num)) {
      return false
    }
  }

  return true
}

module.exports = {
  isString,
  isStringArray,
  isUrl,
  isObject,
  isCity,
  isPicture,
  hasPrices,
  hasPriceCategories,
  isPrice,
  hasDays,
  hasHourMinutes,
  hasOpenClose,
  isPhonenumber
}