import {Link} from 'react-router-dom'

function AppNavBar(): JSX.Element {
    return <nav className="navbar sticky-top">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="d-flex">
                <Link className="btn" to="/signup">Sign up</Link>
                <Link className="btn btn-outline-info" to="/login">Login</Link>
            </div>
        </div>
    </nav>
}

export default AppNavBar