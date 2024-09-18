const User = require("../models/User");

module.exports.register = (req, res) => {
    res.render("auth/register");
}

module.exports.loginform = (req, res) => {
    res.render("auth/login");
}

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash("success_msg", "Successfully logged out.");
        res.redirect("/places");
    });
}

module.exports.registerPost = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success_msg", "Successfully registered and logged in.");
            res.redirect("/places");
        });
       
    } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/register");
    }
}

module.exports.login =  (req, res) => {
    req.flash("success_msg", "Successfully logged in.");
    res.redirect("/places");
}