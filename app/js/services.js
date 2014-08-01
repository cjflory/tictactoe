(function () {
  'use strict';

  angular.module('TicTacToe.Services', [])
    .service('Game', function () {
      var that = this;

      this.message = null;
      this.x = {name: 'x', board: 0};
      this.o = {name: 'o', board: 0};
      this.currentBoard = function () {
        return (512 | that.x.board | that.o.board).toString(2).slice(1);
      };
      this.gameOver = false;
      this.positions = [
        {x: 0, y: 0},
        {x: 104, y: 0},
        {x: 208, y: 0},
        {x: 0, y: 104},
        {x: 104, y: 104},
        {x: 208, y: 104},
        {x: 0, y: 208},
        {x: 104, y: 208},
        {x: 208, y: 208}
      ];
      this.turnX = Math.round(Math.random()) === 0;
      this.hasWon = function (board) {
        var wins = [7, 56, 448, 73, 146, 292, 84, 273];

        for (var i=0; i<wins.length; i++) {
          if ((board & wins[i]) === wins[i]) { return true; }
        }
        return false;
      };
      this.score = function () {
        var done = (that.x.board | that.o.board) === 511,
          winner = that.hasWon(that.x.board) ? that.x : that.hasWon(that.o.board) ? that.o : null;

        if (winner) {
          that.message = 'Player "' + winner.name + '" wins!!!';
          that.gameOver = true;
        } else if (done) {
          that.message = 'The game is a draw';
          that.gameOver = true;
        }
      };
      this.move = function (index) {
        var player = that.turnX ? that.x : that.o,
          offset = Math.abs(that.positions.length - index - 1),
          board = that.currentBoard();

        if (that.gameOver) {
          that.message = 'The game is over';
          return;
        }

        if (board[index] === '1') { return; }

        player.board = player.board | (1 << offset);
        that.positions[index].player = player.name;
        that.turnX = !that.turnX;
        that.score();
      };
      this.newGame = function () {
        that.message = null;
        that.x.board = 0;
        that.o.board = 0;
        that.gameOver = false;
        for (var i=0; i<that.positions.length; i++) {
          delete that.positions[i].player;
        }
        that.turnX = Math.round(Math.random()) === 0;
      };
    });

}());
