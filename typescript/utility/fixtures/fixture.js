"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFixtures = void 0;
const tournament_1 = require("../tournament/tournament");
const GetFixtures = (tournamentId = "1") => {
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    const matches = tournament.matches;
    const fixtures = [];
    matches.forEach((item) => {
        var _a;
        fixtures.push({
            "matchNumber": item.matchId,
            "firstPlayer": item.firstPlayer.discordUsername,
            "secondPlayer": item.secondPlayer.discordUsername,
            "status": item.status,
            "result": ((_a = item.result) === null || _a === void 0 ? void 0 : _a.comment) || ''
        });
    });
    return fixtures;
};
exports.GetFixtures = GetFixtures;
