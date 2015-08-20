/**
 * Created by pstalcup on 8/19/15.
 */
(function() {
    var app = angular.module('rpg', []);

    var CombatController = function ($scope, Messages, GameData, CombatEngine) {
        $scope.heros = GameData.heroes;
        $scope.villains = GameData.enemies;

        $scope.alert = function (message, type) {
            Messages.addMessage(message, type);
        }

        CombatEngine.combat();
    }
    CombatController.$inject = ['$scope', 'Messages', 'GameData', 'CombatEngine'];

    app.controller('CombatController', CombatController);
})();