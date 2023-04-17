const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoConnect = require("./dbconnect.js");
const path = require("path");
dotenv.config();

mongoConnect();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views","./views");
app.use("/public",express.static("./public/uploads"))
app.use("/api",require("./routes/fileShareRoute.js"))

app.listen(process.env.PORT,()=>{
    console.log(`App is listening at ${process.env.server_url}`);
})