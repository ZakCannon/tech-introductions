import SignUpForm from "../Components/SignUpForm";
import ILogInProps from "../Interfaces/ILogInProps";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


function SignupPage(props: ILogInProps): JSX.Element {
    const navigate = useNavigate()

    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/")
        }
    }, [props.isLoggedIn])

    return <div>
        <h1>Sign up</h1>
        <SignUpForm isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} setUser={props.setUser}/>
    </div>
}

export default SignupPage