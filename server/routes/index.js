const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");
const Todo = require('../models/TodoSchema')
const User = require('../models/UserSchema')

/* Get Todos for user */
router.get('/todos/:id', async function(req, res, next) {
  // Get User Info
  let userId = req.params.id
  let user = await User.findOne({id: userId});
  // Return Error if User Not Found
  if(!user){
    return res.status(401).send({msg: "User Not Found"});
  }
  //  Find All Todos
  let todos = await Todo.find({UserId: userId})
  res.status(200).send({todos})
});

/* Get Specefic Todo */
router.get('/todo/:todoId', async function(req, res, next) {
  let todoId = req.params.todoId
  let todo = await Todo.findOne({id: todoId})
  res.status(200).send({todo})
});

/* Add Todos for user */
router.post('/todos/:id', async function(req, res, next) {
  console.log(req.body);
  let userId = req.params.id
  let {task} = req.body
  // Check if User Exists
  let user = await User.findOne({id: userId});
  if(!user){
    return res.status(401).send({msg: "User Not Found"});
  }
  // Generate Id For Todo (For ease of use during postman testing)
  let id = randomstring.generate(10);
  try {
    let todos = await Todo.create({id:id,UserId: userId, TaskName:task})
    res.status(201).send({todos})
  } catch {
    res.status(500).send({msg: "Error Saving To DB"})
  }
});

/* Update Todo State*/
router.put('/todo/:todoId', async function(req, res, next) {
  let todoId = req.params.todoId
  let {isCompleted, TaskName} = req.body
  if (isCompleted == null && TaskName == null) return res.status(406).send({msg: "Incorrect Input Data"});
  try {
    // Find Todo, throw error if it doesn't exist
    let todo = await Todo.findOne({id:todoId})
    if (!todo) return res.status(401).send({msg: "Todo Not Found"});
    // TODO: Check if owned by current user
    // Update Todo
    if(isCompleted !=null) todo.isCompleted = isCompleted
    if(TaskName !=null) todo.TaskName = TaskName
    // Save
    todo.save();
    res.status(202).send({todo})
  } catch {
    // Catch Errors
    res.status(500).send({msg: "Error Saving To DB"})
  }
});

/* Delete Todo*/
router.delete('/todo/:todoId', async function(req, res, next) {
  let todoId = req.params.todoId
  try {
    // Find Todo, throw error if it doesn't exist
    let todo = await Todo.findOne({id:todoId})
    if (!todo) return res.status(401).send({msg: "Todo Not Found"});
    // TODO: Check if owned by current user
    // Delete Todo
    await Todo.deleteOne({id:todoId})
    res.status(202).send({msg: "Deleted Successfully"})
  } catch {
    // Catch Errors
    res.status(500).send({msg: "Error Deleting Todo"})
  }
});


module.exports = router;
