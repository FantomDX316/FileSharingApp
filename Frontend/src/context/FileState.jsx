import React,{useState} from "react";
import FileContext from "./FileContext.jsx";


const FileState = (props)=>{
    const [alertState,setAlertState] = useState(false);
    const [alertContent,setAlertContent] = useState({type:"",title:""});

    //reusable alert component handler
    const setAlert = (type,title) =>{
        setAlertContent({type,title});
        setAlertState(true)
        setTimeout(()=>{
            setAlertState(false);
            setAlertContent({type:"",title:""})
        },3000);
    }
    return(
        <>
            <FileContext.Provider value={{alertState,alertContent,setAlert}}>
                {props.children}
            </FileContext.Provider>
        </>
    );
};
export default FileState;
