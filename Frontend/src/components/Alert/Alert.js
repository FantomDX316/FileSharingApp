import { useContext } from "react";
import FileContext from "../../context/FileContext";

const Alert = (props) => {
    const context = useContext(FileContext);
    const { alertContent } = context;
    return (
        <>
            <div className="d-flex justify-content-center">
                <div style={{ backgroundColor: "lightGreen", color: "white", fontWeight: "bolder", width: "50%" }} className={`text-center alert alert-${alertContent.type}`} role="alert">
                    {alertContent.title}
                </div>
            </div>
        </>
    );
};

export default Alert;