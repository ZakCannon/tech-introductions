import RandomNumberGuessing from "../Components/RandomNumberGuessing";
import React, {useState} from "react";
import axios from "axios";
import BoardElement from "../Components/TetrisBoard/BoardElement";

function HomePage(): JSX.Element {
    // const [isCorrect, setIsCorrect] = useState(false)
    //
    // const handleLogResult = async () => {
    //     const request = await axios.get("http://localhost:8080/")
    //     console.log(request)
    // }
    //
    // return <div>
    //     <h1>Guess a number you fool</h1>
    //     <RandomNumberGuessing isCorrect={isCorrect} setIsCorrect={setIsCorrect}
    //                           handleLogResult={handleLogResult}/>
    // </div>

    return <div>
        <h1>hello there</h1>
        <BoardElement/>
    </div>
}

export default HomePage