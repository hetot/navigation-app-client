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
    if (props.response.contents) {
        return (
            <div>
                <h1>
                    Current Directory: {props.currentPath}
                    <MyButton onClick={goBack} disabled={props.currentPath === '/'}>
                        {"<-"}
                    </MyButton>
                </h1>
                {
                    props.response.contents.map((file, index) =>
                        <PathItem file={file} key={index} currentPath={props.currentPath} setPath={props.setPath}
                                  update={props.update} setAuth={props.setAuth}/>
                    )
                }
            </div>
        )
    } else if (props.response.lines) {
        return (
            <div>
                <MyButton onClick={goBack} disabled={props.currentPath === '/'}>
                    {"<-"}
                </MyButton>
                <br/>
                <div>
                    {
                        props.response.lines.map((line, index) => {
                                return (
                                    <p key={index}>{line}</p>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <MyButton onClick={goBack} disabled={props.currentPath === '/'}>
                    {"<-"}
                </MyButton>
                <h1>Cannot do operations with current path</h1>
            </div>
        )
    }
};

export default PageGenerator;