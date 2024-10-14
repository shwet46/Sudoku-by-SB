const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
let grid = [];
let finalGrid = [];
let empty = '';

function create() {
    for (let i = 0; i < 9; i++) {
        grid[i] = Array(9).fill(empty);
    }
    return makeUnique() && solver() && setGame();
}

function copy(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
        array2[i] = [...array1[i]];
    }
    return array2;
}

function isValid(row, col, planet) {
    return rowValid(row, planet) && colValid(col, planet) && boxValid(row, col, planet);
}

function rowValid(row, planet) {
    return !grid[row].includes(planet);
}

function colValid(col, planet) {
    return !grid.map(row => row[col]).includes(planet);
}

function boxValid(row, col, planet) {
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (grid[i][j] === planet) {
                return false;
            }
        }
    }
    return true;
}

function makeUnique() {
    for (let i = 0; i < 9; i++) {
        let planet = planets[Math.floor(Math.random() * 9)];
        while (!isValid(i, i, planet)) {
            planet = planets[Math.floor(Math.random() * 9)];
        }
        grid[i][i] = planet;
    }
    return true;
}

function solver() {
    let emptySpot = findEmptySpot();
    if (!emptySpot) {
        return true; // puzzle is solved
    }

    let [row, col] = emptySpot;

    for (let planet of planets) {
        if (isValid(row, col, planet)) {
            grid[row][col] = planet;

            if (solver()) {
                return true;
            }

            grid[row][col] = empty; // backtrack
        }
    }

    return false; // no solution exists
}

function findEmptySpot() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === empty) {
                return [row, col];
            }
        }
    }
    return null; // no empty spots
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() > 0.3) {
                grid[i][j] = empty;
            }
        }
    }
    copy(grid, finalGrid);
    return true;
}

function isFull() {
    return grid.every(row => row.every(cell => cell !== empty));
}

function checkSolution() {
    return grid.every((row, i) => row.every((cell, j) => cell === finalGrid[i][j]));
}