import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import AppNavBar from "./Components/AppNavBar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import User from "./Services/User";

function App(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User | void>()

    useEffect(() => {
        if (!isLoggedIn) {
            console.log("logging out")
            setUser(new User("", ""))
        }
    }, [isLoggedIn])

    return <Router>
        <AppNavBar isLoggedIn={isLoggedIn} userName={user?.email} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}/>
            <Route path="/signup" element={<SignupPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}/>
        </Routes>
    </Router>
}

export default App;
