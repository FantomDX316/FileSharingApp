import {useContext} from "react";
import FileContext from "../../context/FileContext";

const Alert = (props) => {
    const context = useContext(FileContext);
    const {alertContent} = context;
    return (
        <>
            <div style={{position:"absolute",left:"50%",top:"10%",translate:"-50% 0",zIndex:"3",backgroundColor:"lightGreen",color:"white",fontWeight:"bolder"}} className={`alert alert-${alertContent.type}`} role="alert">
                {alertContent.title}
            </div>
        </>
    );
};

export default Alert;