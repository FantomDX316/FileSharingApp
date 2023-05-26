import React,{ useContext } from "react";
import FileContext from "../../context/FileContext";
import "./Alert.scss"

const Alert = (props) => {
    const context = useContext(FileContext);
    const { alertContent } = context;
    return (
        <>
            <div className="d-flex justify-content-center">
                <div  className={`alertElement text-center alert alert-${alertContent.type}`} role="alert">
                    {alertContent.title}
                </div>
            </div>
        </>
    );
};

export default Alert;