import { Player } from "../../dtos/player";
import {GetTournamentDetails} from "../tournament/tournament";

export const CreatePlayers = (playerString: string[]): Player[] => {
  const players: Player[] = [];
  playerString.forEach((item) => {
    players.push({
      name: item,
      discordId: "",
      discordUsername: "",
    });
  });

  return players;
};

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
