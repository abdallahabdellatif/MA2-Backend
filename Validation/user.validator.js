const joi = require("joi");
const bcrypt = require("bcrypt");

const validateSignup = (req, res, next) => {
  const schema = joi.object({
    User: joi
      .object({
        name: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().required().pattern(new RegExp("/S+@S+.S+/")),
        password: joi
          .string()
          .required()
          .pattern(
            new RegExp(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$"
            )
          ),
      })
      .required(),
  });

  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.json({
      statusCode: 1,
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateSignin = (req, res, next) => {
  const schema = joi.object({
    User: joi
      .object({
        email: joi.string().required(),
        password: joi.string().required(),
      })
      .required(),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.json({
      statusCode: 1,
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateSignout = (req, res, next) => {};

module.exports = {
  validateSignup,
  validateSignin,
};
