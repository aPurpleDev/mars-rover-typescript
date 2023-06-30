export class Tiles {
    public x: number
    public y: number
    public isObstacle: boolean

    constructor(x: number, y: number, isObstacle: boolean) {
        this.x = x
        this.y = y
        this.isObstacle = isObstacle
    }
}