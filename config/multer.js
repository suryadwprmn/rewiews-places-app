const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/image/"));
    },
    //filename harus diberi prefix
    filename: function (req, file, cb) {
        const prefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, prefix + "-" + path.extname(file.originalname));

    },
});

const upload = multer({
   storage : storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new ErrorHandler('Only .png, .jpg and .jpeg format allowed!', 405));
        }
    }
});

module.exports = upload;
