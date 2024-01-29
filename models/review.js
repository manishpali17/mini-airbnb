import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps:true});

export const Review = mongoose.model("Review", reviewSchema);
