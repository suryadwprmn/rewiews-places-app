const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Review");

const placeSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
  
}, {
    timestamps: true
});

//menghapus relasi review di data place
//hapus data parent beserta relasinya
placeSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id:{ $in : doc.reviews}});
    }
})



module.exports = mongoose.model("Place", placeSchema);