import {KeyboardEvent, useEffect, useState} from "react";
import {IPosition, Shape, randomShape, Point} from "./shapeFactory";
import {Board} from "./Board";

const NUM_ROWS = 20
const NUM_COLS = 10

function BoardElement(): JSX.Element {
    const topOfBoard = new Point(NUM_COLS/2 - 1, NUM_ROWS)

    const [activePositions, setActivePositions] = useState<Array<Point>>([])
    const [occupiedPositions, setOccupiedPositions] = useState<Array<Point>>([])
    const [currentShape, setCurrentShape] = useState<Shape>(randomShape())
    const [currentBoard, setCurrentBoard] = useState(new Board(NUM_ROWS, NUM_COLS))

    function initialiseNewRandomShape() {
        setCurrentShape(randomShape())
        const newBoard = new Board(NUM_ROWS, NUM_COLS)

        const positionsToFill = occupiedPositions.concat(activePositions)
        positionsToFill.map((cell) => newBoard.fillCell(cell))

        const newActivePositions: Array<Point> = currentShape?.fillsCells?.map((shapeOffsetPosition) => {
            return new Point(
                shapeOffsetPosition.x + topOfBoard.x,
                shapeOffsetPosition.y + topOfBoard.y
            )
        })

        setOccupiedPositions(positionsToFill)
        setActivePositions(newActivePositions)
        setCurrentBoard(newBoard)
    }

    function getAllCellsLandingStates(): Array<boolean> {
        return activePositions.map((activePosition) => {
            const nextPosition = activePosition.move(0, -1)

            return occupiedPositions.map((occupiedPosition) => {
                return occupiedPosition.equals(nextPosition)
            }).includes(true) || nextPosition.y < 0
        })
    }

    useEffect(() => {
        initialiseNewRandomShape()
    }, [])

    function movePosition(x: number, y: number) {
        const newActivePositions: Array<Point> = activePositions.map((activePosition) => {
            const newActivePosition = activePosition.move(x, y)
            if (currentBoard.isCellInBoard(newActivePosition.y, newActivePosition.x)) {
                return newActivePosition
            } else {
                throw `Out of board ${newActivePosition.x}, ${newActivePosition.y}`
            }
        })

        const newBoard = new Board(NUM_ROWS, NUM_COLS)

        occupiedPositions.map((position) => newBoard.fillCell(position))
        newActivePositions.map((position) => newBoard.activateCell(position))

        setActivePositions(newActivePositions)
        setCurrentBoard(newBoard)
    }

    function handleArrowKey(event: KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'ArrowRight':
                movePosition(1,0);
                event.preventDefault();
                break;
            case 'ArrowLeft':
                movePosition(-1,0);
                event.preventDefault();
                break;
            case 'ArrowDown':
                movePosition(0,-1);
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
            const allCellsLandingStates = getAllCellsLandingStates()

            if (allCellsLandingStates.includes(true)) {
                initialiseNewRandomShape()
            } else {
                movePosition(0, -1)
            }
        }, 100)

        return () => clearInterval(intervalId)
    })

    return <div>
        <div>This is a board</div>
        {
            currentBoard.toElement(handleArrowKey)
        }
    </div>
}

export default BoardElement