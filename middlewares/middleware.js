import { Listing } from "../models/listing.js";
import { ExpressError } from "../utils/ExpressError.js";
import { listingSchema, reviewSchema } from "../schema.js";
import { Review } from "../models/review.js";

// login check
export function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be login to create listing");
    return res.redirect("/login");
  }
  next();
}

// redirecting to original Url
export function redirect(req, res, next) {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

// checking if user is real owner of listing
export async function isOwner(req, res, next) {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.user._id)) {
    req.flash("error", "this is not your listing so get lost!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

// for checking if user is Author of a Review
export async function isReviewAuthor(req, res, next) {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.user._id)) {
    req.flash("error", "you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

// validating Listing schema using joi
export const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// validating Review schema using joi
export const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
