import { Listing } from "../models/listing.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
import dotenv from "dotenv";
import { destroy } from "../utils/cloudConfig.js";
dotenv.config();
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

const renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};
const showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist;");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

const updateListing = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listings.location,
      limit: 1,
    })
    .send();

  let { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listings,
  });
  updatedListing.geometry = response.body.features[0].geometry;
  await updatedListing.save();
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }
  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};

const createListing = async (req, res) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listings.location,
      limit: 1,
    })
    .send();
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listings);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();
  req.flash("success", "New Listings added Successfully");
  res.redirect("/listings");
};

const renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "the listing you requested does not exit");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  // this url is for smaple data
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_256");
  //main url
  originalImageUrl = originalImageUrl.replace("w=800", "w=100");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

const deleteListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  let publicId = listing.image.filename;
  const msg = await destroy(publicId, { resource_type: "image" });
  await Listing.findByIdAndDelete(id);
  console.log(msg);
  req.flash("success", "Listing Deleted:");
  res.redirect("/listings");
};

export default {
  index,
  renderNewForm,
  showListing,
  renderEditForm,
  createListing,
  updateListing,
  deleteListing,
};
