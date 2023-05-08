import React,{useState} from "react";
import FileContext from "./FileContext.js";


const FileState = (props)=>{
    const [alertState,setAlertState] = useState(false);
    return(
        <>
            <FileContext.Provider value={{alertState}}>
                {props.children}
            </FileContext.Provider>
        </>
    );
};
export default FileState;
