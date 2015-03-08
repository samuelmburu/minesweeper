function MineSweeper(height, width, mines) {
    //static vars
    this.board = [];
    this.height = height;
    this.width = width;
    this.mines = mines;
}
MineSweeper.prototype.placeMines = function () {
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = 0;
    }

    for (var j=0; j<this.mines; j++){
      var newPos = Math.floor(Math.random()* (this.width * this.height + 1));
      if(this.board[newPos] > -1) {
        this.board[newPos] = -1;
      } else {
        // make sure we add all the mines onto the board
        j--;
      }
    }
    console.log(runtime);
};
MineSweeper.prototype.outputBoard = function () {
    //deompose board
    var tempBoard = [
    ];
    for (var i = 0; i < this.height; i++) {
      tempBoard.push(this.board.slice(i * this.width, i * this.width + this.width).join(' ').replace(/-1/g,'X'));
    }
    //display board
    console.log(tempBoard.join('\n'));
};
MineSweeper.prototype.isMine = function(index) {
    return (this.board[index] === -1);
};
MineSweeper.prototype.scoreBoard = function () {
    for (var i = 0; i < this.board.length; i++) {
        // if we have a mine -> do stuff
        if (this.board[i] == -1) {
          var currentRow = Math.floor(i/this.width),
            currenctCell = i,
            previousCell = i-1,
            nextCell = i+1,
            isStartOfRow = (i === currentRow * this.width)? true: false,
            isEndofRow = (i > 0)? ((i+1) % this.width === 0)? true: false: false;

            // look at previous row iff we are not in the first row
            if(i > 0) {
                // look at previous cell in row above
                if((i > 0) && !isStartOfRow) {
                    this.board[previousCell - this.width] += (this.isMine(previousCell - this.width))? 0 : 1;
                }
                // look at cell directly above current cell
                if((currenctCell - this.width) >= 0) {
                    this.board[currenctCell - this.width] += (this.isMine(currenctCell - this.width))? 0 : 1;
                }
                // look at cell after current cell in row above
                if(((nextCell - this.width) < this.board.length -1) && !isEndofRow) {
                    this.board[nextCell - this.width] += (this.isMine(nextCell - this.width))? 0 : 1;
                }
            }

            // look at current row
            if(((previousCell) >= 0) && !isStartOfRow) {
                this.board[previousCell] += (this.isMine(previousCell))? 0 : 1;
            }
            if(((nextCell < this.board.length -1))  && !isEndofRow) {
                this.board[nextCell] += (this.isMine(nextCell))? 0 : 1;
            }

            // look at next row
            if((currenctCell + this.width) < this.board.length -1) {
                // look at previous cell -- granted we are not at the first cell on grid
                if(((previousCell + this.width) >= 0) && (i !== 0) && !isStartOfRow) {
                    this.board[previousCell + this.width] += (this.isMine(previousCell + this.width))? 0 : 1;
                }
                // look at cell directly above current cell
                if((currenctCell + this.width) >= 0) {
                    this.board[currenctCell + this.width] += (this.isMine(currenctCell + this.width))? 0 : 1;
                }
                // look at cell after current cell
                if(((nextCell + this.width) < this.board.length -1) && !isEndofRow) {
                    this.board[nextCell + this.width] += (this.isMine(nextCell + this.width))? 0 : 1;
                }
            }
        }
    }
};
MineSweeper.prototype.init = function () {
    var dimensions = this.height * this.width;
    this.board = new Array(dimensions);
    //place mines
    this.placeMines();
    //display board
    this.outputBoard();
};

console.clear();
var m = new MineSweeper(3,5,4);
m.init();
m.scoreBoard();
m.outputBoard();
