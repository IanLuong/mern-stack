const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

//Static signup method
userSchema.statics.signup = async function (email, password) {
  //Check if email already in use
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error("Email already exists")
  }

  //Hashing password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  //Creating user record
  const user = await this.create({ email, password: hash })

  return user
}

module.exports = mongoose.model("User", userSchema)
