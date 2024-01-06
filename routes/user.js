import express from "express";
import { wrapAsync } from "../utils/wrapAsync.js";
import passport from "passport";
import { redirect } from "../middlewares/middleware.js";
import userController from "../controllers/users.js";

const router = express.Router();

router
  .route("/signup")
  .get(userController.signupRender)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.loginRender)
  .post(
    redirect,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

export default router;
