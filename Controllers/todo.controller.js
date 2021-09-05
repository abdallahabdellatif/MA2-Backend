const TodolistModel = require("../Models/todolist.model");
const TodoModel = require("../Models/todo.model");

const getMyTodos = async (req, res) => {
  try {
    console.log(req.body.id);
    const list = await TodolistModel.findById(req.body.id).populate("todos");
    return res.json({
      msg: "Tasks retrieved successfully",
      statusCode: 0,
      list,
    });
  } catch (err) {
    return res.json({ err: "server error", statusCode: 1 });
  }
};

const addTodo = async (req, res) => {
  try {
    const newTodo = await TodoModel.create({
      content: req.body.Todo.content,
      priority: req.body.Todo.priority,
    });
    // const newList = await TodolistModel.create(req.body.Todolist)
    // const userId = req.payload.id
    const list = await TodolistModel.findById(req.body.Todo.listId);
    list.todos.push(newTodo.id);
    await list.save();
    // user.notes.pusj(newNote.id)
    return res.json({ msg: "Task added successfully", statusCode: 0 });
  } catch (err) {
    return res.json({ err: "server error", statusCode: 1 });
  }
};

const updateTodo = async (req, res) => {
  try {
    // console.log(req.body.Todo.id)
    await TodoModel.findByIdAndUpdate(req.body.Todo.id, {
      content: req.body.Todo.content,
      priority: req.body.Todo.priority,
    });
    return res.json({ msg: "Task updated successfully", statusCode: 0 });
  } catch (err) {
    return res.json({ err: "server error", statusCode: 1 });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await TodoModel.findByIdAndDelete(req.body.Todo.id);
    await TodolistModel.findByIdAndUpdate(req.body.Todo.listId, {
      $pull: { todos: { $in: [req.body.Todo.id] } },
    });
    return res.json({ msg: "Task deleted successfully", statusCode: 0 });
  } catch (err) {
    return res.json({ err: "server error", statusCode: 1 });
  }
};

module.exports = { getMyTodos, addTodo, updateTodo, deleteTodo };
