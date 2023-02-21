import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import RandomNumberGuessing from "./form";
import axios from "axios";

function App(): JSX.Element {
    const [isCorrect, setIsCorrect] = useState(false)

    const handleLogResult = async () => {
        const request = await axios.get("http://localhost:8080/")
        console.log(request)
    }

    return <div className="App">
        <header className="App-header">
        <h1>Guess a number you fool</h1>
        <RandomNumberGuessing isCorrect={isCorrect} setIsCorrect={setIsCorrect} handleLogResult={handleLogResult}/>
        </header>
    </div>
}

export default App;
