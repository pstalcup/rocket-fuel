/**
 * Created by pstalcup on 8/19/15.
 */

(function () {
    var app = angular.module('rpg');

    app.service('GameInfo', function () {
        this.info = {
            name: 'Rocket Fuel',
            author: 'Patrick Stalcup',
            version: '1.0.0'
        }
    });

    app.service('Messages', ['$timeout', function ($timeout) {
        this.messages = [];
        this.addMessage = function (message, type) {
            if (type === undefined) {
                type = 'info';
            }
            this.messages.push({type: type, content: message});
            $timeout(function () {
                this.messages.shift();
            }, 4000);
        }
    }]);

    app.service('GameData', ['$http', function ($http) {
        this.heroes = [{
            name: 'Patrick',
            hp: {
                current: 80,
                max: 100
            },
            actions: [
                {
                    text: "Fight",
                    options: ["A", "B", "C"]
                }, {
                    text: "Run",
                    options: ["A", "B", "C"]
                }]
        }, {
            name: 'Will',
            hp: {
                current: 20,
                max: 20
            },
            actions: [
                {
                    text: "Fight",
                    options: ["A", "B", "C"]
                }, {
                    text: "Run",
                    options: ["A", "B", "C"]
                }],
            selected: false
        }
        ];
        this.enemies = [{
            "name": "Snake",
            "hp": {
                "current": 10,
                "max": 10
            }
        }, {
            "name": "Rat",
            "hp": {
                "current": 20,
                "max": 20
            }
        }
        ];
    }]);
})();