const mongoose = require('../mongoose.js')

const { Schema } = mongoose

const TodoSchema = new Schema({
  id: {
    type: String,
    required: [true, "Todo ID can't be empty"]
  },
  UserId: {
    type: Number,
    required: [true, "User ID can't be empty"]
  },
  TaskName: {
    type: String,
    required: [true, "Task Name is required"]
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});
const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;