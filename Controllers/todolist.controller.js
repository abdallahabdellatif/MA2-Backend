const TodolistModel = require('../Models/todolist.model')
const UserModel = require('../Models/user.model')
// const getMyTodolists = async (req, res) => {
//     try {
//       const data = await TodolistModel.find({})
//       return res.json({ msg: 'success', statusCode: 0, data })
//     } catch (err) {
//       return res.json({ err: 'server error', statusCode: 1 })
//     }
//   }

const addTodolist = async (req, res) => {
  try {
    const userId = req.payload.id
    if (!(await UserModel.findById(userId))) {
      return res.json({
        error: "Invalid Credentials (Id in payload doesn't belong to a user))",
        statusCode: 1,
      })
    }
    req.body.Todolist.lastEdited = new Date()
    const newList = await TodolistModel.create(req.body.Todolist)
    try {
      const user = await UserModel.findById(userId)
      user.lists.push(newList.id)
      await user.save()
      return res.json({
        message: 'New list added successfully',
        statusCode: 0,
        newList,
      })
    } catch (err) {
      return res.json({ error: 'Server Error', statusCode: 1 })
    }
  } catch (err) {
    return res.json({ error: 'Unauthorised User', statusCode: 1 })
  }
}

const updateTodolist = async (req, res) => {
  try {
    if (!(await TodolistModel.findById(req.body.Todolist.id))) {
      return res.json({ error: "id doesn't belong to a list", statusCode: 1 })
    }
    await TodolistModel.findByIdAndUpdate(req.body.Todolist.id, {
      title: req.body.Todolist.title,
    })
    return res.json({ message: 'List updated successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ error: 'Server Error', statusCode: 1 })
  }
}

// PROBLEM (case of wrong id)
const deleteTodolist = async (req, res) => {
  try {
    const userId = req.payload.id
    if (!(await UserModel.findById(userId))) {
      return res.json({
        error: "Invalid Credentials (Id in payload doesn't belong to a user))",
        statusCode: 1,
      })
    }
    // try {
    //   const list = await TodolistModel.findByIdAndDelete(req.body.id)
    // } catch (err) {
    //   return res.json({
    //     err: 'Resource Not Found',
    //     statusCode: 1,
    //   })
    // }
    if (!(await TodolistModel.findById(req.body.id))) {
      return res.json({
        error: 'Resource Not Found',
        statusCode: 1,
      })
    }
    await TodolistModel.findByIdAndDelete(req.body.id)

    // const user = await UserModel.findById(userId)
    // user.lists.filter((id) => id !== req.body.id)
    // await user.save()

    await UserModel.findByIdAndUpdate(userId, {
      $pull: { lists: { $in: [req.body.id] } },
    })
    return res.json({ message: 'List deleted Successfully', statusCode: 0 })
  } catch (err) {
    return res.json({ error: 'Server Error', statusCode: 1 })
  }
}

module.exports = { addTodolist, updateTodolist, deleteTodolist }
