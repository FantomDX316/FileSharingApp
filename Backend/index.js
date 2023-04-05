const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoConnect = require("./dbconnect.js");
dotenv.config();

mongoConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/public",express.static("./public/uploads"))

app.use("/api/",require("./routes/fileShareRoute.js"))

app.listen(process.env.PORT,()=>{
    console.log(`App is listening at ${process.env.server_url}`);
})