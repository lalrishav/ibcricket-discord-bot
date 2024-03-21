"use strict";
//start match will start the first innings automatically
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndInnings = exports.StartInning = exports.CreateInnings = void 0;
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
        throw new Error(`Inning ${match.currentInning} is still in progress`);
    }
    if (match.currentInning == 4) {
        throw new Error("match is already completed");
    }
    match.currentInning = (match.currentInning || 0) + 1;
    const player = (0, players_1.GetPlayerByTournamentIdAndPlayerId)(tournamentId, playerId);
    let keyword = "";
    console.log(match.currentInning);
    switch (match.currentInning) {
        case 1:
            match.firstInning = getInnings("1", qpNumber, player, team, tournamentId);
            match.battingFirst = player;
            if (player.discordId == match.firstPlayer.discordId) {
                match.battingSecond = match.secondPlayer;
            }
            else {
                match.battingSecond = match.firstPlayer;
            }
            break;
        case 2:
            console.log("here");
            match.secondInning = getInnings("2", qpNumber, player, team, tournamentId);
            break;
        case 3:
            match.thirdInning = getInnings("3", qpNumber, player, team, tournamentId);
            break;
        case 4:
            match.fourthInning = getInnings("4", qpNumber, player, team, tournamentId);
            break;
        default:
            break;
    }
    (0, matches_1.UpdateMatch)(tournament, match);
    return match;
};
exports.StartInning = StartInning;
const EndInnings = (matchId, playerId, score, overs, wicket, matchLink, tournamentId = "1") => {
    var _a, _b, _c, _d;
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    const match = (0, matches_1.GetMatchDetails)(tournament, matchId);
    if (match.firstPlayer.discordId != playerId && match.secondPlayer.discordId != playerId) {
        throw new Error("Only players of this match are allowed to start innings");
    }
    if (((_a = match.firstInning) === null || _a === void 0 ? void 0 : _a.status) != inning_1.InningStatus.IN_PROGRESS && ((_b = match.secondInning) === null || _b === void 0 ? void 0 : _b.status) != inning_1.InningStatus.IN_PROGRESS && ((_c = match.thirdInning) === null || _c === void 0 ? void 0 : _c.status) != inning_1.InningStatus.IN_PROGRESS && ((_d = match.fourthInning) === null || _d === void 0 ? void 0 : _d.status) != inning_1.InningStatus.IN_PROGRESS) {
        throw new Error(`No innings to end`);
    }
    if (match.currentInning == 4) {
        throw new Error("match is already completed");
    }
    let keyword = "";
    switch (match.currentInning) {
        case 1:
            const firstInning = match.firstInning;
            if (firstInning) {
                firstInning.status = inning_1.InningStatus.COMPLETED;
                firstInning.endDate = new Date();
                firstInning.overs = Number(overs);
                firstInning.runScored = Number(score);
                firstInning.wicket = Number(wicket);
                firstInning.matchLink = matchLink;
                match.firstInning = firstInning;
                match.totalOverRemaining = match.totalOverRemaining || 240 - Number(overs);
                if (match.totalOverRemaining < 0) {
                    //todo - end match
                }
                (0, matches_1.UpdateMatch)(tournament, match);
                return { match: match, innings: firstInning };
            }
            break;
        case 2:
            const secondInning = match.secondInning;
            if (secondInning) {
                secondInning.status = inning_1.InningStatus.COMPLETED;
                secondInning.endDate = new Date();
                secondInning.overs = Number(overs);
                secondInning.runScored = Number(score);
                secondInning.wicket = Number(wicket);
                match.secondInning = secondInning;
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining - Number(overs);
                if (match.totalOverRemaining < 0) {
                    //todo - end match
                }
                (0, matches_1.UpdateMatch)(tournament, match);
                return { match: match, innings: secondInning };
            }
            break;
        case 3:
            keyword = "thirdInning";
            break;
        case 4:
            keyword = "fourthInning";
            break;
    }
};
exports.EndInnings = EndInnings;
const getInnings = (inningId, qpNumber, player, team, tournamentId = "1") => {
    return {
        inningId: inningId,
        player: player,
        runScored: 0,
        wicket: 0,
        overs: 0,
        qpNumber: qpNumber,
        startDate: new Date(),
        status: inning_1.InningStatus.IN_PROGRESS,
    };
};
const EndFirstInnings = () => {
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
