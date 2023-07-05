function printBoard(board: Array<number|string>): void {
    const boardToPrint = [...board]

    if (board.length != SIZE * SIZE) {
        throw new Error(`How on earth did you get a sudoku board with length ${board.length}`)
    }

    for (let i=0; i<81; i++) {
        if (boardToPrint[i] == 0) {
            boardToPrint[i] = "□"
        }
    }

    console.log("___________________")
    for (let row = 0; row < SIZE; row ++) {
        const startOfRow = row * SIZE
        console.log("|" + boardToPrint.slice(startOfRow, startOfRow + 3) + "|" + boardToPrint.slice(startOfRow + 3, startOfRow + 6) + "|" + boardToPrint.slice(startOfRow + 6, startOfRow + 9) + "|")
        if (row % 3 == 2) {
            console.log("___________________")
        }
    }
}

function printBoardWithHighlight(board: Array<number|string>, cellIndex: number): void {
    const boardToPrint = [...board]
    boardToPrint[cellIndex] = "X"
    printBoard(boardToPrint)
}

class BoardCheckResult {
    cellIndex: number;
    newNumber: number;

    constructor(cellIndex: number, newNumber: number) {
        this.cellIndex = cellIndex
        this.newNumber = newNumber
    }
}

function singleTurnSolve(board: Array<number>): Array<number> {
    const newBoard = [...board]

    const checkResults = checkBoard(board)
    const uniqueResults = [...new Set(checkResults)]
    uniqueResults.map((result) => {
        newBoard[result.cellIndex] = result.newNumber
    })

    if (uniqueResults.length === 0 ) {
        throw new Error("Stuck!")
    }

    return newBoard
}

const SIZE = 9

function checkBoard(board: Array<number>): Array<BoardCheckResult> {
    const rowResults: Array<BoardCheckResult> = Array.apply(null, Array(SIZE)).map((x, i) => {
        return checkRow(board, i)
    }).flat()
    const colResults: Array<BoardCheckResult> = Array.apply(null, Array(SIZE)).map((x, i) => {
        return checkCol(board, i)
    }).flat()
    const boxResults: Array<BoardCheckResult> = Array.apply(null, Array(SIZE)).map((x, i) => {
        return checkBox(board, i)
    }).flat()

    return [rowResults, colResults, boxResults].flat()
}

function checkRow(board: Array<number>, rowIndex: number): Array<BoardCheckResult> {
    const numbersInRow = getNumbersInRow(board, rowIndex)

    const cellIndexesInRow = getCellIndexesInRow(rowIndex)

    const boardCheckResults: Array<BoardCheckResult|undefined> =  cellIndexesInRow.map((cellIndex) => {
        if (board[cellIndex] !== 0 ) {
            return undefined
        }

        const availableNumbersForCellInIsolation = getAvailableNumbersForCell(board, cellIndex)
        const availableNumbersForCellInRowContext = availableNumbersForCellInIsolation.filter((x) => !numbersInRow.includes(x))

        if (availableNumbersForCellInRowContext.length === 1) {
            return new BoardCheckResult(cellIndex, availableNumbersForCellInRowContext[0])
        }
    })

    return boardCheckResults.filter((result): result is BoardCheckResult => result !== undefined)
}

function checkCol(board: Array<number>, ColIndex: number): Array<BoardCheckResult> {
    const numbersInCol = getNumbersInCol(board, ColIndex)

    const cellIndexesInCol = getCellIndexesInCol(ColIndex)

    const boardCheckResults: Array<BoardCheckResult|undefined> =  cellIndexesInCol.map((cellIndex) => {
        if (board[cellIndex] !== 0 ) {
            return undefined
        }

        const availableNumbersForCellInIsolation = getAvailableNumbersForCell(board, cellIndex)
        const availableNumbersForCellInColContext = availableNumbersForCellInIsolation.filter((x) => !numbersInCol.includes(x))

        if (availableNumbersForCellInColContext.length === 1) {
            return new BoardCheckResult(cellIndex, availableNumbersForCellInColContext[0])
        }
    })

    return boardCheckResults.filter((result): result is BoardCheckResult => result !== undefined)
}

function checkBox(board: Array<number>, boxIndex: number): Array<BoardCheckResult> {
    const numbersInBox = getNumbersInBox(board, boxIndex)

    const cellIndexesInBox = getCellIndexesInBox(boxIndex)

    const boardCheckResults: Array<BoardCheckResult|undefined> =  cellIndexesInBox.map((cellIndex) => {
        if (board[cellIndex] !== 0 ) {
            return undefined
        }

        const availableNumbersForCellInIsolation = getAvailableNumbersForCell(board, cellIndex)
        const availableNumbersForCellInBoxContext = availableNumbersForCellInIsolation.filter((x) => !numbersInBox.includes(x))

        if (availableNumbersForCellInBoxContext.length === 1) {
            return new BoardCheckResult(cellIndex, availableNumbersForCellInBoxContext[0])
        }
    })

    return boardCheckResults.filter((result): result is BoardCheckResult => result !== undefined)
}

function getAvailableNumbersForCell(board: Array<number>, cellIndex: number): Array<number> {
    const boxIndex = getBoxIndexFromCell(cellIndex)
    const rowIndex = getRowIndexFromCell(cellIndex)
    const colIndex = getColumnIndexFromCell(cellIndex)

    const numbersInBox = getNumbersInBox(board, boxIndex)
    const numbersInRow = getNumbersInRow(board, rowIndex)
    const numbersInCol = getNumbersInCol(board, colIndex)

    const allNumbers = [numbersInBox, numbersInRow, numbersInCol].flat()

    const possibleNumbers = Array.apply(null, Array(SIZE)).map((x, i) => {
        return i + 1
    })

    return possibleNumbers.filter((x) => !allNumbers.includes(x))
}

function getBoxIndexFromCell(cellIndex: number): number {
    const boxRow = Math.floor(getRowIndexFromCell(cellIndex)/3)
    const boxCol = Math.floor(getColumnIndexFromCell(cellIndex)/3)

    return (boxRow * 3) + boxCol
}

function getRowIndexFromCell(cellIndex: number): number {
    return Math.floor(cellIndex/SIZE)
}

function getColumnIndexFromCell(cellIndex: number): number {
    return cellIndex % SIZE
}

function getNumbersInBox(board: Array<number>, boxIndex: number): Array<number> {
    const cellIndexesInBox = getCellIndexesInBox(boxIndex)
    const numbersInBox = Array.apply(null, Array(SIZE)).map((x, i) => {
        return board[cellIndexesInBox[i]]
    })

    return numbersInBox.filter((x) => x != 0)
}

function getNumbersInRow(board: Array<number>, rowIndex: number): Array<number> {
    const cellIndexesInRow = getCellIndexesInRow(rowIndex)
    const numbersInRow = Array.apply(null, Array(SIZE)).map((x, i) => {
        return board[cellIndexesInRow[i]]
    })

    return numbersInRow.filter((x) => x != 0)
}

function getNumbersInCol(board: Array<number>, colIndex: number): Array<number> {
    const cellIndexesInCol = getCellIndexesInCol(colIndex)
    const numbersInCol = Array.apply(null, Array(SIZE)).map((x, i) => {
        return board[cellIndexesInCol[i]]
    })

    return numbersInCol.filter((x) => x != 0)
}


function getCellIndexesInBox(boxIndex: number): Array<number> {
    const rowsCoveringBox = Array.apply(null, Array(3)).map((x, i) => {
        return Math.floor(boxIndex / 3) * 3 + i
    })
    const colsCoveringBox = Array.apply(null, Array(3)).map((x, i) => {
        return (boxIndex % 3) * 3 + i
    })

    const cellsInRows = rowsCoveringBox.map(getCellIndexesInRow).flat()
    const cellsInCols = colsCoveringBox.map(getCellIndexesInCol).flat()

    return cellsInCols.filter(cell => cellsInRows.includes(cell))
}

function getCellIndexesInRow(rowIndex: number): Array<number> {
    return Array.apply(null, Array(SIZE)).map((x, i) => {
        return i + rowIndex * SIZE
    })
}

function getCellIndexesInCol(colIndex: number): Array<number> {
    return Array.apply(null, Array(SIZE)).map((x, i) => {
        return i * SIZE + colIndex
    })
}

const sampleBoard: Array<number>  = [
    0,0,0,0,0,2,1,0,0,
    0,0,4,0,0,8,7,0,0,
    0,2,0,3,0,0,9,0,0,
    6,0,2,0,0,3,0,4,0,
    0,0,0,0,0,0,0,0,0,
    0,5,0,6,0,0,3,0,1,
    0,0,3,0,0,5,0,8,0,
    0,0,8,2,0,0,5,0,0,
    0,0,9,7,0,0,0,0,0
]

const easyBoard: Array<number>  = [
    0,0,6,0,0,0,5,0,8,
    1,0,2,3,8,0,0,0,4,
    0,0,0,2,0,0,1,9,0,
    0,0,0,0,6,3,0,4,5,
    0,6,3,4,0,5,8,7,0,
    5,4,0,9,2,0,0,0,0,
    0,8,7,0,0,4,0,0,0,
    2,0,0,0,9,8,4,0,7,
    4,0,9,0,0,0,3,0,0
]

function solveBoard(boardToSolve: Array<number>): Array<number> {

    if (!boardToSolve.includes(0)) {
        console.log("Solved!")
        return boardToSolve
    }

    const progressedBoard = singleTurnSolve(boardToSolve)

    return solveBoard(progressedBoard)
}

printBoard(easyBoard)
const finalBoard = solveBoard(easyBoard)
printBoard(finalBoard)


