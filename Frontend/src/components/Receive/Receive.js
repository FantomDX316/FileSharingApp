import React from "react";
import "./Receive.scss";

const Receive = () => {
    const inputHandler = (e) => {

    }
    return (
        <>
            <div className="receive container d-flex justify-content-center align-items-center">
                <div className="receiveCard d-flex flex-column justify-content-center align-items-center">
                    <h2>Enter OTP to download file</h2>
                    <form action="" className="d-flex flex-column justify-content-center align-items-center">
                        <input type="text" onChange={inputHandler} min="6" max="6"/>
                        <button style={{display:"block",margin:"20px"}} type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Receive;