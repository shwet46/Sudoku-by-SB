let errase = document.getElementById('clear');
let solve = document.getElementById('solve');
let newG = document.getElementById('new-game');
let selected = false;

window.onload = function() {
    create();
    setTable();
    keyPad();
}

newG.addEventListener('click', newGame);
errase.addEventListener('click', remove);
solve.addEventListener('click', autoSolver);

function setTable() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = row + ' ' + col;
            document.getElementById("board").append(tile);
            printValues(tile, row, col);
            if (row == 0 && col == 0) {
                tile.classList.add("top-left-corner-tile");
            }
            if (row == 0 && col == 7) {
                tile.classList.add("top-right-corner-tile");
            }
            if (row == 7 && col == 0) {
                tile.classList.add("bottom-left-corner-tile");
            }
            if (row == 7 && col == 7) {
                tile.classList.add("bottom-right-corner-tile");
            }
            if (row == 1 || row == 3 || row == 5) {
                tile.classList.add("horizontal-line");
            }
            if (col == 3) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
        }
    }
}

function printValues(tile, row, col) {
    if (grid[row][col] !== empty) {
        tile.style.backgroundImage = `url('images/${grid[row][col]}.png')`;
        tile.classList.add("start-num");
    }
}

function keyPad() {
    for (let planet of planets) {
        let planetTile = document.createElement("div");
        planetTile.classList.add("planet-tile");
        document.getElementById("keypad").append(planetTile);
        planetTile.id = planet;
        planetTile.style.backgroundImage = `url('images/${planet}.png')`;
        planetTile.addEventListener("click", insertPlanet);
    }
}

function selectTile() {
    if (selected !== false) {
        selected.classList.remove("tile-selected");
    }
    selected = this;
    if (!selected.classList.contains("start-num")) {
        selected.classList.add("tile-selected");
    }
}

function insertPlanet() {
    let planetTile = this;
    if (planetTile && selected !== false && !selected.classList.contains("start-num")) {
        selected.style.backgroundImage = planetTile.style.backgroundImage;
        let coords = selected.id.split(' ');
        let row = coords[0];
        let col = coords[1];
        grid[row][col] = planetTile.id;
    }
    return win();
}

function remove() {
    if (selected !== false && !selected.classList.contains("start-num")) {
        selected.style.backgroundImage = '';
        let coords = selected.id.split(' ');
        let row = coords[0];
        let col = coords[1];
        grid[row][col] = empty;
    }
}

function autoSolver() {
    let tile = document.querySelectorAll('.tile');
    for (let i = 0; i < tile.length; i++) {
        let row = Math.floor(i / 8);
        let col = i % 8;
        tile[i].style.backgroundImage = `url('images/${finalGrid[row][col]}.png')`;
        tile[i].classList.add("start-num");
    }
    document.getElementById("game-status").innerText = 'SOLVED';
    if (selected) {
        selected.classList.remove("tile-selected");
    }
}

function newGame() {
    let tile = document.querySelectorAll('.tile');
    create();
    for (let i = 0; i < tile.length; i++) {
        let row = Math.floor(i / 8);
        let col = i % 8;
        tile[i].style.backgroundImage = '';
        tile[i].classList.remove("start-num");
        if (grid[row][col] !== empty) {
            tile[i].style.backgroundImage = `url('images/${grid[row][col]}.png')`;
            tile[i].classList.add("start-num");
        }
    }
    if (selected) {
        selected.classList.remove("tile-selected");
    }
    document.getElementById("game-status").innerText = 'GAME STARTED';
}

function win() {
    if (!isFull() || !checkSolution()) {
        return false;
    }

    let tile = document.querySelectorAll('.tile');
    for (let i = 0; i < tile.length; i++) {
        tile[i].classList.add("start-num");
    }
    selected.classList.remove("tile-selected");
    document.getElementById("game-status").innerText = 'YOU WIN';
    return true;
}