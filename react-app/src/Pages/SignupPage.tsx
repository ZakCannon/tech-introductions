import SignUpForm from "../Components/SignUpForm";
import ILogInProps from "../Interfaces/ILogInProps";


function SignupPage(props: ILogInProps): JSX.Element {
    return <div>
        <h1>Sign up</h1>
        <SignUpForm isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} setUser={props.setUser}/>
    </div>
}

export default SignupPage