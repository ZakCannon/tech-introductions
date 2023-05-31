import {KeyboardEvent, useEffect, useState} from "react";
import {Point, randomShape} from "./shapeFactory";
import {Board} from "./Board";
import _ from "lodash";

const NUM_ROWS = 20
const NUM_COLS = 10

function BoardElement(): JSX.Element {
    const topOfBoard = new Point(NUM_COLS/2 - 1, NUM_ROWS)

    const [activePositions, setActivePositions] = useState<Array<Point>>([])
    const [occupiedPositions, setOccupiedPositions] = useState<Array<Point>>([])
    const [currentShape, setCurrentShape] = useState(randomShape())
    const [currentBoard, setCurrentBoard] = useState(new Board(NUM_ROWS, NUM_COLS))
    const [playerPosition, setPlayerPosition] = useState(topOfBoard)

    function initialiseNewBoard() {
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


    function initialiseNewRandomShape(): Point[] {
        const newShape = randomShape()

        setCurrentShape(newShape)

        return newShape.fillsCells.map((shapeOffsetPosition) => {
            return new Point(
                shapeOffsetPosition.x + topOfBoard.x,
                shapeOffsetPosition.y + topOfBoard.y
            )

        })
    }

    function getFilledCellsAfterLanding(boardToFill: Board): Point[] {
        const positionsToFill = occupiedPositions.concat(activePositions)
        positionsToFill.map((cell) => boardToFill.fillCell(cell))

        return positionsToFill
    }

    useEffect(() => {
        initialiseNewBoard()
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

        setPlayerPosition(playerPosition.move(x,y))
        setActivePositions(newActivePositions)
        setCurrentBoard(newBoard)
    }

    function rotatePosition() {
        const newActivePositions: Array<Point> = activePositions.map((activePosition) => {
            const newActivePosition = activePosition.rotateAbout(playerPosition)
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

    function findFullRows(filledCells: Point[]) {
        const pointsByRow = new Map()
        filledCells.map(cell => pointsByRow[])

        console.log(fullRowPositions)
    }

    function handleLanding() {
        const newBoard = new Board(NUM_ROWS, NUM_COLS)
        // occupy positions
        const filledCellsAfterLanding = getFilledCellsAfterLanding(newBoard)

        // find full rows
        findFullRows(filledCellsAfterLanding)

        // drop rows above it

        // initialise a new shape
        const newActivatedPositions = initialiseNewRandomShape()

        setPlayerPosition(topOfBoard)
        setActivePositions(newActivatedPositions)
        setOccupiedPositions(filledCellsAfterLanding)
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
            case 'ArrowUp':
                const newShape = currentShape.rotate()
                rotatePosition()
                setCurrentShape(newShape)
                event.preventDefault();
                break;
            default:
                break;
        }
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
        const intervalId = setInterval(() => {
            const allCellsLandingStates = getAllCellsLandingStates()

            if (allCellsLandingStates.includes(true)) {
                handleLanding()
            } else {
                movePosition(0, -1)
            }
        }, 2000)

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