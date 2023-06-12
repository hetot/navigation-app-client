import axios from "axios";
import config from "../config/config.json"

export default class NavigationService {

    static async login(formData) {
        try {
            const response = await axios.post(config.url + "api/v1/auth/authenticate", {
                email: formData.email,
                password: formData.password
            })
            if (response.status === 200) {
                return response.data.token
            }
        } catch (e) {
            console.log(e)
        }
    }

    static async register(formData) {
        try {
            const response = await axios.post(config.url + "api/v1/auth/register", {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password
            })
            if (response.status === 200) {
                return response.data.token
            }
        } catch (e) {
            console.log(e)
        }
    }

    static async get(path) {
        try {
            const response = await axios.get(config.url + "api/v1/web/directories", {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: {path: path}
            })
            console.log(response.data)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async getInfo(path) {
        try {
            const response = await axios.get(config.url + "api/v1/web/directories/info", {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: {path: path}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async remove(path) {
        try {
            const response = await axios.delete(config.url + "api/v1/web/directories", {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                params: {path: path}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async rename(oldPath, newName) {
        try {
            const response = await axios({
                method: 'put',
                url: config.url + "api/v1/web/directories",
                data: {
                    path: oldPath,
                    newName: newName
                },
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async copy(path, copyPath) {
        try {
            const response = await axios({
                method: 'put',
                url: config.url + "api/v1/web/directories/copy",
                data: {
                    path: path,
                    destination: copyPath
                },
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    static async move(path, movePath) {
        try {
            const response = await axios({
                method: 'put',
                url: config.url + "api/v1/web/directories/move",
                data: {
                    path: path,
                    destination: movePath
                },
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
}