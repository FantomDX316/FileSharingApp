import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FileContext from "../../context/FileContext";
import "./Receive.scss";

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

    //otpVerify state to check whether the otp was verifies or not and this changing the state accordingly
    const [otpVerify, setOtpVerify] = useState(false);

    //submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();

        //setting otp inside an object
        const OTP = { otp };

        //requesting the server to verify the otp
        const response = await axios.post("http://localhost:5000/api/verifyOtp", OTP, { headers: { "Content-Type": "application/json" } });



        //Extracting the response from the server
        const data = response.data;
        if (data.success) {
            setAlert("success", "OTP verified Successfully");
            setId(data.id);
            setOtpVerify(true);
            setTimeout(() => {
                setOtpVerify(false);
            }, 1000 * 20);

        } else {
            setAlert("danger", "Invalid OTP entered");
            navigate("/")

        }
        setOtp("");
    }

    //downloadHandler to allow user to download the file
    const downloadHandler = async(e)=>{
        e.preventDefault();
        await axios.get(`http://localhost:5000/api/downloadFile/${id}`);
    }

    //id of the file to download storing in the form of state
    const [id,setId] = useState("");


    return (
        <>{otpVerify ?
            <div className="receive container d-flex justify-content-center align-items-center">
                <div className="receiveCard d-flex flex-column justify-content-center align-items-center">
                    <h2>Your File is Ready to Download</h2>
                    <form  className="d-flex flex-column justify-content-center align-items-center">
                        <button onClick={downloadHandler} style={{ display: "block", margin: "20px" }} type="submit" className="btn btn-primary">Download File</button>
                    </form>
                </div>
            </div>
            :
            <div className="receive container d-flex justify-content-center align-items-center">
                <div className="receiveCard d-flex flex-column justify-content-center align-items-center">
                    <h2>Enter OTP to download file</h2>
                    <form action="" className="d-flex flex-column justify-content-center align-items-center">
                        <input type="text" onChange={inputHandler} />
                        <button onClick={submitHandler} style={{ display: "block", margin: "20px" }} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>


        }
        </>
    );
};

export default Receive;