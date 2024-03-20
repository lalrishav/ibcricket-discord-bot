"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerByTournamentIdAndPlayerId = exports.CreatePlayers = void 0;
const tournament_1 = require("../tournament/tournament");
const CreatePlayers = (playerString) => {
    const players = [];
    playerString.forEach((item) => {
        players.push({
            name: item,
            discordId: "",
            discordUsername: "",
        });
    });
    return players;
};
exports.CreatePlayers = CreatePlayers;
const GetPlayerByTournamentIdAndPlayerId = (tournamentId, playerId) => {
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    const player = tournament.players.find((item) => item.discordId === playerId);
    if (player) {
        return player;
    }
    else {
        return {};
        //todo error no player id found
    }
};
exports.GetPlayerByTournamentIdAndPlayerId = GetPlayerByTournamentIdAndPlayerId;
