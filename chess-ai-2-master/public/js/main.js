// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill) {
  // exit if the game is over
  if (game.game_over() === true) {
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 0) {
    var move = calcBestMove(skill+1, game, game.turn())[1];
  } else if (algo === 1) {
    var move = calcBestMoveBoardPos(skill+1, game, game.turn())[1];
  } else {
    var move = calcBestMoveBoardPosPawnStruct(skill+1, game, game.turn())[1];
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(algoW=1, algoB=1, skillW=2, skillB=2) {
    if (game.game_over() === true) {
        console.log("white");
        console.log(algoW+1);
        console.log(skillW+1);
        console.log("black");
        console.log(algoB+1);
        console.log(skillB+1);
        if ((game.turn() == 'b') && (game.in_checkmate())) {
            console.log("white wins");
        } else if ((game.turn() == 'w') && (game.in_checkmate())) {
            console.log("black wins");
        } else if (game.in_draw()) {
            console.log("draw");
        }
    return;
  }
  var algo = game.turn() === 'w' ? algoW : algoB;
  var skill = game.turn() === 'w' ? skillW : skillB;
  makeMove(algo, skill);

  window.setTimeout(function() {
    playGame(algoW, algoB, skillW, skillB);
  }, 250);
};

// Computer vs Computer
   var playGameWrapper = function(num=1) {
    //3-d array to keep track of results
    var results = new Array();
    //run the number of games that the function was called with
    for(i=0; i<num; i++) {
        console.log("start");
        //randomize the algorithm and depth for white
        var algW = Math.floor(Math.random() * 2);
        var skillW = Math.floor(Math.random() * 3);
        //make sure black doesn't have the same algorithm and depth
        var algB = algW;
        var skillB = skillW;
        while ((algW == algB) && (skillW == skillB)) {
            algB = Math.floor(Math.random() * 2);
            skillB = Math.floor(Math.random() * 3);
        }
        //play a game with these parameters
        window.setTimeout(function() {
            playGame(algW, algB, skillW, skillB);
        });

        //reset the game
        game.reset();
        board.clear();
        board.start();
    }
    /*report results
    console.log("printing");
    var fs = require('fs');
    fs.open('C:\Users\Sarah\Documents\_Spring19\471\chess-ai-2-master\public\results.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });
    for(m=0; m<9; m++) {
        for(n=0; n<9; n++) {
            for(o=0; o<4; o++) {
                fs.appendFile('C:\Users\Sarah\Documents\_Spring19\471\chess-ai-2-master\public\results.txt', results[m][n][o], function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                });
                fs.appendFile('results.txt', '  ', function (err) {
                    if (err) throw err;
                    console.log('Updated!');
                });
            }
            fs.appendFile('results.txt', '      ', function (err) {
                if (err) throw err;
                console.log('Updated!');
            });
        }
        fs.appendFile('results.txt', "\r\n", function (err) {
            if (err) throw err;
            console.log('Updated!');
        });
    }
    */
}


// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};
