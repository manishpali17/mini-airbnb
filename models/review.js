import mongoose, { Schema } from "mongoose";

const reviewSchema = mongoose.Schema({
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
});

export const Review = mongoose.model("Review", reviewSchema);
// date.now();
