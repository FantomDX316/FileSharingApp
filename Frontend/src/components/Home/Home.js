import React,{ useState } from "react";
import "./Home.scss";
import ParticlesBg from 'particles-bg'
import axios from "axios";


const Home = ()=>{

    const [data,setData] = useState("");

    const inputHandler = (e)=>{
        setData(e.target.files[0]);
    }

    const uploadHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000",data);
    }
    return(
    <>
    
        <div className="container d-flex justify-content-center">
            <div className="card d-flex justify-content-center align-items-center  ">
                    <h1>Upload File</h1>
                    <form onSubmit={uploadHandler}>
                        <input type="file" onChange={inputHandler}/>
                        <button type="submit"  className="btn btn-primary">Upload File</button>
                    </form>
            </div>
        </div>

        <ParticlesBg  type="tadpole" bg={true} /> 
    </>);
};

export default Home;