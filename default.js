// Sets up the game board as a 5x5 two-dimensional array.
var board = new Array(5);
for (x = 0; x < board.length; x++) {
    board[x] = new Array(5);
};
var locationX;
var locationY;
var maxX = 7;
var maxY = 5;

var main = function() {
    
};

// Assigns a random square the wumpus code "9"
function placeWumpus() {
    board[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 5)] = 9;
};

// Assigns a random square the player code "8".  Ensures it is not the same square as the wumpus through recursion.
function placePlayer() {
    locationX = Math.floor((Math.random() * 5));
    locationY = Math.floor((Math.random() * 5));
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
            $("#0" + x.toString() + "0" + y.toString()).removeClass("wumpus");
            $("#0" + x.toString() + "0" + y.toString()).removeClass("player");
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
        };
    };
};

$("#reset").click(function() {
    gameTester();
});

function movePlayer(x, y) {
    $("#0" + locationX.toString() + "0" + locationY.toString()).removeClass("player");
    if (x == 0) {
        moveY(y);
    }
    if (y == 0) {
        moveX(x);
    }
    $("#0" + locationX.toString() + "0" + locationY.toString()).addClass("player");
};

function moveX (x) {
    if ((locationX + x) == -1) {
        locationX = 4;
    }
    else if ((locationX + x) == (maxX + 1)) {
        locationX = 0;
    }
    else {
        locationX += x;
    }
};

function moveY (y) {
    if ((locationY + y) == -1) {
        locationY = 4;
    }
    else if ((locationY + y) == (maxY + 1)) {
        locationY = 0;
    }
    else {
        locationY += y;
    }
};

$(document).keypress(function(e) {
    
    // Move player left
    if (e.which == 97) {
        movePlayer(-1, 0);
    }
    
    // Move player up
    if(e.which == 119) {
        movePlayer(0, -1);
    }
    
    // Move player right
    if(e.which == 100) {
        movePlayer(1, 0);
    }
    
    // Move player down
    if(e.which == 115) {
        movePlayer(0, 1);
    }
});

function gameTester() {
    resetGame();
    placeWumpus();
    placePlayer();
    drawBoard();
};

$(document).ready(gameTester);
$(document).ready(main);