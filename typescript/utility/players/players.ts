import {Player} from "../../dtos/player";
import {GetTournamentDetails, UpdateTournament} from "../tournament/tournament";
import {User} from "discord.js";
import {TournamentStatus} from "../../dtos/tournament";

export const AddPlayer = (tournamentId: string = "1", players: User[]) => {
  const tournament = GetTournamentDetails(tournamentId)
  if(tournament.status != TournamentStatus.YET_TO_START) {
    throw new Error("tournament already started, you can not add new players")
  }
  const playerDetails: Player[] = []
  players.forEach((item)=>{
    if (tournament.players.find(i => i.discordId ==  item.id)){
      return
    }
    playerDetails.push({
      name: item.username,
      discordId: item.id,
      discordUsername: item.username
    })
  })
  tournament.players = tournament.players.concat(playerDetails)
  UpdateTournament(tournamentId, tournament)
}

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

export const GetPlayerByTournamentId = (
    tournamentId: string = "1",
): Player[] => {
  const tournament = GetTournamentDetails(tournamentId);
  return tournament.players
};
