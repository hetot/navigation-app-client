import {useEffect, useState} from "react";
import PageGenerator from "./components/PageGenerator";
import NavigationService from "./API/NavigationService";

function App() {
    const [currentPath, setPath] = useState('/')
    const [response, setResponse] = useState(null)
    const [isFilesLoading, setIsFilesLoading] = useState(false)

    useEffect(() => {
        fetchFiles()
    }, [currentPath])

    async function fetchFiles() {
        setIsFilesLoading(true)
        const response = await NavigationService.getFiles(currentPath)
        setResponse(response)
        console.log(response)
        setIsFilesLoading(false)
    }

    return (
        <div className="App">
            {isFilesLoading
                ? <h1>...</h1>
                : <PageGenerator response={response} currentPath={currentPath} setPath={setPath}/>
            }
        </div>
    );
}

export default App;