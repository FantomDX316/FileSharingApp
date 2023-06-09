import React, { useState, useContext } from "react";
import "./Home.scss";
import ParticlesBg from 'particles-bg'
import axios from "axios";
import FileContext from "../../context/FileContext";
import Loader from "../Loader/Loader";


const Home = () => {


    const context = useContext(FileContext);
    const { setAlert } = context;

    //data is the input file
    const [data, setData] = useState("");
    //using formData to store the file
    const formData = new FormData();

    //upload success handling state
    const [uploadSuccess, setUploadSuccess] = useState(false);
    //otp from backend
    const [otp, setOtp] = useState("");


    //input handler
    const inputHandler = (e) => {
        setData(e.target.files[0]);
        console.log(e.target.files)
    }

    //state to for loader
    const [loader,setLoader] = useState(false)

    const uploadHandler = async (e) => {
        formData.append("data", data);
        try {
            e.preventDefault();
            // const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_DEV_URL}${process.env.REACT_APP_PORT}/api/fileUpload`, formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data"
            //     }
            // });
            setLoader(true);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/fileUpload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });


            setData("");

            //handling the json response from backend server
            const data = response.data;

            //checking the response from the server
            if (data.success === true) {
                setLoader(false)
                setAlert("success", "File Uploaded Successfully");
                setUploadSuccess(true);
                setOtp(data.otp);
                setTimeout(() => {
                    setUploadSuccess(false);
                    setOtp("");
                }, 1000 * 60)
            } else {
                setLoader(false);
                setAlert("danger", "Server Error: Try Again");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return loader?<Loader/>:(
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="card_holder col-md-12 col-sm-12 col-12 d-flex justify-content-center align-items-center ">
                        <div className="card col-md-6 col-sm-10 col-10 m-5 d-flex align-items-center justify-content-center">
                            {uploadSuccess ?
                                <>
                                    <h3>Use Below OTP to Download the File</h3>
                                    <p style={{ fontWeight: "bolder", fontSize: "2rem", color: "green" }}>{otp}</p>
                                    <p style={{ fontSize: "1.1rem",color:"red" }}>OTP is valid for about 5 mins....</p>
                                </>
                                :
                                <>
                                
                                    <h1 className="col-md-12 text-center" style={{ fontWeight: "bolder", color: "blueviolet" }}>Upload File</h1>
                                    <form encType="multipart/form-data" className="col-md-10">
                                        <div className="inputHolder col-md-12 text-center">
                                            <input type="file" onChange={inputHandler} className="text-center m-3" style={{width:"88px"}} />
                                            <h6>{data.name}</h6>
                                        </div>
                                        {/* adding button disabled state -  */}
                                        <div className="button col-md-12 text-center m-2" onClick={uploadHandler}>
                                            <button className={`${data === "" ? "" : "active"}`}  disabled={data === "" ? true : false}>Upload File</button>
                                        </div>
                                    </form>
                                </>
                            }

                        </div>
                    </div>

                </div>
            </div>


            {/* <ParticlesBg type="ball" bg={true} /> */}
        </>
    );
};

export default Home;