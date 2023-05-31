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

    public add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y)
    }

    public subtract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y)
    }

    public rotateAbout(aboutCentre: Point): Point {
        const pointRelativeToCentre = this.subtract(aboutCentre)
        const pointRotatedAboutOrigin = new Point(pointRelativeToCentre.y, -pointRelativeToCentre.x)

        return pointRotatedAboutOrigin.add(aboutCentre)
    }
}

export class Shape {
    public fillsCells: Array<Point>

    constructor(fillsCells: Array<Point>) {
        this.fillsCells = fillsCells
    }

    public rotate(): Shape {
        const abstractCentre = new Point(0, 0)
        const newPoints = this.fillsCells.map((x) => x.rotateAbout(abstractCentre))
        return new Shape(newPoints)
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
            new Point(0, -1),
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2)
        ]
    ),
    new Shape(
        [
            new Point(-1, 0),
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, 1)
        ]
    ),

    new Shape(
        [
            new Point(-1, 0),
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, 1)
        ]
    ),

    new Shape(
        [
            new Point(-1, 0),
            new Point(0, 0),
            new Point(1, 0),
            new Point(-1, 1)
        ]
    ),

]

export function randomShape(): Shape {
    const index = Math.floor(Math.random() * PIECES.length)
    return PIECES[index]
}