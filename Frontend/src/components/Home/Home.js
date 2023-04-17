import React,{ useState } from "react";
import "./Home.scss";
import ParticlesBg from 'particles-bg'
import axios from "axios";


const Home = ()=>{
    return(
    <>
    
        <div className="container d-flex justify-content-center">
            <div className="card d-flex justify-content-center align-items-center  ">
                    <h1>Upload File</h1>
                    <form >
                        <input type="file"/>
                        <button type="submit"  className="btn btn-primary">Upload File</button>
                    </form>
            </div>
        </div>

        <ParticlesBg  type="tadpole" bg={true} /> 
    </>);
};

export default Home;