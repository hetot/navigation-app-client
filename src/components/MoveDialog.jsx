import React, {forwardRef, useState} from 'react';
import NavigationService from "../API/NavigationService";
import MyButton from "./UI/button/MyButton";

const MoveDialog = forwardRef((props, ref) => {
    const [destination, setName] = useState('')

    function handleChange(e) {
        setName(e.target.value)
    }

    async function move() {
        const response = await NavigationService.move(props.fileName, destination)
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
                move()
            }}>
                <label>
                    <h3>Destination path</h3>
                    <input type="text" name={"moveDestination"} value={destination} onChange={handleChange}/>
                    <button>Move</button>
                </label>
            </form>
        </dialog>
    );
})

export default MoveDialog;