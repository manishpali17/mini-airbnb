import express from "express";
import { wrapAsync } from "../utils/wrapAsync.js";
import {
  isLoggedIn,
  isOwner,
  validateListing,
} from "../middlewares/middleware.js";
import listingController from "../controllers/listings.js";
import { storage } from "../utils/cloudConfig.js";
import multer from "multer";

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});
const router = express.Router();

//index Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listings[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//new route
router.route("/new").get(isLoggedIn, listingController.renderNewForm);
// Show Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listings[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));
// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
export default router;
