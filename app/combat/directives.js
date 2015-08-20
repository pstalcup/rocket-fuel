/**
 * Created by pstalcup on 8/19/15.
 */
(function(){
    var app = angular.module("rpg");

    app.directive('gameInfo', function () {
        return {
            restrict: 'E',
            controllerAs: 'info',
            templateUrl: 'app/combat/templates/game-info.html',
            controller: ['GameInfo', function () {
                this.gameInfo = GameInfo.info;
            }]
        };
    });

    app.directive('characterPortraits', function () {
        return {
            restrict: 'E',
            scope: {
                characters: '=characters'
            },
            templateUrl: 'app/combat/templates/character-portraits.html',
            controllerAs: 'portrait',
            controller: ['$scope', function ($scope) {
                this.percentage = function (hp) {
                    return parseInt(100 * (hp.current / hp.max));
                }
            }]
        };
    });

    app.directive('combatMessages', function () {
        return {
            templateUrl: 'app/combat/templates/combat-messages.html',
            controller: ['$scope', 'Messages', function ($scope, Messages) {
                $scope.messages = Messages.messages;
            }]
        };
    });

    app.directive('combatActions', function () {
        return {
            templateUrl: 'app/combat/templates/combat-actions.html',
            controller: ['$scope', 'GameData', function ($scope, GameData) {
                $scope.characters = GameData.heroes;
                $scope.previousAction = {};
                $scope.select = function (action) {
                    $scope.previousAction.selected = false;
                    action.selected = true;
                    $scope.previousAction = action;
                }
                $scope.act = function(option) {
                    option.choose(GameData.heroes.concat(GameData.enemies));
                }
            }]
        };
    });
})();