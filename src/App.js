import {useEffect, useState} from "react";
import PageGenerator from "./components/PageGenerator";
import NavigationService from "./API/NavigationService";
import LoginPage from "./components/LoginPage";

function App() {
    const [currentPath, setPath] = useState(() => {
        return localStorage.getItem("path") || "/"
    })
    const [response, setResponse] = useState(null)
    const [auth, setAuth] = useState(() => {
        return localStorage.getItem("token") || false
    })

    useEffect(() => {
        localStorage.setItem("path", currentPath)
        if (auth) {
            fetchFiles()
        }
    }, [currentPath, auth])

    async function fetchFiles() {
        const response = await NavigationService.get(currentPath)
        if (response) {
            setResponse(response)
        } else {
            setAuth(false)
        }
    }

    return (
        <div className="App">
            {
                auth
                    ?
                    <PageGenerator response={response} currentPath={currentPath} setPath={setPath} update={fetchFiles}
                                   setAuth={setAuth}/>
                    : <LoginPage setAuth={setAuth}/>
            }
        </div>
    );
}

export default App;