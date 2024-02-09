import { models, Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already exists!"],
    require: [true, "Email is required!"],
  },

  username: {
    type: String,
    required: [true, "Username is required!"],
  },

  image: {
    type: String,
  },
});




const User = models.users || model("users", userSchema);

module.exports = User;
