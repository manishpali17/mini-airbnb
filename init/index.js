import mongoose from "mongoose";
import { data } from "./data.js";
import { Listing } from "../models/listing.js";

// For initializing the database with sample data, add a user to use their userId as an owner to gain access to update and delete listings.
let sampleListings = data;

async function main() {
  await mongoose.connect("your connection string");
}
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });
const initDB = async () => {
  await Listing.deleteMany({});
  // create a user through sign up and use userid as a owner .
  sampleListings = sampleListings.map((el) => ({
    ...el,
    owner: "your userId for smaple data",
  }));
  await Listing.insertMany(sampleListings);
  console.log("data was initialized");
};

initDB();
