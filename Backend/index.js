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


app.use("/public",express.static(__dirname+"/public/uploads"))
app.use("/api",require("./routes/fileShareRoute.js"));

const port = process.env.PORT || 5000 ;

app.listen(port,()=>{
    console.log(`App is listening at ${process.env.BACKEND_API_BASE_URL}`);
})