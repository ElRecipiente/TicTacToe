let database = []
let grid = document.querySelectorAll("section.grid div");
let inputCoin = document.querySelectorAll("section.grid div#hoverable");
let logger = document.querySelector("div.log");
let whichTurn = false;
let gameEnd = false;

logger.innerHTML = `<p>Player ONE is orange.<br>Click to the top of the grid to start the game.<p>`

// We want (database.length == 36) here
for (i = 0; i < 35; i++) {
    database.push("");
}

// reload
function reload() {
    location.reload();
}

// IA rand
function rand(i) {
    return Math.ceil(Math.random() * (i - 1))
}

// show result in html
function display() {
    for (let i = 0; i < grid.length; i++) {
        grid[i].textContent = database[i];
    }
}

//tell in log when a column is full
function full(y) {
    if (database[y % 6] == "X" || database[y % 6] == "O") {
        return true;
    }
    else {
        return false;
    }
}

function scrollStayBottom() {
    logger.scrollTop = logger.scrollHeight
}

//inject pulse color when turn X / O true
function pulseRed() {
    for (let i = 0; i < 6; i++) {
        inputCoin[i].classList.remove("pulseBlue");
        if (!inputCoin[i].classList.contains("blue") && !inputCoin[i].classList.contains("red")) {

            inputCoin[i].classList.add("pulseRed");
            console.log(`all red number ${i}`)
        }
    }
}

function pulseBlue() {
    for (let i = 0; i < 6; i++) {
        inputCoin[i].classList.remove("pulseRed");

        if (inputCoin[i].classList.contains("blue") == false && inputCoin[i].classList.contains("red") == false) {
            inputCoin[i].classList.add("pulseBlue");
            console.log(`all blue number ${i}`)
        }
    }
}

pulseRed();

// made symbol "fall" in the grid, like a Puissance 4
function fall(y) {
    if (gameEnd) {
        logger.innerHTML += `<br>Click on "Play again !" if you want to... play again.`;
    }
    else if (whichTurn) {
        // here play "O"
        if (full(y)) {
            logger.innerHTML += `<br>Column full, please try another.`
        }
        else if ((database[y] != "X" && database[y] != "O") && y <= 30) {
            console.log("case courante dispo, following")
            grid[y].classList.add("blueFall")
            setTimeout(() => {
                grid[y].classList.remove("blueFall");
                fall(y + 6);
            }, 200)
                ;
        }
        else if (database[y] == "X" || database[y] == "O" || y > 35) {
            console.log("case courante pas dispo, placement au precedent")
            database[y - 6] = "O";
            grid[y - 6].classList.add("blue");
            display();
            whoWin();
            whichTurn = false;
        }
        else {
            console.log("coucou je suis else")
            database[y] = "O"
            grid[y].classList.add("blue");
            display();
            whoWin();
            whichTurn = false;
        }
        pulseRed();
    }
    // here play "X"
    else {
        if (full(y)) {
            logger.innerHTML += `<br>Column full, please try another.`
        }
        else if ((database[y] != "X" && database[y] != "O") && y <= 30) {
            console.log("case courante dispo, following")
            grid[y].classList.add("redFall")
            setTimeout(() => {
                grid[y].classList.remove("redFall");
                fall(y + 6);
            }, 200)

        }
        else if (database[y] == "X" || database[y] == "O" || y > 35) {
            console.log("case courante pas dispo, placement au precedent")
            database[y - 6] = "X";
            grid[y - 6].classList.add("red");
            display();
            whoWin();
            whichTurn = true;
        }
        else {
            console.log("coucou je suis else")
            database[y] = "X"
            grid[y].classList.add("red");
            display();
            whoWin();
            whichTurn = true;
        }
        pulseBlue();

    }
    scrollStayBottom();
}

//tell in log when a player win
function whoWin() {
    for (let j = 0; j < 2; j++) {
        p = (j == 0 ? "X" : "O")

        // for columns
        for (r = 0; r < database.length; r = r + 6) {
            if ((database[r] == p && database[r + 1] == p && database[r + 2] == p && database[r + 3] == p)
                || (database[r + 1] == p && database[r + 2] == p && database[r + 3] == p && database[r + 4] == p)
                || (database[r + 2] == p && database[r + 3] == p && database[r + 4] == p && database[r + 5] == p)) {
                logger.innerHTML = `<br><p id="color">Player ${p == "X" ? "ONE" : "TWO"} wins !</p><img src="img/thunder.gif" alt="thunder" width="100%"><audio src="music/thunderSound.mp3" autoplay></audio>`;
                gameEnd = true;
            }
        }

        //  for rows
        for (c = 0; c < database.length; c++) {
            if (database[c] == p && database[c + 6] == p && database[c + 12] == p && database[c + 18] == p) {
                logger.innerHTML = `<br><p id="color">Player ${p == "X" ? "ONE" : "TWO"} wins !</p><img src="img/thunder.gif" alt="thunder" width="100%"><audio src="music/thunderSound.mp3" autoplay></audio>`;
                gameEnd = true;
            }

            //and diags
            else if (((c <= 2) || (c >= 6 && c <= 8) || (c >= 12))
                && database[c] == p && database[c + 7] == p && database[c + 14] == p && database[c + 21] == p) {
                logger.innerHTML = `<br><p id="color">Player ${p == "X" ? "ONE" : "TWO"} wins !</p><img src="img/thunder.gif" alt="thunder" width="100%"><audio src="music/thunderSound.mp3" autoplay></audio>`;
                gameEnd = true;
            }
            else if (((c >= 3 && c <= 5) || (c >= 9 && c <= 11) || (c >= 15 && c <= 17))
                && database[c] == p && database[c + 5] == p && database[c + 10] == p && database[c + 15] == p) {
                logger.innerHTML = `<br><p id="color">Player ${p == "X" ? "ONE" : "TWO"} wins !</p><img src="img/thunder.gif" alt="thunder" width="100%"><audio src="music/thunderSound.mp3" autoplay></audio>`;
                gameEnd = true;
            }
        }
    }
}