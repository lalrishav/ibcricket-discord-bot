"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitatePointsTable = void 0;
const InitatePointsTable = (players) => {
    const pointsTable = {};
    players.forEach((player) => {
        pointsTable[player.discordId] = InitateEmptyPointsInfo();
    });
    return pointsTable;
};
exports.InitatePointsTable = InitatePointsTable;
const InitateEmptyPointsInfo = () => {
    return {
        "totalMatchesPlayed": 0,
        "totalInningsPlayed": 0,
        "totalMatchesWin": 0,
        "totalMatchesLost": 0,
        "totalMatchesDrawn": 0,
        "winPoints": 0,
        "bonusPoints": 0,
        "totalPoints": 0,
        "totalRuns": 0,
        "totalWickets": 0,
        "totalOver": 0,
        "average": 0,
        "opponentRuns": 0,
        "opponentOvers": 0,
        "opponentWicket": 0,
        "runRate": 0,
        "strikeRate": 0,
        "averageOverPerInnings": 0,
        "maxScorePossible": 0
    };
};
