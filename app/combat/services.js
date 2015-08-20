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
        var self = this;

        this.addMessage = function (message, type) {
            if (type === undefined) {
                type = 'info';
            }
            this.messages.push({type: type, content: message});
            $timeout(function () {
                self.messages.shift();
            }, 4000);
        }
    }]);

    function choose(array) {
        return array[Math.floor(array.length * Math.random())]
    }

    var adj = ["Smelly", "Sleepy", "Yellow", "Crying", "Long", "Funky", "Chilled", "Shaken"];
    var noun = ["Troll", "Orc", "Accountant", "Hero", "Pirate", "Hippy", "Painter", "Student"];
    var verb = ["Stab", "Smother", "Poke", "Whack"];
    var angularq, angulartimeout;

    function generatePartyMember(interactive) {
        var hp = Math.floor(5 * Math.random() + 3) * 10;

        var stats = {
            hp : {
                current: hp,
                max: hp
            },
            attack : Math.floor(20 * Math.random() + 10),
            speed : Math.floor(20 * Math.random() + 10),

            name : choose(adj) + " " + choose(noun)
        }
        if (interactive) {
            var c = [];
            var r = Math.floor(Math.random() * verb.length);
            while (c.length < 4) {
                /*while (c.indexOf(r) > -1) {
                    var r = Math.floor(Math.random() * verb.length);
                }*/
                c.push(Math.floor(Math.random() * verb.length));
            }

            var deferred = angularq.defer();
            
            stats.act = function() {
                deferred = angularq.defer();
                return deferred.promise;
            }

            stats.actions = verb.map(function(i){
                return {
                    text: i,
                    options: [{
                        text: "A",
                        choose: function(targets) {
                            var target = choose(targets);
                            var damage = Math.floor((stats.attack / 2) * Math.random() + (stats.attack / 2));
                            target.hp.current -= damage;
                            deferred.resolve(stats.name + " hit " + target.name + " for " + damage);
                        }
                    }]
                };
            });
        }
        else {
            stats.act = function (targets) {
                return angularq(function(resolve, reject) {
                    angulartimeout(function() {
                        var target = choose(targets);
                        var damage = Math.floor((stats.attack / 2) * Math.random() + (stats.attack / 2));
                        target.hp.current -= damage;
                        resolve(stats.name + " hit " + target.name + " for " + damage);
                    }, 500);
                });
            }
        }
        return stats;


    }

    app.service('GameData', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
        angularq = $q;
        angulartimeout = $timeout;

        this.heroes = [true, true].map(generatePartyMember);
        //this.heroes[0].selected = true;
        this.enemies = [false, false].map(generatePartyMember);
    }]);

    app.service('CombatEngine', ['GameData','Messages', function(GameData,Messages){
        this.combat = function() {
            var parties = GameData.heroes.concat(GameData.enemies).sort(function(a,b){return a.speed - b.speed;});
            function callback(index) {
                if (parties.length == 1) {
                    return;
                }
                if (index == parties.length) {
                    index = 0;
                }
                console.log(index, parties[index].name, parties.map(function(t){return t.name;}));
                if (parties[index].hp.current > 0) {
                    parties[index].selected = true;
                    var promise = parties[index].act(parties);
                    promise.then(function(message) {
                        Messages.addMessage(message, "info");
                        parties[index].selected = false;
                        callback(index + 1);
                    });
                } else {
                    parties.splice(index, 1);
                    callback(index)
                }
            }
            callback(0);
        }
    }]);
})();