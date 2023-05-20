import React, { useState, useContext } from "react";
import "./Home.scss";
import ParticlesBg from 'particles-bg'
import axios from "axios";
import FileContext from "../../context/FileContext";


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
    }

    const uploadHandler = async (e) => {
        e.preventDefault();
        formData.append("data", data);
        try {
            const response = await axios.post("http://localhost:5000/api/fileUpload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setData("");

            //handling the json response from backend server
            const data = response.data;

            //checking the response from the server
            if (data.success === true) {
                setAlert("success", "File Uploaded Successfully");
                setUploadSuccess(true);
                setOtp(data.otp);
                setTimeout(() => {
                    setUploadSuccess(false);
                    setOtp("");
                }, 1000 * 60)
            } else {
                setAlert("danger", "Server Error: Try Again");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>

            <div className="container">
                <div className="d-flex justify-content-center align-items-center  ">
                    <div className="card d-flex justify-content-center align-items-center">
                        {uploadSuccess ?
                            <>
                                <h1>Use Below OTP to Download the File</h1>
                                <p style={{ fontWeight: "bolder", fontSize: "2rem", color: "blue" }}>{otp}</p>
                                <p style={{ fontSize: "1.1rem" }}>OTP is valid for about 5 mins....</p>
                            </>
                            :
                            <>
                                <h1 className="col-md-12 text-center">Upload File</h1>
                                <form onSubmit={uploadHandler} encType="multipart/form-data">
                                    <input type="file" onChange={inputHandler} className="col-md-12 text-center m-3" />
                                    {/* adding button disabled state -  */}
                                    <div className="button col-md-12 text-center m-2">
                                        <button className={`${data===""?"":"active"}`} type="submit" disabled={data === "" ? true : false}>Upload File</button>
                                    </div>
                                </form>
                            </>
                        }
                    </div>
                </div>

            </div>

            <ParticlesBg type="tadpole" bg={true} />
        </>
    );
};

export default Home;