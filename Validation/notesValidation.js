const Joi = require('joi')

const validateAddNote = (req, res, next) => {
  console.log('HERE')
  const schema = Joi.object({
    Note: Joi.object({
      title: Joi.string().required().allow(''),
      content: Joi.string().required(),
    }).required(),
  })

  const isValid = schema.validate(req.body)
  if (isValid.error) {
    console.log(isValid.error)
    return res.json({
      statusCode: 1,
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateUpdateNote = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required().allow(''),
    content: Joi.string().required(),
  })

  const isValid = schema.validate(req.body)
  if (isValid.error) {
    return res.json({
      statusCode: 1,
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateDeleteNote = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  })

  const isValid = schema.validate(req.body)
  if (isValid.error) {
    return res.json({
      statusCode: 1,
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

module.exports = {
  validateAddNote,
  validateUpdateNote,
  validateDeleteNote,
}
