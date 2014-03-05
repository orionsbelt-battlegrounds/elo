var obbElo = require("./elo.js");

var player1 = {eloRanking:1000, numberOfGames: 1, battlePoints: 1000};
var player2 = {eloRanking:1000, numberOfGames: 1, battlePoints: 100};

obbElo.calculateElo(player1, player2);