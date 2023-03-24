import LoginForm from "../Components/LoginForm";
import ILogInProps from "../Interfaces/ILogInProps";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginPage(props: ILogInProps): JSX.Element {
    const navigate = useNavigate()

    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/")
        }
    }, [props.isLoggedIn])

    return <div>
        <h1>Log in</h1>
        <LoginForm isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} setUser={props.setUser}/>
    </div>
}

export default LoginPage