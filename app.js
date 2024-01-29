import dotenv from "dotenv";
import express from "express";
import ejsmate from "ejs-mate";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { join } from "path";
import methodoverride from "method-override";
import { ExpressError } from "./utils/ExpressError.js";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import localStrategy from "passport-local";
import { User } from "./models/user.js";
import { DB_NAME } from "./constants.js";
import MongoStore from "connect-mongo";

 const sessionStore = new MongoStore({
   mongoUrl: `${process.env.MONGODB_URL}/${DB_NAME}`,
   dbName: "WonderLustDB",
   collectionName: "sessions", // specify the collection name for sessions
 });


if (process.env.NODE_ENV != "production") {
  dotenv.config({ path: "./.env" });
}

export const app = express();

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
  store: sessionStore,
};

//view setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = join(__dirname, "views");
app.set("views", viewsPath);
app.set("view engine", "ejs");
app.engine("ejs", ejsmate);

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  next();
});

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(join(__dirname, "public")));
app.use(methodoverride("_method"));

//routes import 
import listings from "./routes/listing.js";
import reviews from "./routes/review.js";
import userRoute from "./routes/user.js";

//routes
app.use("/", userRoute);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

//home route
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Somthig is worng" } = err;
  res.status(statusCode).render("error.ejs", { message });
  next();
});
// Todo 
// updating listing schema adding categories
// listing controle adding a pipeline to sarch by categories title