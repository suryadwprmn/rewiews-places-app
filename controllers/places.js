const Place = require("../models/Place");
module.exports.index = async (req, res) => {
    const places = await Place.find({});
    res.render("places/index", { places });
}

module.exports.store = async (req, res) => {
    // Map files to create image objects
    const images = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));
    
    // Create new Place and assign the images and author
    const place = new Place(req.body.place);
    place.author = req.user._id;
    place.images = images;
    
    // Save the place to the database
    await place.save();

    req.flash("success_msg", "Successfully added a new place");
    res.redirect(`/places/${place._id}`);
}


module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render("places/edit", { place });
    
}
module.exports.update = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, req.body.place);
    req.flash("success_msg", "Successfully updated place");
    res.redirect(`/places/${place._id}`);
}

module.exports.destroy = async (req, res) => {
    const { id } = req.params;
    const deletedPlace = await Place.findByIdAndDelete(id);
    req.flash("success_msg", "Successfully deleted place");
    res.redirect("/places");
}

module.exports.show = async (req, res) => {
    const { review_id } = req.params;
    const place = await Place.findById(review_id)
    //nested populate
    .populate({
        path : "reviews",
        populate : {
            path : "author"
        }
    })
    .populate("author"); // populate reviews
    res.render("places/show", { place });
}

//buat ulang semua fungsi route menerapkan dengan hash id

