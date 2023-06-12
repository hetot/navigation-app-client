import React, {forwardRef, useState} from 'react';
import NavigationService from "../API/NavigationService";
import MyButton from "./UI/button/MyButton";

const CopyDialog = forwardRef((props, ref) => {
    const [destination, setName] = useState('')

    function handleChange(e) {
        setName(e.target.value)
    }

    async function copy() {
        const response = await NavigationService.copy(props.fileName, destination)
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
                copy()
            }}>
                <label>
                    <h3>Destination path</h3>
                    <input type="text" name={"copyDestination"} value={destination} onChange={handleChange}/>
                    <button>Copy</button>
                </label>
            </form>
        </dialog>
    );
})

export default CopyDialog;