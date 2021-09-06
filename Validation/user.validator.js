const joi = require('joi')
const bcrypt = require('bcrypt')

const validateSignup = (req, res, next) => {
  const schema = joi.object({
    User: joi
      .object({
        name: joi.string().required(),
        email: joi
          .string()
          .pattern(new RegExp('^[^@]+@[^@]+.[^@]+$'))
          .required()
          .messages({
            'string.pattern': `email should be of the form name@mail.com`,
            'any.required': 'email is required',
          }),
        password: joi.string().required().min(8).max(25),
      })
      .required(),
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

const validateSignin = (req, res, next) => {
  const schema = joi.object({
    User: joi
      .object({
        email: joi
          .string()
          .pattern(new RegExp('^[^@]+@[^@]+.[^@]+$'))
          .required()
          .messages({
            'string.pattern': `email should be of the form name@mail.com`,
            'any.required': 'email is required',
          }),
        password: joi.string().required(),
      })
      .required(),
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

const validateSignout = (req, res, next) => {}

module.exports = {
  validateSignup,
  validateSignin,
}
