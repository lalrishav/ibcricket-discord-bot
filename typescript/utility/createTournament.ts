import { Match, MatchStatusEnum } from "../dtos/match";
import { Player } from "../dtos/player";
import { Tournament } from "../dtos/tournament";
import { ReadJsonFile, UpdateJsonFile } from "./file-operation";

export const CreateTournament = (
  name: string,
  numberOfOvers: string,
  typeOfPitch: string,
  playerString: string[]
) => {
  const players = CreatePlayers(playerString);
  const tournament: Tournament = {
    //todo
    tournamentId: "1",
    name,
    numberOfOvers,
    typeOfPitch,
    players: players,
    matches: CreateMatches(players, typeOfPitch),
  };
  WriteTournament(tournament)
  console.log(tournament);
};

export const WriteTournament = (tournament: Tournament) => {
  const data = ReadJsonFile("tournament.json")
  data.push(tournament)
  UpdateJsonFile("tournament.json", tournament)
};


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

export const CreateMatches = (players: Player[], pitch: string): Match[] => {
  const numPlayers = players.length;
  const matches: Match[] = [];
  let index = 1;
  for (let i = 0; i < numPlayers; i++) {
    for (let j = i + 1; j < numPlayers; j++) {
      matches.push({
        matchId: index.toString(),
        firstPlayer: players[i],
        secondPlayer: players[j],
        pitch: pitch,
        status: MatchStatusEnum.NOT_YET_STARTED,
      });

      index++;
    }
  }
  return matches;
};
