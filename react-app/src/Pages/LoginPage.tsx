import LoginForm from "../Components/LoginForm";
import ILogInProps from "../Interfaces/ILogInProps";

function LoginPage(props: ILogInProps): JSX.Element {
    return <div>
        <h1>Log in</h1>
        <LoginForm isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} setUser={props.setUser}/>
    </div>
}

export default LoginPage