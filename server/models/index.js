let MONGODB_CONNECTION_STRING;
try {
  const config = require("../config.json");
  MONGODB_CONNECTION_STRING = config.MONGODB_CONNECTION_STRING;
} catch (error) {
  MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
}

const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/fullstacktest", { useNewUrlParser: true, useUnifiedTopology: true });
// const {TodoSchema} = require('./TodoSchema')
// const {UserSchema} = require('./UserSchema')
const TodoSchema = new mongoose.Schema({
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

  const UserSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: [true, "User ID can't be empty"]
    },
    Name: {
      type: String
    },
    Email: {
      type: String
    },
    password: {
      type: String
    }
  });
  
const Todo = mongoose.model("Todo", TodoSchema, "Todo");
const User = mongoose.model("User", UserSchema, "User");


module.exports = {Todo, User}