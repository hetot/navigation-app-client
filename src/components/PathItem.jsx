import React, {forwardRef, useRef, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import "./styles/File.css"
import NavigationService from "../API/NavigationService";
import InfoDialog from "./InfoDialog";
import DeleteDialog from "./DeleteDialog";
import RenameDialog from "./RenameDialog";
import renameDialog from "./RenameDialog";
import CopyDialog from "./CopyDialog";
import copyDialog from "./CopyDialog";
import MoveDialog from "./MoveDialog";

const PathItem = (props) => {
    const infoDialogRef = useRef(null)
    const deleteDialogRef = useRef(null)
    const renameDialogRef = useRef(null)
    const copyDialogRef = useRef(null)
    const moveDialogRef = useRef(null)
    const [infoResponse, setInfoResponse] = useState([])
    const [isInfoLoading, setInfoLoading] = useState(false)

    async function showInfo() {
        setInfoLoading(true)
        infoDialogRef.current.showModal()
        let path
        if (props.currentPath[props.currentPath.length - 1] === '/') {
            path = props.currentPath + props.file.path
        } else {
            path = props.currentPath + "/" + props.file.path
        }
        const response = await NavigationService.getInfo(path)
        if (response) {
            setInfoResponse(response)
            setInfoLoading(false)
        } else {
            props.setAuth(false)
        }
    }

    function showDelete() {
        deleteDialogRef.current.showModal()
    }

    function showMove() {
        moveDialogRef.current.showModal()
    }

    function showRename() {
        renameDialogRef.current.showModal()
    }

    function showCopy() {
        copyDialogRef.current.showModal()
    }

    function closeRenameModal() {
        renameDialogRef.current.close()
    }

    function closeCopyModal() {
        copyDialogRef.current.close()
    }

    function closeMoveModal() {
        moveDialogRef.current.close()
    }

    function closeDeleteModal() {
        deleteDialogRef.current.close()
    }

    function closeInfoModal() {
        infoDialogRef.current.close()
    }

    async function deleteFile() {
        let path
        if (props.currentPath[props.currentPath.length - 1] === '/') {
            path = props.currentPath + props.file.path
        } else {
            console.log(props)
            path = props.currentPath + "/" + props.file.path
        }
        const response = await NavigationService.remove(path)
        closeDeleteModal()
        if (response) {
            props.update()
        } else {
            props.setAuth(false)
        }
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
                <MyButton onClick={showDelete}>Delete</MyButton>
                <MyButton onClick={showRename}>Rename</MyButton>
                <MyButton onClick={showCopy}>Copy</MyButton>
                <MyButton onClick={showMove}>Move</MyButton>
                <MyButton onClick={showInfo}>Info</MyButton>
                <InfoDialog ref={infoDialogRef} infoResponse={infoResponse}
                            isInfoLoading={isInfoLoading} closeModal={closeInfoModal}/>
                <DeleteDialog ref={deleteDialogRef} closeModal={closeDeleteModal} fileName={props.file.path}
                              deleteFile={deleteFile}/>
                <RenameDialog setAuth={props.setAuth} ref={renameDialogRef} closeModal={closeRenameModal}
                              fileName={props.currentPath + "/" + props.file.path} update={props.update}/>
                <CopyDialog setAuth={props.setAuth} ref={copyDialogRef} closeModal={closeCopyModal}
                            fileName={props.currentPath + "/" + props.file.path} update={props.update}/>
                <MoveDialog setAuth={props.setAuth} ref={moveDialogRef} closeModal={closeMoveModal}
                            fileName={props.currentPath + "/" + props.file.path} update={props.update}/>
            </div>
            <div>Type: {props.file.type}</div>
        </div>
    );
}

export default PathItem;