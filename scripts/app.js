const grid = document.querySelector('.grid');



const width = 5;
const gridCellCount = width * width;
const cells = [];

let shipLocation = 22

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

function addShip() {
  cells[shipLocation].classList.add('ship')
}

function removeShip() {
  cells[shipLocation].classList.remove('ship')
}

function playerControl(event) {
  if (event.keyCode === 37) {
    removeShip()
    shipLocation--
    addShip()
    console.log('ship moved left')
  } else if (event.keyCode === 39) {
    removeShip()
    shipLocation++
    addShip()
    console.log('ship moved right')
  } else {
    console.log('no movement')
  }
}

document.addEventListener('keyup', playerControl)