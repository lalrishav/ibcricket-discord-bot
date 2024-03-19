"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartTournament = void 0;
const tournament_1 = require("../../dtos/tournament");
const file_operation_1 = require("../file-operation");
const pointsTable_1 = require("../pointsTable/pointsTable");
const StartTournament = (tournamentId) => {
    const data = (0, file_operation_1.ReadJsonFile)("tournament.json");
    const index = data.findIndex((_) => _.tournamentId == tournamentId);
    if (index < 0) {
        //todo error no tournament found
        console.error("No tournament found");
    }
    else {
        const pointsTable = (0, pointsTable_1.InitatePointsTable)(data[index].players);
        if (data[index].status != tournament_1.TournamentStatus.YET_TO_START) {
            //todo: return can not start tournament create a new one
            console.log("can not start tournament create a new one");
        }
        data[index].startDate = new Date();
        data[index].status = tournament_1.TournamentStatus.IN_PROGRESS;
        data[index].pointsTable = pointsTable;
    }
    (0, file_operation_1.UpdateJsonFile)("tournament.json", data);
};
exports.StartTournament = StartTournament;
