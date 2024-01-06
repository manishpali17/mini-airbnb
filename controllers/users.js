import { User } from "../models/user.js";

const signupRender = (req, res) => {
  res.render("listings/signup.ejs");
};

const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("seccess", "welcome to wonderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

const loginRender = (req, res) => {
  res.render("listings/login.ejs");
};

const login = async (req, res) => {
  req.flash("success", "welcome to WonderLust");
  let redirectUrl = res.locals.redirectUrl || "listings";
  res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
export default {
  signup,
  login,
  logout,
  signupRender,
  loginRender,
};
