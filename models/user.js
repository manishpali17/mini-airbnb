import mongoose from "mongoose";
import local from "passport-local-mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
});
userSchema.plugin(local);
export const User = mongoose.model("User", userSchema);
