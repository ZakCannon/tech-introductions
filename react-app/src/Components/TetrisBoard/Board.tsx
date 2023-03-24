import {IPosition} from "./shapeFactory";

export class Board {
    private rows: Array<Row>;
    private num_rows: number;
    private num_cols: number;

    constructor(num_rows: number, num_cols: number) {
        this.rows = new Array(num_rows).fill(0).map((_, index) => new Row(num_cols, index))
        this.num_rows = num_rows
        this.num_cols = num_cols
    }

    public empty() {
        this.rows.map((row) => row.empty())
    }

    public fillCell(positionToFill: IPosition) {
        const rowToFill = positionToFill.y
        const cellToFill = positionToFill.x

        console.log(`Filling ${rowToFill}, ${cellToFill}`)

        this.rows[rowToFill].cells[cellToFill].fill()
    }

    public toElement(): JSX.Element {
        return <div>
            {this.rows.map((row) => row.toElement())}
        </div>
    }

    public isCellInBoard(row: number, col: number): boolean {
        return (row <= this.num_rows && col <= this.num_cols)
    }
}

class Row {
    public cells: Array<Cell>;
    private num_cells: number;
    private key: number;

    constructor(num_cells: number, key: number) {
        this.cells = new Array(num_cells).fill(0).map((_, index) => new Cell(false, key*10 + index))
        this.num_cells = num_cells
        this.key=key
    }

    public empty() {
        this.cells.map((cell) => cell.empty())
    }

    public toElement(): JSX.Element {
        return <div className="board-row" key={this.key}>
            {this.cells.map((cell) => cell.toElement())}
        </div>
    }
}

class Cell {
    private isOccupied: boolean;
    private key: number;

    constructor(isOccupied: boolean, key: number) {
        this.isOccupied = isOccupied
        this.key = key
    }

    public fill() {
        this.isOccupied = true
    }

    public empty() {
        this.isOccupied = false
    }

    public toElement(): JSX.Element {
        return <div className={this.isOccupied ? "occupied-cell" : "empty-cell"} key={this.key}></div>
    }
}