(function(){
	// metadata about the game
	var gameInfo = {
		name: "Rocket Fuel",
		author: "Patrick Stalcup",
		version: "1.0.0"
	}

	var app = angular.module("rpg", []);

	//directive for generating a content div
	app.directive("gameInfo", function(){
		return {
			restrict: "E",
			controllerAs: "info",
			templateUrl: "templates/game-info.html",
			controller: function(){
				this.gameInfo = gameInfo; 
			}
		}
	});
})(); 