// DOM connection to the grid
const grid = document.querySelector('.grid');

// Setting the size of the grid 
//! will likely have to be adjusted? need to figure out div size scaling in css to keep even
const width = 5;
const gridCellCount = width * width;
const cells = [];

// Setting the initial ship location
let shipLocation = 22

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

function playerControl(event) {
  if (event.keyCode === 37) {  // 37 for left arrow key, if pressed do this
    removeShip()
    shipLocation--
    addShip()
    console.log('ship moved left')
  } else if (event.keyCode === 39) { // 39 for right arrow key
    removeShip()
    shipLocation++
    addShip()
    console.log('ship moved right')
  } else {
    console.log('no movement')
  }
}

// making the DOM listen for a keyup event in which case it calls the playerControl function
document.addEventListener('keyup', playerControl) 