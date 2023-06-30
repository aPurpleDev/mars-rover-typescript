import { Tiles } from "./tiles"

export class WorldMap {
    public width: number
    public height: number
    public tiles: Tiles[]

    constructor(width: number = 5, height: number = 5, tiles: Tiles[] = [{x: 0, y: 3, isObstacle: false}, {x: 0, y: 2, isObstacle: false}, {x: 0, y: 1, isObstacle: false}]) {
        this.width = width
        this.height = height
        this.tiles = tiles
    }
}