const InputError = (message) => {
  const error = new Error(message)
  return error
}

InputError.prototype = Object.create(Error.prototype)