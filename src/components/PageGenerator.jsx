import React from 'react';
import PathItem from "./PathItem";
import MyButton from "./UI/button/MyButton";

const PageGenerator = (props) => {
    function goBack() {
        const len = props.currentPath.split('/').length
        let newPath = props.currentPath.split('/').splice(0, len - 1).join('/')
        if (len === 2) {
            newPath = '/'
        }
        props.setPath(newPath)

    }

    if (props.response === null) {
        return (
            <div>
                Empty
            </div>
        )
    }
    if (!props.response.successful) {
        return (
            <div>
                Server Error!!!
            </div>
        )
    } else if (props.response.folder) {
        return (
            <div>
                <h1>
                    Current Directory: {props.currentPath}
                    <MyButton onClick={goBack} disabled={props.currentPath === '/'}>
                        {"<-"}
                    </MyButton>
                </h1>
                {
                    props.response.files.map((file, index) =>
                        <PathItem file={file} key={index} currentPath={props.currentPath} setPath={props.setPath}/>
                    )
                }
            </div>
        )
    } else {
        return (
            <div>
                <MyButton onClick={goBack} disabled={props.currentPath === '/'}>
                    {"<-"}
                </MyButton>
                <br/>
                <div dangerouslySetInnerHTML={{__html: props.response.content.replaceAll('\n', '<br>')}}>
                </div>
            </div>
        )
    }
};

export default PageGenerator;