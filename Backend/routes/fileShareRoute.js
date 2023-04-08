const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const { body, validationResult } = require("express-validator");
// const cron = require("node-cron");
const fs = require("fs");

//storage option for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const maxSize = (5 * 1024 * 1024);
//multer constructor 
const upload = multer({ storage, limits: { fileSize: maxSize } }).single("img");

const fileShareModel = require("../model/fileShareModel.js");



// Route 1 to upload the file to the server
router.get("/",(req,res)=>{
    res.render("download");
});
router.post("/uploadfile", (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                res.status(500).json({ "success": false, "error": "file size should be less than 5mb" });
            } else {
                // console.log(req.file)
                console.log(__dirname);
                const code = parseInt(100000 + Math.random() * 900000);
                const fileShare = new fileShareModel({
                    fileName: req.file.filename,
                    filePath: req.file.path,
                    fileCode: code
                });
                fileShare.save().then(file => console.log(file)).catch((error) => { res.status(500).json({ "success": false, "error": error.message }) });

                res.status(200).json({ "success": true, "fileCode": code });

            }
        });
    } catch (error) {
        res.status(500).json({ "success": false, "error": error.message });
    }
});


//Route 2 to recieve the file from the server

router.get("/recievefile",(req, res) => {
    // try {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(500).json({ "success": false, errors });
    //     };

    //     const { fileCode } = req.body;
    //     const file = await fileShareModel.findOne({ fileCode });
    //     if (!file) {
    //         return res.status(500).json({ "success": false, "error": "file has been expired" });
    //     } else {
            res.status(200).render("download",{data:{
                expires:false,
                fileName:"hello",
                fileSize:"2kb"
            }})
            // res.download(file.filePath, file.fileName);
            // setTimeout(() => {
            //     file.deleteOne({ fileCode: file.fileCode });
            //     fs.unlinkSync(file.filePath);
            //     console.log("files deleted");
            // }, 1000 * 600);
        // }

    // } catch (error) { res.status(500).json({ "success": false }) }
});


module.exports = router;