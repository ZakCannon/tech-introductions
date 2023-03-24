export interface IPosition {
    x: number,
    y: number
}

export class Shape {
    public fillsCells: Array<IPosition>

    constructor(fillsCells: Array<IPosition>) {
        this.fillsCells = fillsCells
    }
}

const PIECES: Array<Shape> = [
    new Shape(
        [
            {x:0, y:0},
            {x:0, y:1},
            {x:1, y:0},
            {x:1, y:1}
        ]
    )
]

export function randomShape(): Shape {
    const index = Math.floor(Math.random() * PIECES.length)
    return PIECES[index]
}