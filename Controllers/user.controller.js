const UserModel = require('../Models/user.model')
const addUser = async (req, res) => {
  try {
    console.log(req.body)
    await UserModel.create(req.body.User)
    return res.json({
      statusCode: 0,
      message: 'Success',
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      statusCode: 1,
      error: 'exception',
    })
  }
}
module.exports = { addUser }
