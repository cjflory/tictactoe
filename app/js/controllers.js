(function () {
  'use strict';

  angular.module('TicTacToe', ['TicTacToe.Services'])
    .controller('MainController', ['$scope', 'Game', function ($scope, Game) {
      $scope.game = Game;
    }]);

}());
