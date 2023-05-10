import React,{ useState,useContext } from "react";
import "./Home.scss";
import ParticlesBg from 'particles-bg'
import axios from "axios";
import FileContext from "../../context/FileContext";


const Home = ()=>{

    const context = useContext(FileContext);
    const {setAlert} = context;

    const [data,setData] = useState("");
    const formData = new FormData();

    const inputHandler = (e)=>{
        setData(e.target.files[0]);
    }

    const uploadHandler = async (e)=>{
        e.preventDefault();
        formData.append("data",data);
        try {
        const response = await axios.post("http://localhost:5000/api/fileUpload",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        setData("");
        const data = response.data;
        if(data.success===true){
            setAlert("success","File Uploaded Successfully")
        }else{
            setAlert("danger","Server Error: Try Again")
        }
    } catch (error) {
        console.error(error);
    }
    }
    return(
    <>
    
        <div className="container d-flex justify-content-center">
            <div className="card d-flex justify-content-center align-items-center  ">
                    <h1>Upload File</h1>
                    <form onSubmit={uploadHandler} encType="multipart/form-data">
                        <input type="file" onChange={inputHandler}/>
                        {/* adding button disabled state -  */}
                        <button  type="submit"  disabled={data===""?true:false} className="btn btn-primary">Upload File</button>
                    </form>
            </div>
        </div>

        <ParticlesBg  type="tadpole" bg={true} /> 
    </>
    );
};

export default Home;