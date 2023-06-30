import { MarsRover } from '../classes/marsrover'
import { WorldMap } from '../classes/worldmap'

describe('Mars rover exploration unit tests', function() {

    test('Should instanciate Rover with initial position 0, 4 and facing north', () => {
        const marsRover = new MarsRover()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('position', {x: 0, y: 4})
        expect(marsRover).toHaveProperty('direction', 'N')
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
⬆️ 🟩🟩🟩🟩`)
    })

    test('Should be able to turn right from N to E', () => {
        const marsRover = new MarsRover()
        marsRover.turnRight()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('direction', 'E')
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
➡️>🟩🟩🟩🟩`)
    })

    test('Should be able to turn right from E to S', () => {
        const marsRover = new MarsRover('E', {x: 0, y: 4})
        marsRover.turnRight()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('direction', 'S')
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
⬇️ 🟩🟩🟩🟩`)
    })

    test('Should be able to turn right from S to W', () => {
        const marsRover = new MarsRover('S', {x: 0, y: 4})
        marsRover.turnRight()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('direction', 'W')
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
⬅️ 🟩🟩🟩🟩`
        )
    })

    test('Should be able to turn right from W to N', () => {
        const marsRover = new MarsRover('S', {x: 0, y: 4})
        marsRover.turnRight()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('direction', 'W')
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
⬅️ 🟩🟩🟩🟩`)
    })

    test('Should be able to turn left from N to W', () => {
        const marsRover = new MarsRover()
        marsRover.turnLeft()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('direction', 'W')
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
⬅️ 🟩🟩🟩🟩`
        )
    })

    test('Should be able to advance if there is no obstacle', () => {
        const marsRover = new MarsRover('N', {x: 0, y: 4}, new WorldMap(5, 5, [{x:0, y:3, isObstacle: false}]))
        marsRover.advance()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('position', {x: 0, y: 3})
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
⬆️ 🟩🟩🟩🟩
🟩🟩🟩🟩🟩`)
    })

    test('Should be able to take multiple commands', () => {
        const marsRover = new MarsRover('N', {x: 0, y: 4}, new WorldMap(5, 5, [{x:0, y:3, isObstacle: false}]))
        marsRover.executeOrders(['advance', 'turnRight'])
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('position', {x: 0, y: 3})
        expect(marsRover).toHaveProperty('direction', 'E')
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
➡️>🟩🟩🟩🟩
🟩🟩🟩🟩🟩`
        )
    })

    test('Should be blocked if there is an obstacle', () => {
        const marsRover = new MarsRover('N', {x: 0, y: 4}, new WorldMap(5, 5, [{x:0, y:3, isObstacle: true}]))
        marsRover.advance()
        marsRover.drawWorld()
        expect(marsRover).toHaveProperty('position', {x: 0, y: 4})
        expect(marsRover.worldMapArt).toEqual(
`🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🟩🟩🟩🟩🟩
🪨🟩🟩🟩🟩
⬆️ 🟩🟩🟩🟩`
        )
    })
})
