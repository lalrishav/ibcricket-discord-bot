"use strict";
//start match will start the first innings automatically
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInnings = void 0;
const inning_1 = require("../../dtos/inning");
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
