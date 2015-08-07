(function(){
	// metadata about the game
	var gameInfo = {
		name: "Rocket Fuel",
		author: "Patrick Stalcup",
		version: "1.0.0"
	}

	var heros = [{
			name: "Patrick",
			hp: {
				current: 80,
				max: 100
			}
		},{
			name: "Will",
			hp: {
				current: 20,
				max: 20
			}
		}
	]
	var villains = [{
			name: "Snake",
			hp: {
				current: 10,
				max: 10
			}
		},{
			name: "Rat",
			hp: {
				current: 20,
				max: 20
			}
		}
	]


	var app = angular.module("rpg", []);

	//controllers
	app.controller("CombatController", ['$scope', function($scope){
		$scope.heros = heros; 
		$scope.villains = villains; 
	}]); 

	//directives
	app.directive("gameInfo", function(){
		return {
			restrict: "E",
			controllerAs: "info",
			templateUrl: "templates/game-info.html",
			controller: function(){
				this.gameInfo = gameInfo; 
			}
		};
	});

	app.directive('characterPortraits', function(){
		return {
			restrict: "E",
			scope: {
				characters: '=characters'
			},
			templateUrl: "templates/character-portraits.html",
			controllerAs: "portrait",
			controller: function(){
				this.percentage = function(hp) {
					return parseInt(100 * (hp.current / hp.max)); 
				}
			}
		};
	});
})(); 