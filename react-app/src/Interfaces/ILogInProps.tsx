import User from "../Services/User";

interface ILogInProps {
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void
    setUser: (user: User) => void
}

export default ILogInProps