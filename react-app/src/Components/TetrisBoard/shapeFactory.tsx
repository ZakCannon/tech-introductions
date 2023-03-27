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

    public drop(): Point {
        return new Point(this.x, this.y - 1)
    }

    public equals(other: Point): boolean {
        return this.x == other.x && this.y == other.y
    }
}

export class Shape {
    public fillsCells: Array<Point>

    constructor(fillsCells: Array<Point>) {
        this.fillsCells = fillsCells
    }
}



const PIECES: Array<Shape> = [
    new Shape(
        [
            new Point(0, 0),
            new Point(0, 1),
            new Point(1, 0),
            new Point(1, 1)
        ]
    ),

    new Shape(
        [
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(0, 3)
        ]
    ),
    new Shape(
        [
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(1, 1)
        ]
    ),

    new Shape(
        [
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(2, 1)
        ]
    ),

    new Shape(
        [
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(0, 1)
        ]
    ),

]

export function randomShape(): Shape {
    const index = Math.floor(Math.random() * PIECES.length)
    return PIECES[index]
}