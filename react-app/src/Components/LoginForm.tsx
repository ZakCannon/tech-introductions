import {FormEvent, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import User from "../Services/User";
import ILogInProps from "../Interfaces/ILogInProps";

function LogInForm(props: ILogInProps): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [logInReturnCode, setLogInReturnCode] = useState<number|undefined>(0)
    const [errorComponent, setErrorComponent] = useState(<></>)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const user = new User(email, password)

        await axios.post("http://localhost:8080/users/login", user)
            .then((response) => {
                props.setIsLoggedIn(true)
                props.setUser(user)
            })
            .catch((e: AxiosError) => setLogInReturnCode(e.response?.status))
    }

    useEffect(() => {
        switch (logInReturnCode) {
            case 401:
                setErrorComponent(<div className="text-danger">Incorrect password</div>)
                break
            case 404:
                setErrorComponent(<div className="text-danger">User with email {email} not found</div>)
                break
        }
    }, [logInReturnCode])

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
        {errorComponent}
    </form>
}

export default LogInForm