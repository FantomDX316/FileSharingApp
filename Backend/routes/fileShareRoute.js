const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"../Backend/public/uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage});


router.get("/",(req,res)=>{
    console.log(__dirname);
    res.send("done")
});

router.post("/",upload.single("img"),(req,res)=>{
    console.log(req.file);
    res.send("success");
})


module.exports = router;