var mineSweeper = (function () {
    "use strict";

    var height,
        width,
        board = [],
        mineCount,
        cellProximityCalculations = [];

    function _isInLastCol (index) {
        return ((index + 1) % width === 0);
    }

    function _isInFirstCol (index) {
        return (index % width === 0);
    }

    function _getNextMinePosition () {
        var nextMinePosition =-1,
            modulator = 0;

        // get a new board position if we don't have a valid position and the
        // position returned is not a mine
        while(nextMinePosition === -1) {
            // we are using the modulator here to vary the new location if
            // the last one generated was already a mine
            nextMinePosition = Math.floor(Math.random() * (height * width - modulator) + modulator);

            // verify next position isn't a mine already
            if(board[nextMinePosition] === -1) {
                // set nextMinePosition to an invalid value
                nextMinePosition = -1;
                // increment modulator so we get a 'better' number
                modulator++;
            }
        }
        return nextMinePosition;
    }

    function _getAdjacentCellArray (index) {
        var adjacentCells = "",
            nextCell = -1,
            cellPos = _isInFirstCol(index)? "firstCol" :
        _isInLastCol(index) ? "lastCol" : "default",
            len = cellProximityCalculations[cellPos].length;

        // while there are more items in this array of calculations
        while(len--) {
            // get index of next cell we need to score
            nextCell = parseInt(index, 10) + parseInt(cellProximityCalculations[cellPos][len],  10);
            // if nextCell location is on the board
            if (nextCell >= 0 && nextCell <= board.length -1) {
                adjacentCells += nextCell + ",";
            }
        }
        // return the adjacentCell string as an array after we remove the last comma
        return adjacentCells.slice(0, -1).split(",");
    }

    function _placeMines () {
        for(var i=0; i < mineCount; i++){
            // get randomized mine position and set it to -1 to indicate presence
            // of a mine
            board[_getNextMinePosition()] = -1;
        }
    }

    function _outputBoard() {
        //deompose board
        var tempBoard = [],
            width = board.width,
            height = board.height;

        for (var i = 0; i < height; i++) {
            tempBoard.push(board.slice(i * width, i * width + width).join(' ').replace(/-1/g,'X'));
        }

        //display board
        console.log(tempBoard.join('\n'));
    }

    function _scoreBoard() {
        var currenctCell,
            currentCellVal,
            adjacentCellArray,
            cellArrayLengthCounter;

        // since board cells were not set to any value, we can use the for in loop
        // to find all the mines and score all their adjacent cells.
        for(var minePos in board) {
            adjacentCellArray = _getAdjacentCellArray(minePos);
            cellArrayLengthCounter = adjacentCellArray.length;

            while (cellArrayLengthCounter--) {
                currenctCell = adjacentCellArray[cellArrayLengthCounter];
                currentCellVal = board[currenctCell];
                // if cell does not have a mine then update the scoring
                if (currentCellVal !== -1) {
                    // if the currentCell doesn't have a score then set it to one
                    // otherwise increment the existing cell
                    currentCellVal = (currentCellVal === undefined) ? 0 : currentCellVal;
                    board[currenctCell] = ++currentCellVal;
                }
            }
        }
    }
    return {
        init: function(h, w, m) {
            var boardLen = h * w;
            height = h;
            width = w;
            mineCount = m;

            // set up cellProximityCalculations
            cellProximityCalculations = {
                "firstCol" : [-1*width, +1-width,
                              +1,
                              +width, +1+width ],
                "lastCol"  : [-1-width, -1*width,
                              -1,
                              -1+width, +width ],
                "default"  : [-1-width, -1*width, +1-width,
                              -1, +1,
                              -1+width, +width, +1+width ]
            };

            // set up board
            board[boardLen] = undefined;
            board['height'] = height;
            board['width'] = width;

            // place mines on board
            _placeMines();

            // score board
            _scoreBoard();
        },
        outputBoard: _outputBoard
    };
}());




console.clear();
mineSweeper.init(3,5,4);
mineSweeper.outputBoard();
