// Sets up the game board as a 5x5 two-dimensional array.
var locationX;
var locationY;

var board = new Array(8);
for (x = 0; x < board.length; x++) {
    board[x] = new Array(6);
};

var main = function() {
    
};

function rowEdge(x) {
    if (x >= (board.length)) return 0;
    else if (x < 0) return (board.length - 1);
    else return x;
};

function colEdge(y) {
    if (y > (board[0].length)) return 0;
    else if (y < 0) return (board[0].length - 1);
    else return y;
};

// Assigns a random square the wumpus code "9"
function placeWumpus() {
    tempX = Math.floor(Math.random() * (board.length));
    tempY = Math.floor(Math.random() * (board[0].length));
    board[tempX][tempY] = 9;
    board[rowEdge(tempX + 1)][tempY] = 7;
    board[rowEdge(tempX - 1)][tempY] = 7;
    board[tempX][colEdge(tempY + 1)] = 7;
    board[tempX][colEdge(tempY - 1)] = 7;
};

// Assigns a random square the player code "8".  Ensures it is not the same square as the wumpus through recursion.
function placePlayer() {
    locationX = Math.floor((Math.random() * board.length));
    locationY = Math.floor((Math.random() * board[0].length));
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
            $("#0" + x.toString() + "0" + y.toString()).removeClass("near-wumpus");
        }
    }
};

// Places all elements ont the board using jQuery.
function drawBoard() {
    
    // Nested for loops check through every cell of board.
    for (x = 0; x < board.length; x++) {
        var outputL = "";
        for (y = 0; y < board[x].length; y ++) {
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
    checkLocation();
};

function checkLocation() {
    if (board[locationX][locationY] == 7) 
        $("#0" + locationX.toString() + "0" + locationY.toString()).addClass("near-wumpus");
    if (board[locationX][locationY] == 9) 
        $("#0" + locationX.toString() + "0" + locationY.toString()).addClass("wumpus");
};

function moveX (x) {
    if ((locationX + x) < 0) {
        locationX = (board.length - 1);
    }
    else if ((locationX + x) > (board.length - 1)) {
        locationX = 0;
    }
    else {
        locationX += x;
    }
};

function moveY (y) {
    if ((locationY + y) < 0) {
        locationY = (board[0].length - 1);
    }
    else if ((locationY + y) > (board[0].length - 1)) {
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