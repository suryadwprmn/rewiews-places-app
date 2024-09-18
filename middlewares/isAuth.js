// middleware untuk mengecek apakah user sudah login
const isAuth = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("error_msg", "Please login first");
        return res.redirect("/login");
    }
    next();
}

module.exports = isAuth