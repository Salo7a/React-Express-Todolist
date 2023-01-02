const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");
const Todo = require('../models/TodoSchema');
const User = require('../models/UserSchema');
const {isAuth, NotAuth} = require('../utils/filters');
// Enforces Auth or Not, Disable by Default as Authentication is not yet implemented in The React App
const enableAuth = require('../config/config').AUTHENABLED;

/* Get Todos for user, requires user id as a parameter*/
router.get('/todos/:id', isAuth, async function (req, res, next) {
    // Get User Info
    let userId = req.params.id
    // Deny Access if Authentication enabled and userId doesn't match current user
    if (enableAuth && userId !== req.user.id) return res.status(403).send({msg: "Unauthorized"});
    try {
        let user = await User.findOne({id: userId});
        // Return Error if User Not Found
        if (!user) {
            return res.status(401).send({msg: "User Not Found"});
        }
        //  Find All Todos
        let todos = await Todo.find({UserId: userId})
        res.status(200).send({todos})
    } catch (e) {
        console.error(e)
        return res.status(500).send({msg: "Server Error"})
    }

});

/* Get Specific a Todo info, requires todo id as param */
router.get('/todo/:todoId', isAuth, async function (req, res, next) {
    let todoId = req.params.todoId
    try {
        // Try to find a todo with the given id, return 404 if none was found.
        let todo = await Todo.findOne({id: todoId})
        if (todo) return res.status(200).send({todo})
        else return res.status(404).send({msg: "No Task With This ID Was Found"})
    } catch (e) {
        console.error(e)
        return res.status(500).send({msg: "Server Error"})
    }
});

/* Add Todos for user, requires user id as a param and the task's name as "task" string in the body */
router.post('/todos/:id', isAuth, async function (req, res, next) {
    let userId = req.params.id
    let {task} = req.body
    // Check if User Exists
    let user = await User.findOne({id: userId});
    // Return Error if user doesn't exist
    if (!user) {
        return res.status(401).send({msg: "User Not Found"});
    }
    // TODO: use logged in user's id instead
    // Generate Id For Todo (For ease of use during postman testing)
    let id = randomstring.generate(10);
    try {
        // Create Todo
        let todos = await Todo.create({id: id, UserId: userId, TaskName: task})
        res.status(201).send({todos})
    } catch {
        // Catch errors
        res.status(500).send({msg: "Error Saving To DB"})
    }
});

/* Update Todo State, requires todo id as a param, body includes isCompleted, TaskName or both */
router.put('/todo/:todoId', isAuth, async function (req, res, next) {
    let todoId = req.params.todoId
    let {isCompleted, TaskName} = req.body
    // No Input Data
    if (isCompleted == null && TaskName == null) return res.status(406).send({msg: "Incorrect Input Data"});
    try {
        // Find Todo, throw error if it doesn't exist
        let todo = await Todo.findOne({id: todoId})
        if (!todo) return res.status(401).send({msg: "Todo Not Found"});
        // TODO: Check if owned by current user
        // Update Todo
        if (isCompleted != null) todo.isCompleted = isCompleted
        if (TaskName != null) todo.TaskName = TaskName
        // Save
        todo.save();
        res.status(202).send({todo})
    } catch {
        // Catch Errors
        res.status(500).send({msg: "Error Saving To DB"})
    }
});

/* Delete Todo, requires todo's id as param*/
router.delete('/todo/:todoId', isAuth, async function (req, res, next) {
    let todoId = req.params.todoId
    try {
        // Find Todo, throw error if it doesn't exist
        let todo = await Todo.findOne({id: todoId})
        if (!todo) return res.status(401).send({msg: "Todo Not Found"});
        // TODO: Check if owned by current user
        // Delete Todo
        await Todo.deleteOne({id: todoId})
        res.status(202).send({msg: "Deleted Successfully"})
    } catch {
        // Catch Errors
        res.status(500).send({msg: "Error Deleting Todo"})
    }
});


module.exports = router;
