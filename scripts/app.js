// DOM connection to the grid
const grid = document.querySelector('.grid');

// Setting the size of the grid 
//? will likely have to be adjusted? need to figure out div size scaling in css to keep even
const width = 10;
const gridCellCount = width * width - 1;
const cells = Array.from(document.querySelectorAll('.grid div'))
// ? array for edges - will need to update if the grid becomes bigger
const edges = [0, 8, 9, 17, 18, 26, 27, 35, 36, 44, 45, 53, 54, 62, 63, 71, 72, 80, 81, 89, 90, 98]

// Setting the initial ship location
let shipLocation = 94

// Setting the initial aliens location
let alienLocations = [2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24,]
let currentAlienLocation = 0
let direction = 1
let movingRight = true
let aliensKilled = []
let score = 0
// Functions to both add and remove the ship, using DOM css class editing
function addShip() {
  cells[shipLocation].classList.add('ship')
}
function removeShip() {
  cells[shipLocation].classList.remove('ship')
}


//checking the edges
function onEdge(direction) {
  return edges.includes(direction)
}

// Function to duplicate divs to the size pre-determined above + give them ids so can be manipulated & calling the function to make the ship appear
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', i);
    cells.push(cell);
    cell.textContent = i
    grid.appendChild(cell);
    if (edges.includes(i)) cell.classList.add('edges')
  }
  addShip()
}

createGrid()

function makeAliens() {
  for (let i = 0; i < alienLocations.length; i++) {
    cells[alienLocations[i]].classList.add('alien')
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
      if (!onEdge(shipLocation + 1)) shipLocation++
      break
    //  Move left
    case 37:
      if (!onEdge(shipLocation - 1)) shipLocation--
      break
  }

  addShip() //  add ship back at the new location
}




function moveAliens() {
  removeAliens()
  if (!onEdge(alienLocations[alienLocations.length - 1]) + 1)
    for (let i = 0; i < alienLocations.length; i++) {
      alienLocations[i] += 1
    }
  makeAliens()
}

aliensMoving = setInterval(moveAliens, 1000)



function shoot(event) {
  let laserTimer = 0
  let currentLaserLocation = shipLocation
  function moveLaser() {
    cells[currentLaserLocation].classList.remove('laser')
    currentLaserLocation -= width - 1
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
//