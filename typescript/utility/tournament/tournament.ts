import { User } from "discord.js";
import { Match, MatchStatusEnum } from "../../dtos/match";
import { Player } from "../../dtos/player";
import { Tournament, TournamentStatus } from "../../dtos/tournament";
import { ReadJsonFile, UpdateJsonFile } from "../file-operation";
import {InitatePointsTable} from "../pointsTable/pointsTable";

export const InitiateTournament = (
  name: string,
  numberOfOvers: string,
  typeOfPitch: string,
) => {
  const latestTournamentId = GetNewTournamentId()
  if (latestTournamentId != "1"){
    throw new Error("right now only single tournament is supported"); 
  }
  const tournament: Tournament = {
    //todo
    tournamentId: latestTournamentId,
    name,
    numberOfOvers,
    typeOfPitch,
    status: TournamentStatus.YET_TO_START,
    players: [],
    matches: []
  };
  AddTournament(tournament)

  return latestTournamentId
}

export const StartTournament = (tournamentId: string) => {
  const data: Tournament[] = ReadJsonFile("tournament.json") as Tournament[];
  const index = data.findIndex((_) => _.tournamentId == tournamentId);
  if (index < 0) {
    //todo error no tournament found
    console.error("No tournament found");
  } else {
    const pointsTable = InitatePointsTable(data[index].players);
    if (data[index].status != TournamentStatus.YET_TO_START) {
      //todo: return can not start tournament create a new one
      console.log("can not start tournament create a new one");
    }
    data[index].startDate = new Date();
    data[index].status = TournamentStatus.IN_PROGRESS;
    data[index].pointsTable = pointsTable;
  }
  UpdateJsonFile("tournament.json", data);
};


export const AddTournament = (tournament: Tournament) => {
  const data = ReadJsonFile("tournament.json")
  data.push(tournament)
  UpdateJsonFile("tournament.json", data)
};

export const UpdateTournament = (tournamentId: string, tournament: Tournament)=>{
  const data = ReadJsonFile("tournament.json")
  const index = data.findIndex((i: any) => i.tournamentId == tournamentId)

  if(index == -1){
    throw new Error("no tournament found")
  }

  data[index] = tournament
  UpdateJsonFile("tournament.json", data)
}



export const GetTournamentDetails = (tournamentId: string): Tournament => {
  const data: Tournament[] = ReadJsonFile("tournament.json") as Tournament[];
  const index = data.findIndex((_) => _.tournamentId == tournamentId);
  if (index < 0) {
    throw new Error("No tournament found")
  } else {
    return data[index];
  }
};

export const GetAllTournaments = (): Tournament[] => {
  return ReadJsonFile("tournament.json") as Tournament[];
};

export const GetNewTournamentId = (): string => {
  const tournaments = GetAllTournaments();
  if (tournaments.length == 0) {
    return "1";
  }
  return (
      parseInt(tournaments[tournaments.length - 1].tournamentId) + 1
  ).toString();
};
