import React, {useState} from 'react';
import NavigationService from "../API/NavigationService";

const LoginPage = (props) => {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [regFormData, setRegFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    function handleChange(event) {
        setFormData(old => {
            old[event.target.name] = event.target.value;
            return {...old}
        })
    }
    function regHandleChange(event) {
        setRegFormData(old => {
            old[event.target.name] = event.target.value;
            return {...old}
        })
    }

    async function handleLogin() {
        const token = await NavigationService.login(formData)
        if (token) {
            localStorage.setItem("token", token)
            props.setAuth(true)
        }
    }

    async function handleRegister() {
        const token = await NavigationService.register(regFormData)
        if (token) {
            localStorage.setItem("token", token)
            props.setAuth(true)
        }
    }

    return (
        <div>
            <form onSubmit={event => {
                event.preventDefault()
                handleLogin()
            }}>
                <h3>Login</h3>
                <label>
                    Email
                    <input type="email" name={"email"} value={formData.email} onChange={handleChange}/>
                </label>
                <label>
                    Password
                    <input type="password" name={"password"} value={formData.password} onChange={handleChange}/>
                </label>
                <button>Login</button>
            </form>
            <form onSubmit={event => {
                event.preventDefault()
                handleRegister()
            }}>
                <h3>Register</h3>
                <label>
                    Firstname
                    <input type="text" name={"firstname"} value={regFormData.name} onChange={regHandleChange}/>
                </label>
                <label>
                    Lastname
                    <input type="text" name={"lastname"} value={regFormData.lastname} onChange={regHandleChange}/>
                </label>
                <label>
                    Email
                    <input type="email" name={"email"} value={regFormData.email} onChange={regHandleChange}/>
                </label>
                <label>
                    Password
                    <input type="password" name={"password"} value={regFormData.password} onChange={regHandleChange}/>
                </label>
                <button>Register</button>
            </form>
        </div>
    );
};

export default LoginPage;