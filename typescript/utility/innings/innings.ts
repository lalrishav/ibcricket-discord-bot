//start match will start the first innings automatically

import { Inning, InningStatus } from "../../dtos/inning";
import { MatchStatusEnum } from "../../dtos/match";
import { Player } from "../../dtos/player";
import { DoPlayerBelongToInnings, DoPlayerBelongToMatch } from "../../validators/validator";
import { GetMatchDetails } from "../matches/matches";
import { GetPlayerByTournamentIdAndPlayerId } from "../players/players";

export const CreateInnings = (qpNumber: string, player: Player) => {
  return {
    //todo
    inningId: "1",
    player,
    runScored: 0,
    wicket: 0,
    overs: 0,
    qpNumber,
    startDate: new Date(),
    status: InningStatus.IN_PROGRESS,
  };
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
