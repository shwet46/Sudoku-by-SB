const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
let grid = [];
let finalGrid = [];
let empty = '';

function create() {
    for (let i = 0; i < 8; i++) {
        grid[i] = Array(8).fill(empty);
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
    return rowValid(col, planet) && colValid(row, planet) && boxValid(row, col, planet);
}

function rowValid(col, planet) {
    for (let i = 0; i < 8; i++) {
        if (grid[i][col] === planet) {
            return false;
        }
    }
    return true;
}

function colValid(row, planet) {
    for (let j = 0; j < 8; j++) {
        if (grid[row][j] === planet) {
            return false;
        }
    }
    return true;
}

function boxValid(row, col, planet) {
    let boxRow = row - (row % 2);
    let boxCol = col - (col % 4);
    for (let i = boxRow; i < boxRow + 2; i++) {
        for (let j = boxCol; j < boxCol + 4; j++) {
            if (grid[i][j] === planet) {
                return false;
            }
        }
    }
    return true;
}

function makeUnique() {
    for (let row = 0; row < 7; row++) {
        let planet = planets[Math.floor(Math.random() * 8)];
        while (!isValid(row, 0, planet)) {
            planet = planets[Math.floor(Math.random() * 8)];
        }
        grid[row][0] = planet;
    }
    return true;
}

function solver() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (grid[row][col] === empty) {
                for (let planet of planets) {
                    if (isValid(row, col, planet)) {
                        grid[row][col] = planet;
                        if (solver()) {
                            return true;
                        }
                        grid[row][col] = empty;
                    }
                }
                return false;
            }
        }
    }
    copy(grid, finalGrid);
    return true;
}

function setGame() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let random = Math.floor(Math.random() * 64) + 1;
            if (random > 16) {
                grid[i][j] = empty;
            }
        }
    }
    return true;
}

function isFull() {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            if (grid[row][col] === empty) {
                return false;
            }
        }
    }
    return true;
}

function checkSolution() {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
            if (grid[row][col] !== finalGrid[row][col]) {
                return false;
            }
        }
    }
    return true;
}