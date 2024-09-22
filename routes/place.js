const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Place = require("../models/Place");
const PlaceController = require("../controllers/places");

//middleware
const isValidObjectId = require("../middlewares/isValidObjectId");
const validatePlace = require("../middlewares/validatePlace");
const isAuth = require("../middlewares/isAuth");
const { isAuthorPlace} = require("../middlewares/isAuthor");
const upload = require("../config/multer");


router.route("/")
    .get(wrapAsync(PlaceController.index))
    .post( isAuth ,upload.array("image",5),validatePlace, wrapAsync(PlaceController.store));
  

//create
router.get("/new", isAuth, (req, res) => {
    res.render("places/create");
});

router.get("/:id/edit", isAuth ,isValidObjectId("/places") , isAuthorPlace, wrapAsync(PlaceController.edit));

router.route("/:id")
    .put( isAuth ,isValidObjectId("/places") ,upload.array("image", 5),validatePlace, isAuthorPlace, wrapAsync(PlaceController.update))
    .delete(isAuth ,isValidObjectId("/places") , isAuthorPlace,wrapAsync(PlaceController.destroy));

//show
router.get("/:review_id", isValidObjectId("/places") ,wrapAsync(PlaceController.show));

module.exports = router
