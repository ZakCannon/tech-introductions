import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import User from "../Services/User";
import ILogInProps from "../Interfaces/ILogInProps";

function LogInForm(props: ILogInProps): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const user = new User(email, password)

        await axios.post("http://localhost:8080/users/login", user)
            .then(() => {
                props.setIsLoggedIn(true)
                props.setUser(user)
                navigate("/")
            })
            .catch((e) => console.log(e))
    }

    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/")
        }
    })

    return <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" value={email}
                   onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
}

export default LogInForm