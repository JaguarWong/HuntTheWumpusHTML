var board = new Array(5);
for (x = 0; x < board.length; x++) {
    board[x] = new Array(5);
};

var main = function() {
    
};

function placeWumpus() {
    board[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 5)] = 9;
};

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

function resetGame() {
    for (x = 0; x < board.length; x++) {
        for (y = 0; y < board[x].length; y ++) {
            board[x][y] = 0;
        }
    }
};

function drawBoard() {
    for (x = 0; x < board.length; x++) {
        var outputL = "";
        for (y = 0; y < board[x].length; y ++) {
            if (board[x][y] == 9) {
                $("#0" + x.toString() + "0" + y.toString()).addClass("wumpus");
            };
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