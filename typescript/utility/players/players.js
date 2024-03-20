"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerByTournamentIdAndPlayerId = exports.AddPlayer = void 0;
const tournament_1 = require("../tournament/tournament");
const AddPlayer = (tournamentId = "1", players) => {
    console.log("players ", players);
    const tournament = (0, tournament_1.GetTournamentDetails)(tournamentId);
    const playerDetails = [];
    players.forEach((item) => {
        console.log("hi");
        if (tournament.players.find(i => i.discordId == item.id)) {
            return;
        }
        playerDetails.push({
            name: item.username,
            discordId: item.id,
            discordUsername: item.username
        });
    });
    console.log("player details are ", tournament.players);
    tournament.players = tournament.players.concat(playerDetails);
    console.log("updated tournament after adding player is  ", tournament);
    (0, tournament_1.UpdateTournament)(tournamentId, tournament);
};
exports.AddPlayer = AddPlayer;
// export const CreatePlayers = (playerString: string[]): Player[] => {
//   const players: Player[] = [];
//   playerString.forEach((item) => {
//     players.push({
//       name: item,
//       discordId: "",
//       discordUsername: "",
//     });
//   });
//
//   return players;
// };
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
