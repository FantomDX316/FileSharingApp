const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");

const fs = require("fs");

//storage option for multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const maxSize = (5*1024*1024) ;
//multer constructor 
const upload = multer({storage,limits:{fileSize:maxSize}}).single("img");

const fileShareModel = require("../model/fileShareModel.js");


router.get("/",(req,res)=>{
    console.log(__dirname);
    res.send("done")
});

router.post("/",(req,res)=>{
    try{
        upload(req,res, async function(err){
            if(err){
                res.status(500).json({"success":false,"error":"file size should be less than 5mb"});
            }else{
                // console.log(req.file)
                
                const code = parseInt(100000 + Math.random() * 900000);
                const fileShare = new fileShareModel({
                    fileName:req.file.filename,
                    filePath:req.file.path,
                    fileCode:code
                });
                fileShare.save().then((file)=>{
                    console.log(file);

                }).catch(error=>console.log(error.message));

                res.status(200).json({"success":true,"fileCode":code});

            }
        });
    }catch(error){
        res.status(500).json({"success":false});
    }
})


module.exports = router;