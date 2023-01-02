const bcrypt = require('bcryptjs')

const mongoose = require('../mongoose.js')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    id: {type: Number, index: true},
    email: String,
    password: String,
    name: String,
    lastLogin: Date,
    RememberHash: String
  },
  { timestamps: true }
)

userSchema.statics.emailExist = function (email) {
  return this.findOne({ email })
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.toJSON = function () {
  const obj = this.toObject()

  delete obj.password
  delete obj.resetPassword
  delete obj.account.verification.token
  delete obj.account.verification.expiresIn

  return obj
}

const User = mongoose.model('User', userSchema)

module.exports = User
