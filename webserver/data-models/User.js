const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  dob: { type: String, default: null }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = {
  UserModel,
  UserSchema,
  default: UserSchema
}
