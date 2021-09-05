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
    const newList = await TodolistModel.create(req.body.Todolist)
    // console.log(newList)
    const userId = req.payload.id
    const user = await UserModel.findById(userId)
    // console.log(user)
    user.lists.push(newList.id)
    await user.save()
    // user.notes.pusj(newNote.id)
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const updateTodolist = async (req, res) => {
  try {
    await TodolistModel.findByIdAndUpdate(req.body.Todolist.id, {
      title: req.body.Todolist.title,
    })
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

const deleteTodolist = async (req, res) => {
  try {
    await TodolistModel.findByIdAndDelete(req.body.id)
    // const user = await UserModel.findById(userId)
    // user.lists.filter((id) => id !== req.body.id)
    // await user.save()
    const userId = req.payload.id
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { lists: { $in: [req.body.id] } },
    })
    return res.json({ msg: 'success', statusCode: 0 })
  } catch (err) {
    return res.json({ err: 'server error', statusCode: 1 })
  }
}

module.exports = { addTodolist, updateTodolist, deleteTodolist }
