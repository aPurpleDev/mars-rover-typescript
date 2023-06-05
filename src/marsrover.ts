export const CARDINALS: string[] = ['N', 'E', 'S', 'W']

type Direction = typeof CARDINALS[number];

type Increment = { x: number; y: number };

type DirectionIncrement = Record<Direction, Increment>;

export class MarsRover {

    public direction: Direction
    public position: Position
    public worldMap: WorldMap

    constructor(direction: Direction = 'N'
     , position: Position = new Position(), worldMap: WorldMap = new WorldMap()){
        this.direction = direction
        this.position = position
        this.worldMap = worldMap
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
            console.log(order)
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

        this.drawWorld()
    }

    turnLeft(): void {
        if(this.direction !== 'N') {
        this.direction = CARDINALS[CARDINALS.indexOf(this.direction) - 1]
        }
        else {
            this.direction = 'W'
        }

        this.drawWorld()
    }

    turnRight(): void {
        this.direction = CARDINALS[CARDINALS.indexOf(this.direction) + 1 % CARDINALS.length]
        this.drawWorld()
    }

    drawWorld(): string {
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

        console.log(mapArt) // drawing using console log seems the simplest way for the Kata's purpose
        return mapArt;
    }
}

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

export class Position {

    public x: number
    public y: number

    constructor(x: number = 0, y: number = 4){
        this.x = x
        this.y = y
    }
}

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