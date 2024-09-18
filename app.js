const express = require("express");
const engine = require('ejs-mate');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const port = 3000;
//method override
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/User");
const LocalStrategy = require("passport-local");
const passport = require('passport');


//middleware
const ErrorHandler = require("./utils/ErrorHandler");

//connect to mongodb
async function main() {
    // URL koneksi ke MongoDB
    const uri = "mongodb://localhost:27017/directory-listing-app";
    try {
        await mongoose.connect(uri);
        console.log("Terhubung ke MongoDB dengan Mongoose");
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);

//set
app.engine('ejs', engine); // dari template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(port, () => `Server running on port 127.0.0.1:${port}`);


//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//session
app.use(session({
    secret: "rahasia-bang",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // Menggunakan objek Date yang valid
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 hari
    }
}));

// Passport.js middleware
app.use(passport.initialize());
app.use(passport.session()); 

//passport
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
    //penggunaan ada di routes dan di app.js
})


//route
app.get("/", (req, res) => {
    res.render("home");
});
app.use("/", require("./routes/auth"));
app.use("/places", require("./routes/place"));
app.use("/places/:id/reviews", require("./routes/review"));


// Implementasi dari kelas Error Handler
app.use((err, req, res, next) => {
   const { statusCode = 500 } = err;
   if (!err.message) {
       err.message = "Something went wrong";
   }
   res.status(statusCode).render("error", { err });
});

//jika url tidak ada dan taruh paling bawah
app.all("*", (req, res, next) => {
    next(new ErrorHandler('Page not found', 404));
});





//buat data dummy








