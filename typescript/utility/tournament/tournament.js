"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNewTournamentId = exports.GetAllTournaments = exports.GetTournamentDetails = exports.UpdateTournament = exports.AddTournament = exports.start = exports.InitiateTournament = void 0;
const tournament_1 = require("../../dtos/tournament");
const file_operation_1 = require("../file-operation");
const pointsTable_1 = require("../pointsTable/pointsTable");
const matches_1 = require("../matches/matches");
const InitiateTournament = (name, numberOfOvers, typeOfPitch) => {
    const latestTournamentId = (0, exports.GetNewTournamentId)();
    if (latestTournamentId != "1") {
        throw new Error("right now only single tournament is supported");
    }
    const tournament = {
        //todo
        tournamentId: latestTournamentId,
        name,
        numberOfOvers,
        typeOfPitch,
        status: tournament_1.TournamentStatus.YET_TO_START,
        players: [],
        matches: []
    };
    (0, exports.AddTournament)(tournament);
    return latestTournamentId;
};
exports.InitiateTournament = InitiateTournament;
const start = (tournamentId) => {
    const data = (0, file_operation_1.ReadJsonFile)("tournament.json");
    const index = data.findIndex((_) => _.tournamentId == tournamentId);
    if (index < 0) {
        throw new Error("No tournament found");
    }
    else {
        const pointsTable = (0, pointsTable_1.InitatePointsTable)(data[index].players);
        const matches = (0, matches_1.InitiateMatches)(data[index].players, data[index].typeOfPitch);
        if (data[index].status != tournament_1.TournamentStatus.YET_TO_START) {
            //todo: return can not start tournament create a new one
            console.log("can not start tournament create a new one");
        }
        data[index].startDate = new Date();
        data[index].status = tournament_1.TournamentStatus.IN_PROGRESS;
        data[index].pointsTable = pointsTable;
        data[index].matches = matches;
    }
    (0, file_operation_1.UpdateJsonFile)("tournament.json", data);
    return data[index];
};
exports.start = start;
const AddTournament = (tournament) => {
    const data = (0, file_operation_1.ReadJsonFile)("tournament.json");
    data.push(tournament);
    (0, file_operation_1.UpdateJsonFile)("tournament.json", data);
};
exports.AddTournament = AddTournament;
const UpdateTournament = (tournamentId, tournament) => {
    const data = (0, file_operation_1.ReadJsonFile)("tournament.json");
    const index = data.findIndex((i) => i.tournamentId == tournamentId);
    if (index == -1) {
        throw new Error("no tournament found");
    }
    data[index] = tournament;
    (0, file_operation_1.UpdateJsonFile)("tournament.json", data);
};
exports.UpdateTournament = UpdateTournament;
const GetTournamentDetails = (tournamentId) => {
    const data = (0, file_operation_1.ReadJsonFile)("tournament.json");
    const index = data.findIndex((_) => _.tournamentId == tournamentId);
    if (index < 0) {
        throw new Error("No tournament found");
    }
    else {
        return data[index];
    }
};
exports.GetTournamentDetails = GetTournamentDetails;
const GetAllTournaments = () => {
    return (0, file_operation_1.ReadJsonFile)("tournament.json");
};
exports.GetAllTournaments = GetAllTournaments;
const GetNewTournamentId = () => {
    const tournaments = (0, exports.GetAllTournaments)();
    if (tournaments.length == 0) {
        return "1";
    }
    return (parseInt(tournaments[tournaments.length - 1].tournamentId) + 1).toString();
};
exports.GetNewTournamentId = GetNewTournamentId;
