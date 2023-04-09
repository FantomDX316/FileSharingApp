import React from "react";
import "./Home.scss";
import ParticlesBg from 'particles-bg'

const Home = ()=>{
    return(
    <>
    
        <div className="container d-flex justify-content-center">
            <div className="card d-flex justify-content-center align-items-center flex-column ">
                    <h1>Send File</h1>
                    <form >
                        <input type="file" name="file"/>
                        <button type="submit" className="btn btn-primary">Send File</button>
                    </form>
            </div>
        </div>

        <ParticlesBg color="green" type="tadpole" bg={true} />
    </>);
};

export default Home;