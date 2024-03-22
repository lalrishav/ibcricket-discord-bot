"use strict";
//start match will start the first innings automatically
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndInnings = exports.StartInning = exports.CreateInnings = void 0;
const inning_1 = require("../../dtos/inning");
const matches_1 = require("../matches/matches");
const players_1 = require("../players/players");
const tournament_1 = require("../tournament/tournament");
const match_1 = require("../../dtos/match");
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
    if (!match.status || match.status == match_1.MatchStatusEnum.ABANDONED || match.status == match_1.MatchStatusEnum.NOT_YET_STARTED || match.status == match_1.MatchStatusEnum.COMPLETED) {
        throw new Error("can not start innings , match status " + (match === null || match === void 0 ? void 0 : match.status) || 'NOT YET STARTED');
    }
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
    match.stadium = stadium;
    const player = (0, players_1.GetPlayerByTournamentIdAndPlayerId)(tournamentId, playerId);
    switch (match.currentInning) {
        case 1:
            match.firstInning = getInnings("1", qpNumber, player, team, tournamentId);
            match.battingFirst = player;
            match.status = match_1.MatchStatusEnum.FIRST_INNING_IN_PROGRESS;
            if (player.discordId == match.firstPlayer.discordId) {
                match.battingSecond = match.secondPlayer;
            }
            else {
                match.battingSecond = match.firstPlayer;
            }
            break;
        case 2:
            match.secondInning = getInnings("2", qpNumber, player, team, tournamentId);
            match.status = match_1.MatchStatusEnum.SECOND_INNING_IN_PROGRESS;
            break;
        case 3:
            match.thirdInning = getInnings("3", qpNumber, player, team, tournamentId);
            match.status = match_1.MatchStatusEnum.THIRD_INNING_IN_PROGRESS;
            break;
        case 4:
            match.fourthInning = getInnings("4", qpNumber, player, team, tournamentId);
            match.status = match_1.MatchStatusEnum.FOURTH_INNING_IN_PROGRESS;
            break;
        default:
            break;
    }
    (0, matches_1.UpdateMatch)(tournament, match);
    return match;
};
exports.StartInning = StartInning;
const EndInnings = (matchId, playerId, score, overs, wicket, matchLink, tournamentId = "1") => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    let match = (0, matches_1.GetMatchDetails)(tournament, matchId);
    if (!match.status || match.status == match_1.MatchStatusEnum.ABANDONED || match.status == match_1.MatchStatusEnum.NOT_YET_STARTED || match.status == match_1.MatchStatusEnum.COMPLETED) {
        throw new Error("can not start innings , match status " + (match === null || match === void 0 ? void 0 : match.status) || 'NOT YET STARTED');
    }
    if (match.firstPlayer.discordId != playerId && match.secondPlayer.discordId != playerId) {
        throw new Error("Only players of this match are allowed to start innings");
    }
    if (((_a = match.firstInning) === null || _a === void 0 ? void 0 : _a.status) != inning_1.InningStatus.IN_PROGRESS && ((_b = match.secondInning) === null || _b === void 0 ? void 0 : _b.status) != inning_1.InningStatus.IN_PROGRESS && ((_c = match.thirdInning) === null || _c === void 0 ? void 0 : _c.status) != inning_1.InningStatus.IN_PROGRESS && ((_d = match.fourthInning) === null || _d === void 0 ? void 0 : _d.status) != inning_1.InningStatus.IN_PROGRESS) {
        throw new Error(`No innings to end`);
    }
    if (match.currentInning == 5) {
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
                match.pitch;
                match.firstInning = firstInning;
                let comment = "";
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining - Math.ceil(Number(overs));
                if (match.totalOverRemaining <= 0) {
                    match = (0, matches_1.EndMatch)(match, tournament, undefined, undefined, "Match Drawn", true);
                    comment = "Match Drawn";
                    return { match: match, innings: firstInning };
                }
                comment = `<@${(_e = match.battingFirst) === null || _e === void 0 ? void 0 : _e.discordId}> scored ${score} runs`;
                match.comment = comment;
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
                let comment = "NA";
                // @ts-ignore
                const runDiff = match.secondInning.runScored - match.firstInning.runScored;
                if (runDiff > 0) {
                    //that mean second inning player scored more than first inning player
                    comment = `<@${secondInning.player.discordId}> lead by ${runDiff} runs`;
                }
                else {
                    comment = `<@${(_f = match.battingFirst) === null || _f === void 0 ? void 0 : _f.discordId}> lead by ${Math.abs(runDiff)} runs`;
                }
                match.comment = comment;
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining - Math.ceil(Number(overs));
                if (match.totalOverRemaining <= 0) {
                    match = (0, matches_1.EndMatch)(match, tournament, undefined, undefined, "Match Drawn", true);
                    return { match: match, innings: secondInning };
                }
                (0, matches_1.UpdateMatch)(tournament, match);
                return { match: match, innings: secondInning };
            }
            break;
        case 3:
            const thirdInning = match.thirdInning;
            if (thirdInning) {
                thirdInning.status = inning_1.InningStatus.COMPLETED;
                thirdInning.endDate = new Date();
                thirdInning.overs = Number(overs);
                thirdInning.runScored = Number(score);
                thirdInning.wicket = Number(wicket);
                match.thirdInning = thirdInning;
                let comment = "NA";
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining - Math.ceil(Number(overs));
                // @ts-ignore
                const firstTwoInningDiff = ((_g = match.secondInning) === null || _g === void 0 ? void 0 : _g.runScored) - ((_h = match.firstInning) === null || _h === void 0 ? void 0 : _h.runScored);
                console.log("firstTwoInningDiff", firstTwoInningDiff);
                console.log("third innings score", thirdInning.runScored);
                if (firstTwoInningDiff > 0) {
                    //that mean there is a possibility of losing the match by innings
                    if (thirdInning.runScored < firstTwoInningDiff) {
                        match = (0, matches_1.EndMatch)(match, tournament, match.battingSecond, match.battingFirst, `${(_j = match.battingSecond) === null || _j === void 0 ? void 0 : _j.discordUsername} won by innings and ${firstTwoInningDiff - thirdInning.runScored} runs`, false, true);
                        return { match: match, innings: thirdInning };
                    }
                    else {
                        comment = `<@${(_k = match.battingSecond) === null || _k === void 0 ? void 0 : _k.discordId}> need ${thirdInning.runScored - firstTwoInningDiff} to win`;
                    }
                }
                else {
                    comment = `<@${(_l = match.battingSecond) === null || _l === void 0 ? void 0 : _l.discordId}> need ${thirdInning.runScored - firstTwoInningDiff} to win`;
                }
                match.comment = comment;
                if (match.totalOverRemaining <= 0) {
                    match = (0, matches_1.EndMatch)(match, tournament, undefined, undefined, "Match Drawn", true);
                    return { match: match, innings: thirdInning };
                }
                (0, matches_1.UpdateMatch)(tournament, match);
                return { match: match, innings: thirdInning };
            }
            break;
        case 4:
            const fourthInnings = match.fourthInning;
            if (fourthInnings) {
                fourthInnings.status = inning_1.InningStatus.COMPLETED;
                fourthInnings.endDate = new Date();
                fourthInnings.overs = Number(overs);
                fourthInnings.runScored = Number(score);
                fourthInnings.wicket = Number(wicket);
                match.fourthInning = fourthInnings;
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining - Math.ceil(Number(overs));
                // @ts-ignore
                const runToWin = (((_m = match.firstInning) === null || _m === void 0 ? void 0 : _m.runScored) + ((_o = match.thirdInning) === null || _o === void 0 ? void 0 : _o.runScored)) - ((_p = match.secondInning) === null || _p === void 0 ? void 0 : _p.runScored) + 1;
                let comment = "NA";
                if (fourthInnings.runScored > runToWin) {
                    comment = `<@${(_q = match.battingSecond) === null || _q === void 0 ? void 0 : _q.discordId}> won by ${10 - Number(wicket)} wicket`;
                    match = (0, matches_1.EndMatch)(match, tournament, match.battingSecond, match.battingFirst, comment, false);
                    return { match: match, innings: fourthInnings };
                }
                else if (fourthInnings.runScored < runToWin) {
                    if (match.totalOverRemaining > 0) {
                        comment = `<@${(_r = match.battingFirst) === null || _r === void 0 ? void 0 : _r.discordId}> won by ${runToWin - fourthInnings.runScored} runs`;
                        match = (0, matches_1.EndMatch)(match, tournament, match.battingFirst, match.battingSecond, comment, false);
                        return { match: match, innings: fourthInnings };
                    }
                    else if (match.totalOverRemaining <= 0) {
                        comment = "Match draw";
                        match = (0, matches_1.EndMatch)(match, tournament, undefined, undefined, comment, true);
                        return { match: match, innings: fourthInnings };
                    }
                }
                (0, matches_1.UpdateMatch)(tournament, match);
                return { match: match, innings: fourthInnings };
            }
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
        country: team
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
