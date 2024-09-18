const isGuest = (req, res, next) => {
    if(req.isAuthenticated()){
        req.flash("error_msg", "Please logout first");
        return res.redirect("/places");
    }
    next();
}