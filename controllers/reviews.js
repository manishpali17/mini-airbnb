import { Review } from "../models/review.js";
import { Listing } from "../models/listing.js";

const addReview = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New review created");
  res.redirect(`/listings/${listing._id}`);
};

const deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Deleted Successfully");
  res.redirect(`/listings/${id}`);
};

export default { addReview, deleteReview };
