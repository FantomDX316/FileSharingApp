const express = require("express");
const router = express.Router();
const multer = require("multer");

//storage option for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

//calling multer constructor function
const maxSize = 1000 * 1024 * 5;
const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
})


//file route
router.post("/fileUpload", upload.single("data"), (req, res) => {
    try {
        console.log(req.file);
        const data = {
            expires:false,
            fileName:req.file.filename,
            fileSize:req.file.size

        }
        res.render("download",{data});

    } catch (error) { console.log(error) }
})
module.exports = router;


