(function(){
	//TODO: Register a service to hold game data

	var gameInfo = {
		name: 'Rocket Fuel',
		author: 'Patrick Stalcup',
		version: '1.0.0'
	}

	var heros = [{
			name: 'Patrick',
			hp: {
				current: 80,
				max: 100
			},
			actions: [
				{
					text:"Fight",
					options: ["A","B","C"]
				}, {
					text:"Run",
					options: ["A","B","C"]
				}]
		},{
			name: 'Will',
			hp: {
				current: 20,
				max: 20
			},
			actions: [
				{
					text:"Fight",
					options: ["A","B","C"]
				}, {
					text:"Run",
					options: ["A","B","C"]
				}],
			selected: false
		}
	];
	var villains = [{
			name: 'Snake',
			hp: {
				current: 10,
				max: 10
			}
		},{
			name: 'Rat',
			hp: {
				current: 20,
				max: 20
			}
		}
	];
	var messages = [];

	var app = angular.module('rpg', []);

	//controllers
	app.controller('CombatController', ['$scope', '$timeout', function($scope, $timeout){
		$scope.heros = heros; 
		$scope.villains = villains; 

		$scope.alert = function(message, type) {
			if (type === undefined) {
				type = 'info'; 
			}
			messages.push({type: type, content: message}); 
			$timeout(function(){
				messages.shift(); 
			}, 4000);
		}
	}]); 

	//directives
	app.directive('gameInfo', function(){
		return {
			restrict: 'E',
			controllerAs: 'info',
			templateUrl: 'templates/game-info.html',
			controller: function(){
				this.gameInfo = gameInfo; 
			}
		};
	});

	app.directive('characterPortraits', function(){
		return {
			restrict: 'E',
			scope: {
				characters: '=characters'
			},
			templateUrl: 'templates/character-portraits.html',
			controllerAs: 'portrait',
			controller: function(){
				this.percentage = function(hp) {
					return parseInt(100 * (hp.current / hp.max)); 
				}
			}
		};
	});

	app.directive('combatMessages', function(){
		return {
			templateUrl: 'templates/combat-messages.html',
			controller: ['$scope', function($scope) {
				$scope.messages = messages; 
			}]
		};
	});

	app.directive('combatActions', function(){
		return {
			templateUrl: 'templates/combat-actions.html',
			controller: ['$scope', function($scope) {
				$scope.characters = heros; 
				$scope.previousAction = {}; 
				$scope.act = function(action) {
					$scope.previousAction.selected = false; 
					action.selected = true; 
					$scope.previousAction = action; 
				}
			}]
		};
	});
})(); 