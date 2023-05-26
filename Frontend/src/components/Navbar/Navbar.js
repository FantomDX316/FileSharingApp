import React from "react";
import Tilt from "react-parallax-tilt";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {

    const location = useLocation();
    return (
        <>
            <div className="container">
                <div className="row col-md-12 col-sm-12 col-12 mt-4">

                    <div className="logo col-md-2 col-sm-3 col-4">
                        <div className="col-md-10 col-sm-12 col-12">
                            <Tilt>
                                <Link to="/"> <img src="logo.png" alt="logo" /></Link>
                            </Tilt>
                        </div>
                    </div>

                    <nav className="d-flex align-items-center col-md-10 col-sm-9 col-8">
                        <div className="col-md-5 col-sm-6 col-6">
                            <div className={`${location.pathname==="/"?"active upl col-md-7":" upl col-md-7"}`}>
                                <Link className="uploadFile" to="/">Upload File</Link>
                            </div>

                        </div>
                        <div className=" col-md-5 col-sm-6 col-6">
                            <div className={`${location.pathname==="/receiveFile"?"active rec col-md-7":" rec col-md-7"}`}>
                                <Link className="receiveFile" to="/receiveFile">Receive File</Link>
                            </div>
                        </div>
                    </nav>

                </div>

            </div>

        </>
    );
};

export default Navbar;