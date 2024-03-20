"use strict";
//start match will start the first innings automatically
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartInning = exports.CreateInnings = void 0;
const inning_1 = require("../../dtos/inning");
const matches_1 = require("../matches/matches");
const players_1 = require("../players/players");
const tournament_1 = require("../tournament/tournament");
const CreateInnings = (qpNumber, player) => {
    return {
        //todo
        inningId: "1",
        player,
        runScored: 0,
        wicket: 0,
        overs: 0,
        qpNumber,
        startDate: new Date(),
        status: inning_1.InningStatus.IN_PROGRESS,
    };
};
exports.CreateInnings = CreateInnings;
const StartInning = (matchId, team, stadium, qpNumber, playerId, tournamentId = "1") => {
    var _a, _b, _c, _d;
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    const match = (0, matches_1.GetMatchDetails)(tournament, matchId);
    if (match.firstPlayer.discordId != playerId && match.secondPlayer.discordId != playerId) {
        throw new Error("Only players of this match are allowed to start innings");
    }
    if (((_a = match.firstInning) === null || _a === void 0 ? void 0 : _a.status) == inning_1.InningStatus.IN_PROGRESS || ((_b = match.secondInning) === null || _b === void 0 ? void 0 : _b.status) == inning_1.InningStatus.IN_PROGRESS || ((_c = match.thirdInning) === null || _c === void 0 ? void 0 : _c.status) == inning_1.InningStatus.IN_PROGRESS || ((_d = match.fourthInning) === null || _d === void 0 ? void 0 : _d.status) == inning_1.InningStatus.IN_PROGRESS) {
        throw new Error(`${match.currentInning} is still in progress`);
    }
    if (match.currentInning == 4) {
        throw new Error("match is already completed");
    }
    match.currentInning = (match.currentInning || 0) + 1;
    let keyword = "";
    switch (match.currentInning) {
        case 1:
            match.firstInning = getFirstInnings(qpNumber, playerId, tournamentId);
            break;
        case 2:
            keyword = "secondInning";
            break;
        case 3:
            keyword = "thirdInning";
            break;
        case 4:
            keyword = "fourthInning";
            break;
    }
    (0, matches_1.UpdateMatch)(tournament, match);
    return match;
};
exports.StartInning = StartInning;
const getFirstInnings = (qpNumber, playerId, tournamentId = "1") => {
    const player = (0, players_1.GetPlayerByTournamentIdAndPlayerId)(tournamentId, playerId);
    return {
        inningId: "1",
        player: player,
        runScored: 0,
        wicket: 0,
        overs: 0,
        qpNumber: qpNumber,
        startDate: new Date(),
        status: inning_1.InningStatus.IN_PROGRESS,
    };
};
// export const EndInnings = (tournamentId, matchId, playerId) => {
//   const match = GetMatchDetails(tournamentId, matchId);
//   const player: Player = GetPlayerByTournamentIdAndPlayerId(
//     tournamentId,
//     playerId
//   );
//   if (DoPlayerBelongToInnings(, playerId)) {
//   } else {
//     //todo
//   }
// };
