export interface IPosition {
    x: number,
    y: number
}

export class Point {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public move(x: number, y: number): Point {
        return new Point(this.x + x, this.y + y)
    }

    public equals(other: Point): boolean {
        return this.x === other.x && this.y === other.y
    }
}

export class Shape {
    public fillsCells: Array<Point>
    public name: String

    constructor(fillsCells: Array<Point>, name: String) {
        this.fillsCells = fillsCells
        this.name = name
    }
}



const PIECES: Array<Shape> = [
    new Shape(
        [
            new Point(0, 0),
            new Point(0, 1),
            new Point(1, 0),
            new Point(1, 1)
        ],
        "square"
    ),

    new Shape(
        [
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(0, 3)
        ],
        "line"
    ),
    new Shape(
        [
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(1, 1)
        ],
        "t"
    ),

    new Shape(
        [
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(2, 1)
        ],
        "l-1"
    ),

    new Shape(
        [
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(0, 1)
        ],
        "l-2"
    ),

]

export function randomShape(): Shape {
    const index = Math.floor(Math.random() * PIECES.length)
    return PIECES[index]
}