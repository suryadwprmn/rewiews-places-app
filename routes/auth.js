const express = require("express");
const router = express.Router();
const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

const AuthController = require("../controllers/auth");

// Rute register, hanya bisa diakses oleh guest

router.route("/register")
    .get(AuthController.register)
    .post(wrapAsync(AuthController.registerPost));
// Rute login, hanya bisa diakses oleh guest

router.route("/login")
    .get( AuthController.loginform)
    .post( passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}),AuthController.login);

router.post("/logout", AuthController.logout);

module.exports = router;
