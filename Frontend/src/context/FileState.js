import React, { useState } from "react";
//importing context from fileContext
import FileContext from "./FileContext";



// this is a provider component used to provide state to all the child components
const FileState = (props)=>{
    const [alertState,setAlertState] = useState(false);
    const alertFunc = ()=>{

    }
    return(
        <>
            <FileContext.Provider value={{alertState}}>
                {props.children}
            </FileContext.Provider>
        </>
    );
}

export default FileState;