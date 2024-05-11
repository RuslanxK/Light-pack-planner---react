import { models, Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already exists!"],
    require: [true, "Email is required!"],
  },

  username: {
    type: String,
  },

  password: {
      type: String,
  },

  image: {
    type: String,
  },

  profileImageKey: {

      type: String
  },

  verifiedCredentials: {

     type: Boolean,
     default: false
  }

});




const User = models.users || model("users", userSchema);

module.exports = User;
