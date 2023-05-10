import {useContext} from "react";
import FileContext from "../../context/FileContext";

const Alert = (props) => {
    const context = useContext();
    const {alertState} = context;
    return (
        <>
            <div className={`alert alert-${alertState.type}`} role="alert">
                {alertState.title}
            </div>
        </>
    );
};

export default Alert;