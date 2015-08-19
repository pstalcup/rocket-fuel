/**
 * Created by pstalcup on 8/19/15.
 */
(function() {
    var app = angular.module('rpg', []);

    var CombatController = function ($scope, Messages, GameData) {
        $scope.heros = GameData.heroes;
        $scope.villains = GameData.enemies;

        $scope.alert = function (message, type) {
            Messages.addMessage(message, type);
        }
    }
    CombatController.$inject = ['$scope', 'Messages', 'GameData'];

    app.controller('CombatController', CombatController);
})();