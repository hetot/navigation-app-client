import React from 'react';
import MyButton from "./UI/button/MyButton";
import "./styles/File.css"

const File = () => {
    return (
        <div className="file">
            <a className="link" href={'file'}>fileName</a>
            <MyButton>info</MyButton>
            <MyButton>rename</MyButton>
            <MyButton>copy</MyButton>
            <MyButton>move</MyButton>
            <MyButton>delete</MyButton>
        </div>
    );
};

export default File;