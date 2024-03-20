"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartMatch = exports.GetMatchDetails = exports.GetMatchesByTournamentIdAndPlayerId = exports.GetMatchesByTournamentId = exports.InitiateMatches = void 0;
const match_1 = require("../../dtos/match");
const validator_1 = require("../../validators/validator");
const innings_1 = require("../innings/innings");
const players_1 = require("../players/players");
const tournament_1 = require("../tournament/tournament");
const InitiateMatches = (players, pitch) => {
    const numPlayers = players.length;
    const matches = [];
    let index = 1;
    for (let i = 0; i < numPlayers; i++) {
        for (let j = i + 1; j < numPlayers; j++) {
            matches.push({
                matchId: index.toString(),
                firstPlayer: players[i],
                secondPlayer: players[j],
                pitch: pitch,
                status: match_1.MatchStatusEnum.NOT_YET_STARTED,
            });
            index++;
        }
    }
    return matches;
};
exports.InitiateMatches = InitiateMatches;
const GetMatchesByTournamentId = (tournamentId) => {
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    return tournament.matches;
};
exports.GetMatchesByTournamentId = GetMatchesByTournamentId;
const GetMatchesByTournamentIdAndPlayerId = (tournamentId, playerId) => {
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    const matches = tournament.matches;
    const playerMatch = [];
    matches.forEach((item) => {
        if ((0, validator_1.DoPlayerBelongToMatch)(item, playerId)) {
            playerMatch.push(item);
        }
    });
    return playerMatch;
};
exports.GetMatchesByTournamentIdAndPlayerId = GetMatchesByTournamentIdAndPlayerId;
const GetMatchDetails = (tournamentId, matchId) => {
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    const matches = tournament.matches;
    const index = matches.findIndex((item) => item.matchId == matchId);
    if (index != -1) {
        return matches[index];
    }
    else {
        return {};
        //todo invalid match id
    }
};
exports.GetMatchDetails = GetMatchDetails;
const StartMatch = (tournamentId, matchId, playerId, country, qpNumber) => {
    const match = (0, exports.GetMatchDetails)(tournamentId, matchId);
    let battingFirstDiscordId;
    battingFirstDiscordId = playerId;
    const battingFirstPlayer = (0, players_1.GetPlayerByTournamentIdAndPlayerId)(tournamentId, battingFirstDiscordId);
    if ((0, validator_1.DoPlayerBelongToMatch)(match, playerId)) {
        match.battingFirst = battingFirstPlayer;
        match.status = match_1.MatchStatusEnum.FIRST_INNING_IN_PROGRESS;
        match.country = country;
        match.startDate = new Date();
        match.firstInning = (0, innings_1.CreateInnings)(qpNumber, battingFirstPlayer);
        match.currentInning = 1;
    }
    else {
        //todo
    }
};
exports.StartMatch = StartMatch;
//todo
// export const GetMatchesScheduleByTournamentIdAndPlayerIdAndStatus = (
//   tournamentId: string,
//   playerId: string,
//   status: string
// ): Match[] => {
//   const tournament = GetTournamentDetails(tournamentId);
//   const matches = tournament.matches;
//   const playerMatch: Match[] = [];
//   matches.forEach((item) => {
//     if (
//       (item.firstPlayer.discordId == playerId ||
//         item.firstPlayer.discordId == playerId) &&
//       item.status == status
//     ) {
//       playerMatch.push(item);
//     }
//   });
//   return playerMatch;
// };
