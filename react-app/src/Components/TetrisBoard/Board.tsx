import {IPosition, Point, Shape} from "./shapeFactory";
import {KeyboardEvent} from "react";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;

export class Board {
    private rows: Array<Row>;
    private readonly num_rows: number;
    private readonly num_cols: number;
    private readonly topOfBoard: Point;
    private readonly playerCell: Point;
    private readonly shape: Shape;

    constructor(num_rows: number, num_cols: number, playerCell: Point, shape: Shape, occupiedCells: Point[]) {
        this.rows = new Array(num_rows).fill(0).map((_, index) => new Row(num_cols, index))
        this.num_rows = num_rows
        this.num_cols = num_cols
        this.topOfBoard = new Point(num_cols/2 - 1, num_rows - 1)
        this.playerCell = playerCell
        this.shape = shape

        this.activateShapePositions()
        occupiedCells.map(position => this.setCellState(position, cellStates.Occupied))
    }

    private activateShapePositions() {
        this.shape.fillsCells.map((shapeOffsetPosition) => {
            return new Point(
                shapeOffsetPosition.x + this.playerCell.x,
                shapeOffsetPosition.y + this.playerCell.y
            )
        }).map(position => this.setCellState(position, cellStates.Active))
    }

    private setCellState(cell: IPosition, state: Symbol) {
        if (this.isCellInBoard(cell.y, cell.x)) {
            if (cell.y >= this.num_rows) {
                return
            } else {
                this.rows[cell.y].cells[cell.x].setState(state)
            }
        }
    }

    public getPositionsWithState(state:Symbol): Array<Point> {
        return this.rows.flatMap((row, rowIndex) => row.positionsWithState(rowIndex, state))
    }

    public isCellLanding(): boolean {
        const currentActivePositions = this.getPositionsWithState(cellStates.Active)
        const droppedActivePositions = currentActivePositions.map(position => position.move(0, -1))
        const currentOccupiedPositions = this.getPositionsWithState(cellStates.Occupied)

        return droppedActivePositions
            .map((droppedActivePosition) => {
                const occupiedCollision =  currentOccupiedPositions
                    .map((currentOccupiedPosition) => {
                        return currentOccupiedPosition.equals(droppedActivePosition)
                    }).includes(true)

                return occupiedCollision || droppedActivePosition.y < 0
            }).includes(true)
    }

    public moveActivePositions(x: number, y: number): Board {
        const currentOccupiedPositions = this.getPositionsWithState(cellStates.Occupied)
        const newPlayerCell = this.playerCell.move(x, y)

        console.log(this.getPositionsWithState(cellStates.Active))

        return new Board(this.num_rows, this.num_cols, newPlayerCell, this.shape, currentOccupiedPositions)
    }

    public activateNewShape(newShape: Shape): Board {
        const currentActivePositions = this.getPositionsWithState(cellStates.Active)
        const currentOccupiedPositions = this.getPositionsWithState(cellStates.Occupied)

        return new Board(this.num_rows, this.num_cols, this.topOfBoard, newShape, currentActivePositions.concat(currentOccupiedPositions))
    }

    public toElement(handleArrowKey: (event: KeyboardEvent<HTMLDivElement>) => void): JSX.Element {
        return <div tabIndex={0} onKeyDown={(e) => handleArrowKey(e)}>
            {this.rows.map((row) => row.toElement()).reverse()}
        </div>
    }

    public isCellInBoard(row: number, col: number): boolean {
        return (0 <= row && 0 <= col && col <= this.num_cols-1)
    }
}

class Row {
    public cells: Array<Cell>;
    private num_cells: number;
    private readonly key: number;

    constructor(num_cells: number, key: number) {
        this.cells = new Array(num_cells).fill(0).map((_, index) => new Cell(cellStates.Empty, key*10 + index))
        this.num_cells = num_cells
        this.key=key
    }

    private empty() {
        this.cells.map((cell) => cell.setState(cellStates.Empty))
    }

    private isFull(): boolean {
        return this.cells.every((cell) => cell.cellState == cellStates.Occupied)
    }

    public emptyIfFull() {
        if (this.isFull()) {
            this.empty()
        }
    }

    public positionsWithState(rowIndex: number, state: Symbol): Array<Point> {
        return this.cells
            .filter(cell => cell.cellState == state)
            .map((cell, cellIndex) => new Point(cellIndex, rowIndex))
    }

    public toElement(): JSX.Element {
        return <div className="board-row" key={this.key}>
            {this.cells.map((cell) => cell.toElement())}
        </div>
    }
}

class Cell {
    public cellState: Symbol;
    private readonly key: number;

    constructor(cellState: Symbol, key: number) {
        this.cellState = cellState
        this.key = key
    }

    public setState(state: Symbol) {
        this.cellState = state
    }

    public toElement(): JSX.Element {
        let cellStateStyling
        switch (this.cellState) {
            case cellStates.Occupied:
                cellStateStyling = "occupied-cell"
                break;
            case cellStates.Active:
                cellStateStyling = "active-cell"
                break;
            case cellStates.Empty:
                cellStateStyling = "empty-cell"
                break;
        }


        return <div className={`cell ${cellStateStyling}`} key={this.key}></div>
    }
}

export const cellStates = Object.freeze({
    Occupied: Symbol("occupied"),
    Active: Symbol("active"),
    Empty: Symbol("empty")
})