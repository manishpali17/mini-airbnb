import { data } from "./data.js";
import { Listing } from "../models/listing.js";
import { User } from "../models/user.js"
import connectDB from "../db/index.js";

// For initializing you can simply run this file or run script npm seed 
// the defult user name is  Admin and password admin@123 you can change them below



let sampleListings = data;
connectDB()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });



const initDB = async () => {
  await User.deleteMany({})
  await Listing.deleteMany({});
  const newUser = new User({
    email: "admin@gmail.com",
    username: "Admin",
  });
  const registeredUser = await User.register(newUser, "admin@123");
  sampleListings = sampleListings.map((el) => ({
    ...el,
    owner: registeredUser._id,
  }));
  await Listing.insertMany(sampleListings);
  console.log("data is initialized with user Name Admin and password admin@123");
  process.exit(1)
};

initDB();
