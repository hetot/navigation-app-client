import axios from "axios";

export default class NavigationService {
    static async getFiles(path) {
        try {
            const response = await axios.get('http://localhost:8080/api/get_content', {
                params: {path: path}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async getInfo(path) {
        try {
            const response = await axios.get('http://localhost:8080/api/get_info', {
                params: {path: path}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async remove(path) {
        try {
            const response = await axios.delete('http://localhost:8080/api/remove', {
                params: {path: path}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}