import { Player } from "../../dtos/player";
import { GetTournamentDetails } from "../start-tournament/startTournament";

export const GetPlayerByTournamentIdAndPlayerId = (
  tournamentId: string,
  playerId: string
): Player => {
  const tournament = GetTournamentDetails(tournamentId);
  const player = tournament.players.find((item) => item.discordId === playerId);
  if (player) {
    return player;
  } else {
    return {} as Player;
    //todo error no player id found
  }
};
