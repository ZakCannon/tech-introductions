import {FormEvent, useState} from "react";
import axios, {AxiosError} from "axios";
import User from "../Services/User";
import ILogInProps from "../Interfaces/ILogInProps";

function SignUpForm(props: ILogInProps): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [errorComponent, setErrorComponent] = useState(<></>)

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (password != repeatPassword) {
            setErrorComponent(passwordNotRepeatedErrorComponent)
        } else if (password.length < 5) {
            setErrorComponent(passwordTooShortErrorComponent)
        } else {
            const user = new User(email, password)

            await axios.post("http://localhost:8080/users/add", user)
                .then(() => {
                    props.setIsLoggedIn(true)
                    props.setUser(user)
                })
                .catch((e) => setErrorComponent(userExistsErrorComponent))
        }
    }

    const userExistsErrorComponent = <div className="text-danger">User already exists with email {email}</div>
    const passwordNotRepeatedErrorComponent = <div className="text-danger">Password not repeated</div>
    const passwordTooShortErrorComponent = <div className="text-danger">Password must be at least 5 characters</div>

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
        <div className="mb-3">
            <label className="form-label">Repeat Password</label>
            <input type="password" className="form-control" id="repeatPassword" value={repeatPassword}
                   onChange={(e) => setRepeatPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {errorComponent}
    </form>
}

export default SignUpForm