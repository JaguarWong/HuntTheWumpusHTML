
// Sets up the game board as a 5x5 two-dimensional array.
var board = new Array(5);
for (x = 0; x < board.length; x++) {
    board[x] = new Array(5);
};

var main = function() {
    
};

// Assigns a random square the wumpus code "9"
function placeWumpus() {
    board[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 5)] = 9;
};

// Assigns a random square the player code "8".  Ensures it is not the same square as the wumpus through recursion.
function placePlayer() {
    var locationX = Math.floor((Math.random() * 5));
    var locationY = Math.floor((Math.random() * 5));
    if (board[locationX][locationY] == 9) {
        placePlayer();
    }
    else {
        board[locationX][locationY] = 8;
    }
};

// Clears the game board.
function resetGame() {
    for (x = 0; x < board.length; x++) {
        for (y = 0; y < board[x].length; y ++) {
            board[x][y] = 0;
        }
    }
};

// Places all elements ont the board using jQuery.
function drawBoard() {
    
    // Nested for loops check through every cell of board.
    for (x = 0; x < board.length; x++) {
        var outputL = "";
        for (y = 0; y < board[x].length; y ++) {
            
            // If square contains wumpus, apply "wumpus" css.
            if (board[x][y] == 9) {
                $("#0" + x.toString() + "0" + y.toString()).addClass("wumpus");
            };
            // If square contains player, apply "player" css.
            if (board[x][y] == 8) {
                $("#0" + x.toString() + "0" + y.toString()).addClass("player");
            };
        }
    }
};

function gameTester() {
    resetGame();
    placeWumpus();
    placePlayer();
    drawBoard();
};

$(document).ready(gameTester);
$(document).ready(main);