import React from "react";
//importing context from fileContext
import fileContext from "./fileContext";



// this is a provider component used to provide state to all the child components
const FileState = (props)=>{
    return(
        <>
            <fileContext.Provider>
                {props.children}
            </fileContext.Provider>
        </>
    );
}