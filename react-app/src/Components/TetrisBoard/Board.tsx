import {IPosition} from "./shapeFactory";
import {KeyboardEvent} from "react";

export class Board {
    private rows: Array<Row>;
    private readonly num_rows: number;
    private readonly num_cols: number;

    constructor(num_rows: number, num_cols: number) {
        this.rows = new Array(num_rows).fill(0).map((_, index) => new Row(num_cols, index))
        this.num_rows = num_rows
        this.num_cols = num_cols
    }

    public empty() {
        this.rows.map((row) => row.empty())
    }

    public fillCell(positionToFill: IPosition) {
        if (this.isCellInBoard(positionToFill.y, positionToFill.x)) {
            this.rows[positionToFill.y].cells[positionToFill.x].fill()
        }
    }

    public activateCell(positionToActivate: IPosition) {
        if (this.isCellInBoard(positionToActivate.y, positionToActivate.x)) {
            if (positionToActivate.y >= this.num_rows) {
                return
            } else {
                this.rows[positionToActivate.y].cells[positionToActivate.x].activate()
            }
        }
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

    public empty() {
        this.cells.map((cell) => cell.empty())
    }

    public isFull(): Boolean {
        return this.cells.every(cell => cell.cellState == cellStates.Occupied)
    }

    public toElement(): JSX.Element {
        return <div className="board-row" key={this.key}>
            {this.cells.map((cell) => cell.toElement())}
        </div>
    }
}

class Cell {
    cellState: Symbol;
    private readonly key: number;

    constructor(cellState: Symbol, key: number) {
        this.cellState = cellState
        this.key = key
    }

    public fill() {
        this.cellState = cellStates.Occupied
    }

    public empty() {
        this.cellState = cellStates.Empty
    }

    public activate() {
        this.cellState = cellStates.Active
    }

    public deactivate() {
        if (this.cellState == cellStates.Active) {
            this.cellState = cellStates.Empty
        }
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

const cellStates = Object.freeze({
    Occupied: Symbol("occupied"),
    Active: Symbol("active"),
    Empty: Symbol("empty")
})