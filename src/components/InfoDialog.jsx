import MyButton from "./UI/button/MyButton";
import {forwardRef} from "react";

const InfoDialog = forwardRef((props, ref) => {
    return (
        <dialog ref={ref}>
            <MyButton onClick={props.closeModal}>X</MyButton>
            {
                !props.isInfoLoading &&
                <div>
                    <h1>Size: {props.infoResponse.size} kb</h1>
                    <h1>Created: {props.infoResponse.created}</h1>
                    <h1>Modified: {props.infoResponse.modified}</h1>
                </div>
            }
            {
                props.isInfoLoading &&
                <h1>Loading...</h1>
            }
        </dialog>
    );
})

export default InfoDialog;