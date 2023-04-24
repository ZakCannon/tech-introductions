import {KeyboardEvent, useEffect, useState} from "react";
import {IPosition, Shape, randomShape, Point} from "./shapeFactory";
import {Board, cellStates} from "./Board";

const NUM_ROWS = 20
const NUM_COLS = 10
const START_SHAPE = randomShape()

function BoardElement(): JSX.Element {
    const topOfBoard = new Point(NUM_COLS/2 - 1, NUM_ROWS - 1)

    const [board, setBoard] = useState(new Board(NUM_ROWS, NUM_COLS, topOfBoard, START_SHAPE, []))
    const [boardElement, setBoardElement] = useState<JSX.Element>()

    function handleArrowKey(event: KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'ArrowRight':
                setBoard(board.moveActivePositions(1,0))
                event.preventDefault();
                break;
            case 'ArrowLeft':
                setBoard(board.moveActivePositions(-1,0))
                event.preventDefault();
                break;
            case 'ArrowDown':
                setBoard(board.moveActivePositions(0,-1))
                event.preventDefault();
                break;
            // case 'ArrowUp':
            //     rotateShape();
            //     event.preventDefault();
            //     break;
            default:
                break;
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (board.isCellLanding()) {
                const newBoard = board.activateNewShape(randomShape())
                setBoard(newBoard)
            } else {
                const newBoard = board.moveActivePositions(0,-1);
                setBoard(newBoard)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    })

    useEffect(() => {
        setBoardElement(board.toElement(handleArrowKey))
    }, [board])

    return <div>
        <div>This is a board</div>
        {
            boardElement
        }
    </div>
}

export default BoardElement