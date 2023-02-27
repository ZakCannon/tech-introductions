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
            const maxOfRange = randNumber! + 10
            const minOfRange = randNumber! - 10
            props.setIsCorrect(minOfRange < guessedNumber! && guessedNumber! < maxOfRange)
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
        <div className="container">
            <div className="row-cols-1">
                <div className="col d-flex justify-content-center">
                    <label className="form-label">Guess</label>
                </div>
                <div className="col d-flex justify-content-center">
                        <input className="input-group-text m-1"
                               min="0"
                               max="100"
                               id="user-guess"
                               value={guessedNumber!}
                               onChange={e => (setGuessedNumber(+e.target.value))}/>
                </div>
                <div className="col d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
                </div>
                <div className="col d-flex justify-content-center">
                    {randNumber}
                </div>
                <div className="col d-flex justify-content-center">
                    {hasGuessed ?
                        !isTooLarge ?
                            props.isCorrect ?
                                correctGuessResult :
                                incorrectGuessResult
                            : tooLargeGuessResult
                        : null}
                </div>
            </div>
        </div>
    );
}

export default RandomNumberGuessing