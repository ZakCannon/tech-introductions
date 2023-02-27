import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../Services/AuthenticationService";

function SignUpForm(): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        await AuthenticationService
            .executeBasicAuthenticationService(email, password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(email, password)
                navigate("/")
            })
            .catch((e) => {
                console.log("Oh no")
                console.log(e)
            })

    }

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

export default SignUpForm