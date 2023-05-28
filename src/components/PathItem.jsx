import React, {useRef, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import "./styles/File.css"
import NavigationService from "../API/NavigationService";

const PathItem = (props) => {
    const [infoResponse, setInfoResponse] = useState([])
    const [isInfoLoading, setInfoLoading] = useState(false)
    const dialogRef = useRef(null)

    async function deleteFile() {
        if (!confirm("Do you want to delete: " + props.file.path)) {
            return
        }
        let path = ''
        if (props.currentPath[props.currentPath.length - 1] === '/') {
            path = props.currentPath + props.file.path
        } else {
            path = props.currentPath + "/" + props.file.path
        }
        const response = await NavigationService.remove(path)
        console.log(response)
    }

    async function showInfo() {
        setInfoLoading(true)
        dialogRef.current.showModal()
        let path = ''
        if (props.currentPath[props.currentPath.length - 1] === '/') {
            path = props.currentPath + props.file.path
        } else {
            path = props.currentPath + "/" + props.file.path
        }
        const response = await NavigationService.getInfo(path)
        setInfoResponse(response)
        setInfoLoading(false)
    }

    function closeModal() {
        dialogRef.current.close()
    }

    function updatePath() {
        if (props.currentPath[props.currentPath.length - 1] === '/') {
            props.setPath(props.currentPath + props.file.path)
        } else {
            props.setPath(props.currentPath + "/" + props.file.path)
        }
    }

    return (
        <div className="file">
            <div>
                <a className="link" onClick={updatePath}>{props.file.path}</a>
                <MyButton onClick={deleteFile}>Delete</MyButton>
                <MyButton>Rename</MyButton>
                <MyButton>Copy</MyButton>
                <MyButton>Move</MyButton>
                <MyButton onClick={showInfo}>Info</MyButton>
                <dialog ref={dialogRef}>
                    <MyButton onClick={closeModal}>X</MyButton>
                    {
                        !isInfoLoading &&
                        <div>
                            <h1>Name: {infoResponse.name}</h1>
                            <h1>Size: {infoResponse.size} kb</h1>
                            <h1>Created: {infoResponse.created}</h1>
                            <h1>Modified: {infoResponse.modified}</h1>
                        </div>
                    }
                    {
                        isInfoLoading &&
                        <h1>Loading...</h1>
                    }
                </dialog>
            </div>
            <div>Type: {props.file.type}</div>
        </div>
    );
};

export default PathItem;