"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMatches = exports.CreatePlayers = exports.WriteTournament = exports.CreateTournament = void 0;
const match_1 = require("../../dtos/match");
const tournament_1 = require("../../dtos/tournament");
const file_operation_1 = require("./../file-operation");
const CreateTournament = (name, numberOfOvers, typeOfPitch, playerString) => {
    const players = (0, exports.CreatePlayers)(playerString);
    const tournament = {
        //todo
        tournamentId: "1",
        name,
        numberOfOvers,
        typeOfPitch,
        players: players,
        matches: (0, exports.CreateMatches)(players, typeOfPitch),
        status: tournament_1.TournamentStatus.YET_TO_START
    };
    (0, exports.WriteTournament)(tournament);
    console.log(tournament);
};
exports.CreateTournament = CreateTournament;
const WriteTournament = (tournament) => {
    const data = (0, file_operation_1.ReadJsonFile)("tournament.json");
    console.log("data is ", data);
    data.push(tournament);
    (0, file_operation_1.UpdateJsonFile)("tournament.json", data);
};
exports.WriteTournament = WriteTournament;
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
const CreateMatches = (players, pitch) => {
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
exports.CreateMatches = CreateMatches;
