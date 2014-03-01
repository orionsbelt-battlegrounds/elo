var assert = require("assert");
var obbElo = require("./../elo.js");

describe("obbElo", function() {

    it("is available", function() {
        assert(obbElo);
    });
    
    it("provides correct name", function() {
        assert(obbElo.package.name == "obb.elo");
    }); 

    it("provides the current version", function() {
        assert(obbElo.package.version);
    });

    describe("Elo calculate", function() {

        function testElo(player1, expected1, player2, expected2) {
            var beginElo1 = player1.eloRanking;
            var beginElo2 = player2.eloRanking;
            
            obbElo.calculateElo(player1, player2);

            assert(player1.eloRanking == expected1 , "beginElo1:" + beginElo1 + " - player1.eloRanking:" + player1.eloRanking);
            assert(player2.eloRanking == expected2, "beginElo2:" + beginElo2 + " - player2.eloRanking:" + player2.eloRanking);
        }


        it("1000v1000", function() {
            testElo(
                {eloRanking:1000, numberOfGames: 1, battlePoints: 1000}, 1008,
                {eloRanking:1000, numberOfGames: 1, battlePoints: 100}, 986
            );
        });

        it("1000v1000 switched", function() {
            testElo(
                {eloRanking:1000, numberOfGames: 1, battlePoints: 100}, 986,
                {eloRanking:1000, numberOfGames: 1, battlePoints: 1000}, 1008
            );
        });

        it("1200v1500", function() {
            testElo(
                {eloRanking:1200, numberOfGames: 10, battlePoints: 500}, 1208,
                {eloRanking:1500, numberOfGames: 10, battlePoints: 499}, 1488
            );
        });

        it("4000v3500", function() {
            testElo(
                {eloRanking:4000, numberOfGames: 60, battlePoints: 500}, 3992,
                {eloRanking:3500, numberOfGames: 75, battlePoints: 1000}, 3506
            );
        });

        it("Only elo change", function() {
            var player1 = {eloRanking:1000, numberOfGames: 1, battlePoints: 1000};
            var player2 = {eloRanking:1000, numberOfGames: 1, battlePoints: 100};

            obbElo.calculateElo(player1, player2);

            assert(player1.numberOfGames == 1);
            assert(player1.battlePoints == 1000);
            assert(player2.numberOfGames == 1);
            assert(player2.battlePoints == 100);
            
        });

        it("Equal battle points", function() {
            var player1 = {eloRanking:1000, numberOfGames: 1, battlePoints: 1000};
            var player2 = {eloRanking:1000, numberOfGames: 1, battlePoints: 1000};

            assert.throws( function(){obbElo.calculateElo(player1, player2);}, "Cannot determin winner.");
        });

    })

})
