
const { hasDays, isString, isUrl, isStringArray, isCity, isPicture, hasPrices, isPhonenumber } = require('./validator')
const { isDate } = require('lodash')

//Checks if name is a string and exists
const parseName = (name) => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name)
  }

  return name
}

//Checks if description is a string and exists
const parseDescription = description => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing text: ' + description)
  }

  return description
}

//Checks if comment is a string and exists
const parseComment = comment => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' + comment)
  }

  return comment
}

//Checks if url is an URL and exists
const parseUrl = (url) => {
  if (!url || !isUrl(url)) {
    throw new Error('Incorrect or missing url: ' + url)
  }

  const urlNew = new URL(url)

  return urlNew
}

//Checks if open_hours has days and exists
const parseOpenHours = (open_hours) => {
  if (!open_hours || !hasDays(open_hours)) {
    throw new Error('Incorrect or missing open hours')
  }

  return open_hours
}

//Checks if prices has pricing and exists
const parsePrices = (prices) => {
  if (!prices || !hasPrices(prices)) {
    throw new Error('Incorrect or missing pricing: ', { prices })
  }

  return prices
}

//Checks if the file is an image
const parseImage = (picture) => {
  if (!picture || !isPicture(picture)) {
    throw new Error('Incorrect or missing image input: ', picture)
  }

  return picture
}

//Checks if tags is an array and exists
const parseTags = (tags) => {
  if (!tags || !isStringArray(tags)) {
    throw new Error('Incorrect or missing tags: ', tags)
  }

  return tags
}

//Checks if city is a valid city and exists
const parseCity = (city) => {
  if (!city || !isCity(city)) {
    throw new Error('Incorrect or missing city input: ', city)
  }

  return city
}

//Checks if date is a valid date and exists
const parseDate = (date) => {
  if (!date || !isDate(date)) {
    throw new Error('Couldn\'t get the time of submission of comment.')
  }

  return date
}

//Checks if addresss is a string and exists
const parseAddress = (address) => {
  if (!address || !isString(address)) {
    throw new Error('Incorrect or missing address: ' + address)
  }

  return address
}

//Checks if phonenumber is a valid phonenumber, string and exists
const parsePhoneNumber = (phonenumber) => {
  if (!phonenumber || !isString(phonenumber) || !isPhonenumber(phonenumber)) {
    throw new Error('Incorrect or missing phone number: ' + phonenumber)
  }

  return phonenumber
}

//Checks if email is a string and exists
const parseEmail = (email) => {
  if (!email || !isString(email)) {
    throw new Error('Incorrect or missing email: ' + email)
  }

  return email
}

module.exports = {
  parseName,
  parseCity,
  parseComment,
  parseDate,
  parseDescription,
  parseImage,
  parseOpenHours,
  parsePrices,
  parseTags,
  parseUrl,
  parseAddress,
  parsePhoneNumber,
  parseEmail
}