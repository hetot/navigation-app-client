import React from 'react';
import classes from './MyButton.module.css'

const MyButton = (props) => {
    return (
        <button disabled={props.disabled} onClick={props.onClick} className={classes.myBtn}>
            {props.children}
        </button>
    );
};

export default MyButton;