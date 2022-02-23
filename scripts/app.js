// DOM connection to the grid
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score-display')
// Setting the size of the grid 
//? will likely have to be adjusted? need to figure out div size scaling in css to keep even
const width = 10;
const gridCellCount = width * width;
const cells = Array.from(document.querySelectorAll('.grid div'))
// ? array for edges - will need to update if the grid becomes bigger
const edges = [0, 9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99]

// Setting the initial ship location
let shipLocation = 95

// Setting the initial aliens location
let alienLocations = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
let direction = 1
let movingRight = true
let aliensKilled = []
let score = 0
let aliensMoving
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
    if (edges.includes(i)) cell.classList.add('edges')
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
      direction = -1
      movingRight = false
    }
  }
  if (leftEdge && !movingRight) {
    for (let i = 0; i < alienLocations.length; i++) {
      alienLocations[i] += width - 1
      direction = 1
      movingRight = true
    }
  }
  for (let i = 0; i < alienLocations.length; i++) {
    alienLocations[i] += direction
  }
  makeAliens()

  if (cells[shipLocation].classList.contains('alien', 'ship')) {
    scoreDisplay.innerHTML = 'You Lost!'
    clearInterval(aliensMoving)
  }

  for (let i = 0; i < alienLocations.length; i++) {
    console.log(alienLocations[i])
    if (alienLocations[i] >= 99) {
      scoreDisplay.innerHTML = 'You Lost!'
      clearInterval(aliensMoving)
    }
  } 
  if (aliensKilled.length === alienLocations.length) {
    scoreDisplay.innerHTML = 'You won!'
    clearInterval(aliensMoving)
  }

}

// aliensMoving = setInterval(moveAliens, 200)



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

      setTimeout(() => cells[currentLaserLocation].classList.remove('explosion'), 400)
      clearInterval(laserTimer)

      const alienKilled = alienLocations.indexOf(currentLaserLocation)
      aliensKilled.push(alienKilled)
      console.log(aliensKilled)
      score++
      scoreDisplay.innerHTML = `score: ${score}`
      console.log(score)
    }
  }
  switch (event.keyCode) {
    case 32:
      laserTimer = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)


// making the DOM listen for a keyup event in which case it calls the playerControl function

document.addEventListener('keyup', playerControl)


// 8 || 17 || 26 || 35 || 44 || 53 || 62 || 71 || 80 || 89 || 98
