import { CARDINALS } from "../consts/cardinals"
import { Direction, DirectionIncrement, Increment } from "../types/marsrover.types"
import { Position } from "./position"
import { WorldMap } from "./worldmap"

export class MarsRover {

    public direction: Direction
    public position: Position
    public worldMap: WorldMap
    public worldMapArt: string

    constructor(direction: Direction = 'N'
     , position: Position = new Position(), worldMap: WorldMap = new WorldMap(), worldMapArt: string = ''){
        this.direction = direction
        this.position = position
        this.worldMap = worldMap
        this.worldMapArt = worldMapArt
    }

    advance(): void {
        const directionIncrement: DirectionIncrement = {
            'N': {x: 0, y: -1},
            'E': {x: 1, y: 0},
            'S': {x: 0, y: 1},
            'W': {x: -1, y: 0},
        };
    
        const increment: Increment = directionIncrement[this.direction];
        const newX: number = this.position.x + increment.x;
        const newY: number = this.position.y + increment.y;
    
        const obstacleAhead: boolean = this.worldMap.tiles.some(tile => tile.x === newX && tile.y === newY && tile.isObstacle);
    
        if (!obstacleAhead) {
            this.position.x = newX;
            this.position.y = newY;
        }
    }
    

    executeOrders(orders: string[]): void {
        orders.map( order => {
            switch(order){
                case 'advance': this.advance()
                break

                case 'turnLeft': this.turnLeft()
                break

                case 'turnRight': this.turnRight()
                break

                default: throw new Error('Mars rover cannot execute an unknown order')
            }
        })
    }

    turnLeft(): void {
        if(this.direction !== 'N') {
        this.direction = CARDINALS[CARDINALS.indexOf(this.direction) - 1]
        }
        else {
            this.direction = 'W'
        }
    }

    turnRight(): void {
        this.direction = CARDINALS[CARDINALS.indexOf(this.direction) + 1 % CARDINALS.length]
    }

    drawWorld(): void {
        let mapArt: string = '';
        let roverDirectionIcon: string = '';

        for (let heightCounter = 0; heightCounter < this.worldMap.height; heightCounter++) {
            for (let widthCounter = 0; widthCounter < this.worldMap.width; widthCounter++) {
                let currentTile = this.worldMap.tiles.find(tile => tile.x === widthCounter && tile.y === heightCounter);

                switch(this.direction){
                    case 'N':
                        roverDirectionIcon = '⬆️ ';
                        break;
                    case 'S':
                        roverDirectionIcon = '⬇️ ';
                        break;
                    case 'E':
                        roverDirectionIcon = '➡️>';
                        break;
                    case 'W':
                        roverDirectionIcon = '⬅️ ';
                        break;
                }
                
                if (this.position.x === widthCounter && this.position.y === heightCounter) {
                    mapArt += roverDirectionIcon;
                } else if (currentTile && currentTile.isObstacle) {
                    mapArt += '🪨';
                } else {
                    mapArt += '🟩';
                }
            }

            if (heightCounter < this.worldMap.height - 1) {
                mapArt += '\n';
            }
        }

        console.log(mapArt) // for comfort of viewing the map when tests are running
        this.worldMapArt = mapArt;
    }
}


