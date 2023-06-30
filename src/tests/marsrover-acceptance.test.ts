import { MarsRover } from "../classes/marsrover"
import { Position } from "../classes/position"
import { WorldMap } from "../classes/worldmap"

describe('Mars rover acceptance test', function() {

    test('Exploration scenario', () => {
    const marsRover = new MarsRover('N', new Position(), new WorldMap(5, 5, [{x:0, y:1, isObstacle: true}]))
    expect(marsRover).toHaveProperty('position', {x: 0, y: 4})
    marsRover.executeOrders(['advance', 'advance', 'advance', 'turnRight', 'turnRight'])
    marsRover.drawWorld()
    expect(marsRover).toHaveProperty('position', {x: 0, y: 2})
    expect(marsRover).toHaveProperty('direction', 'S')
    expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🪨🟩🟩🟩🟩
⬇️ 🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩`)
    })
})