let errase = document.getElementById('clear');
let solve = document.getElementById('solve');
let newG = document.getElementById('new-game');
let selected = null;

window.onload = function() {
    create();
    setTable();
    keyPad();
}

newG.addEventListener('click', newGame);
errase.addEventListener('click', remove);
solve.addEventListener('click', autoSolver);

function setTable() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = row + ' ' + col;
            document.getElementById("board").append(tile);
            printValues(tile, row, col);
            if (row === 0 && col === 0) {
                tile.classList.add("top-left-corner-tile");
            }
            if (row === 0 && col === 8) {
                tile.classList.add("top-right-corner-tile");
            }
            if (row === 8 && col === 0) {
                tile.classList.add("bottom-left-corner-tile");
            }
            if (row === 8 && col === 8) {
                tile.classList.add("bottom-right-corner-tile");
            }
            if (row === 2 || row === 5) {
                tile.classList.add("horizontal-line");
            }
            if (col === 2 || col === 5) {
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
    if (selected !== null) {
        selected.classList.remove("tile-selected");
    }
    selected = this;
    selected.classList.add("tile-selected");
}

function insertPlanet() {
    if (selected && !selected.classList.contains("start-num")) {
        selected.style.backgroundImage = this.style.backgroundImage;
        let coords = selected.id.split(" ");
        let row = parseInt(coords[0]);
        let col = parseInt(coords[1]);
        grid[row][col] = this.id;
        if (isFull()) {
            checkWin();
        }
    }
}

function remove() {
    if (selected && !selected.classList.contains("start-num")) {
        selected.style.backgroundImage = '';
        let coords = selected.id.split(" ");
        let row = parseInt(coords[0]);
        let col = parseInt(coords[1]);
        grid[row][col] = empty;
    }
}

function checkWin() {
    if (checkSolution()) {
        document.getElementById("game-status").innerText = 'YOU WIN!';
    } else {
        document.getElementById("game-status").innerText = 'TRY AGAIN';
    }
}

function autoSolver() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let tile = document.getElementById(row + " " + col);
            if (!tile.classList.contains("start-num")) {
                grid[row][col] = empty;
                tile.style.backgroundImage = '';
            }
        }
    }

    if (solver()) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                let tile = document.getElementById(row + " " + col);
                if (grid[row][col] !== empty) {
                    tile.style.backgroundImage = `url('images/${grid[row][col]}.png')`;
                }
            }
        }
        document.getElementById("game-status").innerText = 'Scroll down to find something :)';
    } else {
        document.getElementById("game-status").innerText = 'NO SOLUTION EXISTS!';
    }
}

function newGame() {
    let tiles = document.querySelectorAll('.tile');
    create();
    for (let i = 0; i < tiles.length; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        tiles[i].style.backgroundImage = '';
        tiles[i].classList.remove("start-num");
        if (grid[row][col] !== empty) {
            tiles[i].style.backgroundImage = `url('images/${grid[row][col]}.png')`;
            tiles[i].classList.add("start-num");
        }
    }
    if (selected) {
        selected.classList.remove("tile-selected");
        selected = null;
    }
    document.getElementById("game-status").innerText = 'Anyone wondering where pluto is ? solve this to know by keeping an empty space for pluto :)';
}