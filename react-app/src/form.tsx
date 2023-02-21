import React, {useEffect, useState} from "react";
import {AiFillCheckCircle} from "react-icons/ai";
import {RiCloseCircleFill} from "react-icons/ri";
import {BsFillExclamationCircleFill} from "react-icons/bs";

interface IRandomNumberGuessingProps {
    isCorrect: boolean,
    setIsCorrect: (isCorrect: boolean) => void
    handleLogResult: (isCorrect: boolean, isTooLarge: boolean) => void
}

function RandomNumberGuessing(props: IRandomNumberGuessingProps): JSX.Element {
    const [randNumber, setRandNumber] = useState<number | null>(null);
    const [guessedNumber, setGuessedNumber] = useState<number | null>(null);
    const [hasGuessed, setHasGuessed] = useState(false)
    const [isTooLarge, setTooLarge] = useState(false)

    const generateRandomNumber = () => {
        setRandNumber(Math.round(Math.random() * 1000) / 10)
    }

    const handleFormSubmit = () => {
        setHasGuessed(true)
        generateRandomNumber()
    }

    useEffect(() => {
        if (hasGuessed) {
            setTooLarge(false)
            if (guessedNumber! > 100) {
                setTooLarge(true)
            }
            props.setIsCorrect(randNumber! < guessedNumber!)
            props.handleLogResult(props.isCorrect, isTooLarge)
        }
    }, [randNumber])

    const correctGuessResult: JSX.Element = <div>
        <AiFillCheckCircle className="text-success"/>
        <p>Correct</p>
    </div>

    const incorrectGuessResult: JSX.Element = <div>
        <RiCloseCircleFill className="text-danger"/>
        <p>Incorrect</p>
    </div>

    const tooLargeGuessResult: JSX.Element = <div>
        <BsFillExclamationCircleFill className="text-danger"/>
        <p>Cheater!</p>
    </div>

    return (
        <div>
            <div>
                <label className="form-label">Guess</label>
                <input className="input-group-text"
                       type="number"
                       min="0"
                       max="100"
                       id="user-guess"
                       value={guessedNumber!}
                       onChange={e => (setGuessedNumber(+e.target.value))}/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
            </div>
            <p>
                {randNumber}
            </p>
            {hasGuessed ?
                !isTooLarge ?
                    props.isCorrect ?
                        correctGuessResult :
                        incorrectGuessResult
                    : tooLargeGuessResult
                : null}
        </div>
    );
}

export default RandomNumberGuessing