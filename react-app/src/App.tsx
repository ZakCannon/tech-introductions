import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import AppNavBar from "./Components/AppNavBar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

function App(): JSX.Element {
    return <Router>
        <AppNavBar/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
    </Router>
}

export default App;
