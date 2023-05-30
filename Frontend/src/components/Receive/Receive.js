import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FileContext from "../../context/FileContext";
import { saveAs } from "file-saver";
import "./Receive.scss";
import ParticlesBg from "particles-bg";

const Receive = () => {

    const navigate = useNavigate();

    //extracting data from context
    const context = useContext(FileContext);
    const { setAlert } = context;

    //creating otp state to handle the otp received as input
    const [otp, setOtp] = useState("");
    

    //inputHandler
    const inputHandler = (e) => {
        setOtp(e.target.value);
    }

    //otpVerify state to check whether the otp was verified or not and this changes the state accordingly
    const [otpVerify, setOtpVerify] = useState(false);

    //submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();

        //setting otp inside an object
        const OTP = { otp };

        //requesting the server to verify the otp
        try {
            // const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_DEV_URL}${process.env.REACT_APP_PORT}/api/verifyOtp`, OTP, { headers: { "Content-Type": "application/json" } });
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/verifyOtp`, OTP, { headers: { "Content-Type": "application/json" } });



            const data = response.data;
            // console.log(data);

            if (data.success) {
                setAlert("success", "OTP verified Successfully");
                setId(data.id);
                setOtpVerify(true);
                setTimeout(() => {
                    setOtpVerify(false);
                }, 1000 * 20);
            }

        } catch (error) {
            const data = error.response.data;
            if (!data.success) {
                setAlert("danger", "Invalid OTP entered");
                navigate("/");

            }
        }
    }

    //downloadHandler to allow user to download the file
    const downloadHandler = async (e) => {
        e.preventDefault();
        try {
            // const file = await axios.get(`${process.env.REACT_APP_BACKEND_API_DEV_URL}${process.env.REACT_APP_PORT}/api/downloadFile/${id}`, { responseType: 'blob' });
            const file = await axios.get(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/downloadFile/${id}`, { responseType: 'blob' });
            const { data } = file;
            console.log(data);
            const fileName = Date.now();
            //Handling the file download using the file-saver library saveAs method

            saveAs(data, fileName);
            setOtpVerify(false);
            navigate("/");

            // ------------------------------------------------------------------------------------------------------------------------

            //Below shown method to handle the blob from the backend is by using the dom Manipulation other method is by using file-saver library

            //Creating a temporary url to reference the data file received from the backend 
            // const fileURL = window.URL.createObjectURL(data);
            // console.log(fileURL);
            // //Creating a temporary link element to get triggered when we receive the file
            // const link = document.createElement("a");
            // link.href = fileURL;
            // link.setAttribute("download", "hello");
            // document.body.appendChild(link);
            // link.click();
            // link.remove();

            // // Clean up the temporary URL
            // window.URL.revokeObjectURL(fileURL);

            // ------------------------------------------------------------------------------------------------------------------------



        } catch (error) {
            console.log(error);
        }
    }

    //id of the file to download storing in the form of state
    const [id, setId] = useState("");


    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="receive col-md-12 col-sm-12 col-12 d-flex justify-content-center align-items-center">
                        <div className="receiveCard col-md-6 col-sm-10 col-10 m-5 d-flex align-items-center justify-content-center flex-column">
                            {otpVerify ?
                                <>
                                    <h2 style={{ fontWeight: "bolder", color: "blueviolet"}}>Your File is Ready to Download</h2>
                                    <form className="downloadForm">
                                        <button onClick={downloadHandler} type="submit">Download File</button>
                                    </form>
                                </>
                                :
                                <>
                                    <h2 className="col-md-12 text-center" style={{ fontWeight: "bolder", color: "blueviolet" }}>Enter OTP to download file</h2>
                                    <form action="" className="col-md-10">
                                        <div className="col-md-12 text-center">
                                            <input type="text" onChange={inputHandler} className="otpInput col-md-5 text-center m-3" />
                                        </div>
                                        <div className="button col-md-12 text-center m-2">
                                            <button onClick={submitHandler} onTouchStart className={`${otp === "" ? "" : "active"}`} type="submit" disabled={otp === "" ? true : false}>Submit</button>
                                        </div>
                                    </form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ParticlesBg type="ball" bg={true} />

        </>
    );
};

export default Receive;