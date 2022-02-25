// DOM connection to the grid
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score-display')
const livesDisplay = document.querySelector('.lives-display')
const startButton = document.querySelector('.start-button')
const restartButton = document.querySelector('.restart-button')

// Setting the size of the grid 
const width = 10;
const gridCellCount = width * width;
const cells = Array.from(document.querySelectorAll('.grid div'))
// Setting the initial ship location and lives
let shipLocation = 95
let lives = 3
// Setting the initial aliens location
let alienLocations = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
let moveDirection = 1
let movingRight = true
let aliensKilled = []
let score = 0
let aliensMoving = 0
let bombDropping = 0

// Functions to both add and remove the ship, using DOM css class editing
function addShip() {
  cells[shipLocation].classList.add('ship')
}
function removeShip() {
  cells[shipLocation].classList.remove('ship')
}

// Function to duplicate divs to the size pre-determined above + give them ids so can be manipulated & calling the function to make the ship appear
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', i);
    cells.push(cell);
    grid.appendChild(cell);

  }
  addShip()
}
createGrid()

function makeAliens() {
  for (let i = 0; i < alienLocations.length; i++) {
    if (!aliensKilled.includes(i)) {
      cells[alienLocations[i]].classList.add('alien')
    }
  }
}
makeAliens()

function removeAliens() {
  for (let i = 0; i < alienLocations.length; i++) {
    cells[alienLocations[i]].classList.remove('alien')
  }
}

function playerControl(event) {
  removeShip()

  switch (event.keyCode) { //  check if on the edge and move if not.
    // Move right
    case 39:
      if (!(shipLocation % width === width - 1)) shipLocation++
      break
    //  Move left
    case 37:
      if (!(shipLocation % width === 0)) shipLocation--
      break
  }

  addShip() //  add ship back at the new location
}

function moveAliens() {
  const rightEdge = alienLocations[alienLocations.length - 1] % width === width - 1
  const leftEdge = (alienLocations[0] % width === 0)
  removeAliens()

  if (rightEdge && movingRight) {
    for (let i = 0; i < alienLocations.length; i++) {
      alienLocations[i] += width + 1
      moveDirection = -1
      movingRight = false
    }
  }
  if (leftEdge && !movingRight) {
    for (let i = 0; i < alienLocations.length; i++) {
      alienLocations[i] += width - 1
      moveDirection = 1
      movingRight = true
    }
  }
  for (let i = 0; i < alienLocations.length; i++) {
    alienLocations[i] += moveDirection
  }
  makeAliens()

  if (cells[shipLocation].classList.contains('alien', 'ship')) {
    scoreDisplay.innerHTML = 'You Lost!'
    clearInterval(aliensMoving)
    clearInterval(bombDropping)
  }

  for (let i = 0; i < alienLocations.length; i++) {
    if (alienLocations[i] >= 100) {
      scoreDisplay.innerHTML = 'You Lost!'
      clearInterval(aliensMoving)
      clearInterval(bombDropping)
    }
  }
  if (aliensKilled.length === alienLocations.length) {
    scoreDisplay.innerHTML = 'You won!'
    clearInterval(aliensMoving)
    clearInterval(bombDropping)
  }
}

function alienBomb() {
  let currentBombLocation = alienLocations[Math.floor(Math.random() * alienLocations.length)]
  let bombTimer = setInterval(moveBomb, 300)
  function moveBomb() {
    cells[currentBombLocation].classList.remove('bomb')
    currentBombLocation += width
    cells[currentBombLocation].classList.add('bomb')
    if (currentBombLocation >= 99) {
      clearInterval(bombTimer)
    }

    if (cells[currentBombLocation].classList.contains('ship')) {
      cells[currentBombLocation].classList.remove('bomb')
      lives--
      livesDisplay.innerHTML = `Lives: ${lives}`
    }
    if (lives === 0) {
      scoreDisplay.innerHTML = 'You Lost!'
      clearInterval(bombTimer)
      clearInterval(aliensMoving)
      clearInterval(bombDropping)
    }
  }
}

function startGame() {
  bombDropping = setInterval(alienBomb, 1500)
  aliensMoving = setInterval(moveAliens, 1000)
}

function restartGame() {
  window.location.reload()
}
startButton.addEventListener('click', startGame)
restartButton.addEventListener('click', restartGame)

function shoot(event) {
  let laserTimer = 0
  let currentLaserLocation = shipLocation
  function moveLaser() {
    cells[currentLaserLocation].classList.remove('laser')
    currentLaserLocation -= width
    cells[currentLaserLocation].classList.add('laser')

    if (cells[currentLaserLocation].classList.contains('alien')) {
      cells[currentLaserLocation].classList.remove('laser')
      cells[currentLaserLocation].classList.remove('alien')
      cells[currentLaserLocation].classList.add('explosion')

      setTimeout(() => cells[currentLaserLocation].classList.remove('explosion'), 500)
      clearInterval(laserTimer)

      const alienKilled = alienLocations.indexOf(currentLaserLocation)
      aliensKilled.push(alienKilled)
      score++
      scoreDisplay.innerHTML = `score: ${score}`
    }
  }
  switch (event.keyCode) {
    case 67:
      laserTimer = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)
document.addEventListener('keyup', playerControl)


// document.getElementsByClassName('alien').style.transform = 'scaleX(-1)'


// const nextLevelButton = document.querySelector('next-level')
// function startGame2() {
//   bombDropping = setInterval(alienBomb, 750)
//   aliensMoving = setInterval(moveAliens, 750)
// }

// nextLevelButton.addEventListener('click', startGame2)
