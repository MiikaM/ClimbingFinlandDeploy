const validator = require('../utils/validator')
const helper = require('./test_helpers')
const cities = require('../data/cities.json')

describe('Checks hours and minutes correctly: hasHourMinutes', () => {

  test('correct times', () => {
    // const result = []
    const result = helper.correctTimes.map(time => validator.hasHourMinutes(time))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('incorrect times', () => {
    const result = helper.wrongTimes.map(time => validator.hasHourMinutes(time))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })

})

describe('Checks that day has an open and closing time: hasOpenClose', () => {

  test('Handles correct day inputs correctly and returns true', () => {
    const result = helper.correctDays.map(day => validator.hasOpenClose(day))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('Handles incorrect time inputs correctly and throws an TypeError', () => {
    const result = []
    for (let i = 0; i < helper.wrongDaysIncorrect.length; i++) {
      try {
        validator.hasOpenClose(helper.wrongDaysIncorrect[i])
      } catch (error) {
        result.push(error)
      }
    }

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBeInstanceOf(TypeError)
      expect(result[index]).toHaveProperty('message', 'Incorrect opening or closing time input')
    }
    expect(result).toHaveLength(helper.wrongDaysIncorrect.length)

  })

  test('Handles missing time inputs correctly and throws an TypeError', () => {
    const result = []
    for (let i = 0; i < helper.wrongDaysMissing.length; i++) {
      try {
        validator.hasOpenClose(helper.wrongDaysMissing[i])
      } catch (error) {
        result.push(error)
      }
    }
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBeInstanceOf(TypeError)
      expect(result[index]).toHaveProperty('message', 'Missing opening or closing time input')
    }

    expect(result).toHaveLength(helper.wrongDaysMissing.length)
  })
})

describe('Checks that week has correct input of days: hasDays', () => {

  test('Handles correct inputs by returning true', () => {
    const result = helper.correctWeek.map(day => validator.hasDays(day))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('Handles incorrect time inputs correctly and throws an TypeError', () => {
    const result = []
    for (let i = 0; i < helper.wrongWeekUndefined.length; i++) {
      try {
        validator.hasDays(helper.wrongWeekUndefined[i])
      } catch (error) {
        result.push(error)
      }
    }

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBeInstanceOf(TypeError)
      expect(result[index].message).toContain('Incorrect or missing week input')
    }

    expect(result).toHaveLength(helper.wrongWeekUndefined.length)
  })

  test('Handles incorrect time inputs correctly and throws an TypeError', () => {
    const result = helper.wrongWeekBadInputs.map(day => validator.hasDays(day))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('IsUrl works as intended', () => {

  test('Works with correct urls', () => {
    const result = helper.correctURLs.map(url => validator.isUrl(url))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('Handles incorrect urls correctly', () => {
    const result = helper.wrongURLs.map(url => validator.isUrl(url))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('isString works as intended', () => {

  test('Returns true for strings', () => {
    const result = helper.correctTimes.map(time => validator.isString(time))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('Returns false on non strings', () => {
    const numberArray = []

    for (let i = 0; i < 1000; i++) {
      numberArray.push(Math.random() * 1000000 + 1)
    }

    const result = numberArray.map(number => validator.isString(number))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('isStringArray works as intended', () => {

  test('Returns true for a string array', () => {
    const arrays = [...helper.wrongTimes, ...helper.correctTimes, ...helper.correctURLs]
    const result = arrays.map(array => validator.isStringArray(array))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('Returns false for a non string array', () => {
    const numArray = []
    for (let index = 0; index < 50; index++) {
      numArray.push(Math.random() * 1000 + 1)
    }
    const arrays = [...numArray, ...helper.wrongWeekBadInputs, ...helper.correctWeek, ...helper.wrongDaysIncorrect]
    const result = arrays.map(array => validator.isStringArray(array))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('isObject works as inntended', () => {

  test('Returns true for objects', () => {
    const arrays = [...helper.correctDays, ...helper.wrongDaysIncorrect, ...helper.correctWeek]
    const result = arrays.map(bigObject => validator.isObject(bigObject))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('Returns false on non objects', () => {
    const arrays = [...helper.correctURLs, ...helper.correctTimes, ...helper.wrongTimes]
    for (let i = 0; i < 1000; i++) {
      arrays.push(Math.random() * 1000000 + 1)
    }
    const result = arrays.map(number => validator.isObject(number))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('isCity works as intended', () => {

  test('isCity returns true when the city is in the finnish city list', () => {
    const result = cities.map(city => validator.isCity(city))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('isCity returns false when the city is not in the finnish city list', () => {
    const result = helper.wrongCities.map(city => validator.isCity(city))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('isPicture works as intended', () => {

  test('isPicture returns true when the string has any image file ending', () => {
    const result = helper.imageUrls.map(image => validator.isPicture(image))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('isPicture returns false when the string doesnt have any image file ending', () => {
    const result = helper.wrongImageURLs.map(image => validator.isPicture(image))
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('isPrice checks that the input is a number or undefined/null', () => {

  test('isPrice returns true when the input is a number', () => {
    const numberArray = []
    for (let i = 0; i < 1000; i++) {
      numberArray.push(Math.random() * 10000000 + 1)
    }
    const result = numberArray.map(price => validator.isPrice(price))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('isPrice returns false  when the input is not a number', () => {
    const numberArray = []
    for (let i = 0; i < 1000; i++) {
      numberArray.push(Math.random() * (-10000000) - 1)
    }
    const arrays = [...helper.correctTimes, ...helper.wrongCities, ...helper.correctDays, ...helper.wrongWeekUndefined, ...helper.wrongURLs, ...helper.wrongWeekBadInputs, ...numberArray]
    const result = arrays.map(price => validator.isPrice(price))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }
  })
})

describe('hasPriceCategory checks that category at least has properties "onetime", "tentime", "month"', () => {

  test('hasPriceCategory returns true when the input is not empty and has properties: "onetime", "tentime", "month" and the pricing is correct', () => {

    const result = helper.priceCategories.map(priceCategory => validator.hasPriceCategories(priceCategory))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }
  })

  test('hasPriceCategory throws an error when the input is not a number', () => {

    const result = []
    for (let i = 0; i < helper.incorrectPrices.length; i++) {
      try {
        const value = validator.hasPriceCategories(helper.incorrectPrices[i])
        result.push(value)
      } catch (error) {
        result.push(error)
      }
    }

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBeInstanceOf(Error)
      expect(result[index].message).toContain('Incorrect input of price')
    }

  })

  test('hasPriceCategory throws an error when the input doesnt contain properties: "onetime", "tentime", "month"', () => {

    const result = []
    for (let i = 0; i < helper.incorrectCategories.length; i++) {
      try {
        const value = validator.hasPriceCategories(helper.incorrectCategories[i])
        result.push(value)
      } catch (error) {
        result.push(error)
      }
    }

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBeInstanceOf(Error)
      expect(result[index].message).toContain('Incorrect input of price array: prices need to be defined for "onetime", "tentime" and "month"')
    }

  })

  test('hasPriceCategory throws error: "Missing or invalid price category input" when the input is empty or wrong', () => {

    const result = []
    for (let i = 0; i < helper.nullCategories.length; i++) {
      try {
        const value = validator.hasPriceCategories(helper.nullCategories[i])
        result.push(value)
      } catch (error) {
        result.push(error)
      }
    }

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBeInstanceOf(TypeError)
      expect(result[index].message).toContain('Missing or invalid price category input')
    }

  })
})

describe('hasPrices checks that the price category is not empty', () => {

  test('If input is correct then returns true', () => {
    const result = helper.pricing.map(prices => validator.hasPrices(prices))

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(true)
    }

    expect(result).toHaveLength(helper.pricing.length)
  })

  test('If input is wrong then throws an "Incorrect or missing pricing input"', () => {
    const result = []
    for (let i = 0; i < helper.wrongPricing.length; i++) {
      try {
        const value = validator.hasPrices(helper.wrongPricing[i])
        result.push(value)
      } catch (error) {
        result.push(error)
      }
    }

    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBeInstanceOf(TypeError)
      expect(result[index].message).toContain('Incorrect or missing pricing input')
    }

    expect(result).toHaveLength(helper.wrongPricing.length)
  })

  test('Wrong inputs in other function gets catched', () => {
    const result = []
    for (let i = 0; i < helper.wrongPricing2.length; i++) {
      try {
        const value = validator.hasPrices(helper.wrongPricing2[i])
        result.push(value)
      } catch (error) {
        result.push(error)
      }
    }
    for (let index = 0; index < result.length; index++) {
      expect(result[index]).toBe(false)
    }

    expect(result).toHaveLength(helper.wrongPricing2.length)
  })

})