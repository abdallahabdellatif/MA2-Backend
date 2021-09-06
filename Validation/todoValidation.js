const Joi = require('joi')

const validateAddTodo = (req, res, next) => {
  const schema = Joi.object({
    Todo: Joi.object({
      listId: Joi.string().required(),
      content: Joi.string().required(),
      priority: Joi.number().required(),
    }).required(),
  })
  // console.log("abdalahhh")

  const isValid = schema.validate(req.body)
  if (isValid.error) {
    return res.json({
      statusCode: 1,
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateUpdateTodo = (req, res, next) => {
  const schema = Joi.object({
    Todo: Joi.object({
      id: Joi.string().required(),
      content: Joi.string().required(),
      priority: Joi.number().required(),
    }),
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
const validateGetTodos = (req, res, next) => {
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

const validateDeleteTodo = (req, res, next) => {
  const schema = Joi.object({
    Todo: Joi.object({
      id: Joi.string().required(),
      listId: Joi.string().required(),
    }),
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
  validateAddTodo,
  validateUpdateTodo,
  validateGetTodos,
  validateDeleteTodo,
}
