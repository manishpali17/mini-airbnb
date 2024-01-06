import express from "express";
import { wrapAsync } from "../utils/wrapAsync.js";
import {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} from "../middlewares/middleware.js";
import reviewsController from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

//post review route
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewsController.addReview)
);
//delete reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewsController.deleteReview)
);

export default router;
