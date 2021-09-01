const Joi = require('joi')

const validateAddTodolist = (req, res, next) => {
  const schema = Joi.object({
    Todolist: Joi.object({
      title : Joi.string().required(),
      todos : Joi.array(),
    }).required(),
    
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

const validateUpdateTodolist = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
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
  validateAddTodolist,
  validateUpdateTodolist,
}