import React from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {
    return (
        <>
            <div className="NAV container d-flex align-items-center">
                <div className="logo">
                    <Tilt>
                        <Link to="/"> <img src="logo.png" width="120px" alt="logo" /></Link>
                    </Tilt>
                </div>
                <nav className="d-flex align-items-center">
                    <div className="upl">
                        <Link className="uploadFile" to="/">Upload File</Link>
                        <div className="line"></div>
                    </div>
                    <div className="rec">
                        <Link className="receiveFile" to="/receiveFile">Receive File</Link>
                        <div className="line"></div>
                    </div>
                </nav>
            </div>

        </>
    );
};

export default Navbar;