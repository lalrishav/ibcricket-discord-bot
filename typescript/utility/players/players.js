"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerByTournamentId = exports.GetPlayerByTournamentIdAndPlayerId = exports.CreatePlayers = exports.AddPlayer = void 0;
const tournament_1 = require("../tournament/tournament");
const tournament_2 = require("../../dtos/tournament");
const AddPlayer = (tournamentId = "1", players) => {
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    if (tournament.status != tournament_2.TournamentStatus.YET_TO_START) {
        throw new Error("tournament already started, you can not add new players");
    }
    const playerDetails = [];
    players.forEach((item) => {
        if (tournament.players.find(i => i.discordId == item.id)) {
            return;
        }
        playerDetails.push({
            name: item.username,
            discordId: item.id,
            discordUsername: item.username
        });
    });
    tournament.players = tournament.players.concat(playerDetails);
    (0, tournament_1.UpdateTournament)(tournamentId, tournament);
};
exports.AddPlayer = AddPlayer;
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
const GetPlayerByTournamentId = (tournamentId = "1") => {
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    return tournament.players;
};
exports.GetPlayerByTournamentId = GetPlayerByTournamentId;
