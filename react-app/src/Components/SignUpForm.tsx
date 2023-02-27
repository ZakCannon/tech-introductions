import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

function SignUpForm(): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        console.log(email)
        console.log(password)
        console.log(repeatPassword)
        navigate("/")
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
        <div className="mb-3">
            <label className="form-label">Repeat Password</label>
            <input type="password" className="form-control" id="repeatPassword" value={repeatPassword}
                   onChange={(e) => setRepeatPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
}

export default SignUpForm