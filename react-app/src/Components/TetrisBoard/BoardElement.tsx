import {useEffect, useState} from "react";
import useInterval from "../../Services/useInterval";
import {IPosition, Shape, randomShape} from "./shapeFactory";
import {Board} from "./Board";


const NUM_ROWS = 20
const NUM_COLS = 10
// const INITIAL_BOARD_STATE = new Array(NUM_ROWS).fill(new Array(NUM_COLS).fill(false))

function BoardElement(): JSX.Element {
    const topOfBoard: IPosition = {x:Math.floor(NUM_COLS/2),y:NUM_ROWS}

    const [occupiedPositions, setOccupiedPositions] = useState<Array<IPosition>>([])
    const [currentShape, setCurrentShape] = useState<Shape>(randomShape())
    const [currentPosition, setCurrentPosition] = useState<IPosition>(topOfBoard)
    const [currentBoard, setCurrentBoard] = useState(new Board(NUM_ROWS, NUM_COLS))

    const newShape = randomShape()

    useInterval(tick, 1000)

    function tick() {
        if (currentPosition.y == 0) {
            setCurrentPosition(topOfBoard)
            setCurrentShape(randomShape())
        }


        const newPosition = {x:currentPosition.x, y:currentPosition.y-1}

        const newOccupiedPositions: Array<IPosition> = currentShape?.fillsCells?.map((shapeOffsetPosition) => {
                return {
                    x: shapeOffsetPosition.x + newPosition.x,
                    y: shapeOffsetPosition.y + newPosition.y
                }
        })

        const newValidOccupiedPositions = newOccupiedPositions.filter((position) => {
            return currentBoard.isCellInBoard(position.x, position.y)
        })

        newValidOccupiedPositions.push(...occupiedPositions)

        const newBoard = new Board(NUM_ROWS, NUM_COLS)

        newValidOccupiedPositions.map((occupiedPosition) => newBoard.fillCell(occupiedPosition))

        setCurrentPosition(newPosition)
        console.log(newPosition)
        console.log("Hello?")
        setOccupiedPositions(newValidOccupiedPositions)
        setCurrentBoard(newBoard)

        // const newOccupiedSquares =


        // const newBoardState = new Array(NUM_ROWS).fill(0).map(() => new Array(NUM_COLS).fill(0).map(() => Math.random() < 0.5))
        // setOccupiedSquares(newBoardState)
    }
    //
    // // function getNewOccupiedSquares(newPosition: IPosition): Array<IPosition> {
    // //     // return currentShape?.shape?.map((position: IPosition) => {x: position.x + newPosition.x, y: })
    // // }

    return <div>
        <div>This is a board</div>
        {
            currentBoard.toElement()
        }
    </div>
}

export default BoardElement