import mongoose from "mongoose";
import { Review } from "./review.js";
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    filename: { type: String, required: true },
    url: { type: String, required: true },
  },
  price: { type: Number, required: true },
  location: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
export const Listing = mongoose.model("Listing", listingSchema);
