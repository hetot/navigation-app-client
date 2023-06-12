import React, {forwardRef} from 'react';
import MyButton from "./UI/button/MyButton";

const DeleteDialog = forwardRef((props, ref) => {
    return (
        <dialog ref={ref}>
            <h1>
                "{props.fileName}" will be deleted
            </h1>
            <div>
                <MyButton onClick={props.closeModal}>No</MyButton>
                <MyButton onClick={props.deleteFile}>Yes</MyButton>
            </div>
        </dialog>
    );
})

export default DeleteDialog;