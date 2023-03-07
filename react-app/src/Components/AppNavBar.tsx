import {Link} from 'react-router-dom'

interface INavBarProps {
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    userName?: string
}

function AppNavBar(props: INavBarProps): JSX.Element {
    return <nav className="navbar sticky-top">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="d-flex">
            {
                props.isLoggedIn ?
                    <div>
                        <p>Welcome {props.userName}</p>
                        <button className="btn btn-danger" onClick={() => props.setIsLoggedIn(false)}>Log out</button>
                    </div>
                    : <div>
                        <Link className="btn" to="/signup">Sign up</Link>
                        <Link className="btn btn-outline-info" to="/login">Login</Link>
                    </div>
            }
            </div>
        </div>
    </nav>
}

export default AppNavBar