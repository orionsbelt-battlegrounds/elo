var RANKING_WEIGHT = 200;
var GAME_WEIGHT = 20;
var BATTLE_POINTS_WEIGHT = 1000;

function calculateElo(player1, player2){

  if(player1.battlePoints == player2.battlePoints){
    throw new Error("Cannot determin winner.");
  }
  var winner = player1.battlePoints > player2.battlePoints ? player1:player2;
  var loser = player1.battlePoints > player2.battlePoints ? player2:player1;

  var gameWeightFactor = calculateGameWeightFactor(winner.numberOfGames);
  var battlePointsWeightFactor = 2+0.5*(calculateBattlePointsWeightFactor(winner.battlePoints, loser.battlePoints));
  var rankingWeightFactor = calculaterankingWeightFactor(loser.eloRanking, winner.eloRanking);
  var winnerElo = winner.eloRanking+2*(gameWeightFactor*(battlePointsWeightFactor-rankingWeightFactor));

  gameWeightFactor = calculateGameWeightFactor(loser.numberOfGames);
  battlePointsWeightFactor = -1-0.5*(calculateBattlePointsWeightFactor(winner.battlePoints, loser.battlePoints));
  rankingWeightFactor = calculaterankingWeightFactor(winner.eloRanking, loser.eloRanking);
  var loserElo = loser.eloRanking+2*(gameWeightFactor*(battlePointsWeightFactor-rankingWeightFactor));

  winner.eloRanking = Math.round(winnerElo);
  loser.eloRanking = Math.round(loserElo);
}

function calculateGameWeightFactor(numberOfGames){
  return 1 + (GAME_WEIGHT/(10+numberOfGames));
}

function calculateBattlePointsWeightFactor(points1, points2){

  return (points1-points2)/BATTLE_POINTS_WEIGHT;
}

function calculaterankingWeightFactor(eloRanking1, eloRanking2){
  return 2*(1/(1+Math.pow(10,(eloRanking1-eloRanking2)/RANKING_WEIGHT)));
}

var obbElo = {


};

obbElo.package = require('./package.json');
obbElo.calculateElo = calculateElo; 
obbElo.calculaterankingWeightFactor = calculaterankingWeightFactor;
module.exports = obbElo;
