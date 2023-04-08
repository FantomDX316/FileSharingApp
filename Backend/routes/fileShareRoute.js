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
router.post("/uploadfile", (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                res.status(500).json({ "success": false, "error": "file size should be less than 5mb" });
            } else {
                console.log(req.file)
                const code = parseInt(100000 + Math.random() * 900000);
                const fileShare = new fileShareModel({
                    fileName: req.file.filename,
                    filePath: req.file.path,
                    fileCode: code,
                    fileSize:parseInt((req.file.size)*0.001)
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

router.post("/recievefile",[body("fileCode", "code should be of 6 characters").isLength({ min: 6, max: 6 })],async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(500).json({ "success": false, errors });
        };

        const { fileCode } = req.body;
        const file = await fileShareModel.findOne({ fileCode });
        if (!file) {
            return res.status(200).render("download",{data:{expires:true}});
        } else {
            
            return res.render("download",{data:{expires:false,fileName:file.fileName,fileSize:file.fileSize}})
        }

    } catch (error) { res.status(500).json({ "success": false }) }
});


module.exports = router;