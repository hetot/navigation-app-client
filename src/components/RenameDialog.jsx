import React, {forwardRef, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import NavigationService from "../API/NavigationService";

const RenameDialog = forwardRef((props, ref) => {
    const [name, setName] = useState('')

    function handleChange(e) {
        setName(e.target.value)
    }

    async function rename() {
        const response = await NavigationService.rename(props.fileName, name)
        props.closeModal()
        if (response) {
            props.update()
        } else {
            props.setAuth(false)
        }
    }

    return (
        <dialog ref={ref}>
            <MyButton onClick={props.closeModal}>X</MyButton>
            <form onSubmit={event => {
                event.preventDefault()
                rename()
            }}>
                <label>
                    <h3>Type new name</h3>
                    <input type="text" name={"newName"} value={name} onChange={handleChange}/>
                    <button>Rename</button>
                </label>
            </form>
        </dialog>
    );
})

export default RenameDialog;