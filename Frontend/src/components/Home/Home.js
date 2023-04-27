import React,{ useState } from "react";
import "./Home.scss";
import ParticlesBg from 'particles-bg'
import axios from "axios";


const Home = ()=>{

    const [data,setData] = useState("");
    const formData = new FormData();

    const inputHandler = (e)=>{
        setData(e.target.files[0]);
    }

    const uploadHandler = async (e)=>{
        e.preventDefault();
        formData.append("file",data);
        const response = await axios.post("http://localhost:5000",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        console.log(response.data)
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