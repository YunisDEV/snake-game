import { getInputDirection } from './input.js'

const snakeBody = [
    { x: 11, y: 11 },
]

let newSegments = 0

export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    for (var i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

}

export function draw(gameBoard) {
    snakeBody.forEach(part => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = part.y
        snakeElement.style.gridColumnStart = part.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}



export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((part, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(part, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

export function expandSnake(amount) {
    newSegments += amount
}

function addSegments() {
    for (var i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}