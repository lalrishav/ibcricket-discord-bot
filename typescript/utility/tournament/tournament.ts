import {Tournament, TournamentStatus} from "../../dtos/tournament";
import {ReadJsonFile, UpdateJsonFile} from "../file-operation";
import {InitatePointsTable} from "../pointsTable/pointsTable";
import {InitiateMatches} from "../matches/matches";

const FILE_PATH = "tournament_base.json"
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

export const start = (tournamentId: string): Tournament => {
  const data: Tournament[] = ReadJsonFile(FILE_PATH) as Tournament[];
  const index = data.findIndex((_) => _.tournamentId == tournamentId && _.status == TournamentStatus.YET_TO_START);
  if (index < 0) {
    throw new Error("No tournament found")
  } else {
    const pointsTable = InitatePointsTable(data[index].players);
    // const matches = InitiateMatches(data[index].players, data[index].typeOfPitch)
    if (data[index].status != TournamentStatus.YET_TO_START) {
      //todo: return can not start tournament create a new one
      console.log("can not start tournament create a new one");
    }
    data[index].startDate = new Date();
    data[index].status = TournamentStatus.IN_PROGRESS;
    data[index].pointsTable = pointsTable;
  }
  UpdateJsonFile(FILE_PATH, data);
  return data[index]
};


export const AddTournament = (tournament: Tournament) => {
  const data = ReadJsonFile(FILE_PATH)
  data.push(tournament)
  UpdateJsonFile(FILE_PATH, data)
};

export const UpdateTournament = (tournament: Tournament)=>{
  const data = ReadJsonFile(FILE_PATH)
  const index = data.findIndex((i: any) => i.tournamentId == tournament.tournamentId)

  if(index == -1){
    throw new Error("no tournament found")
  }

  data[index] = tournament
  UpdateJsonFile(FILE_PATH, data)
}



export const GetTournamentDetails = (tournamentId: string): Tournament => {
  const data: Tournament[] = ReadJsonFile(FILE_PATH) as Tournament[];
  const index = data.findIndex((_) => _.tournamentId == tournamentId);
  if (index < 0) {
    throw new Error("No tournament found")
  } else {
    return data[index];
  }
};

export const GetAllTournaments = (): Tournament[] => {
  return ReadJsonFile(FILE_PATH) as Tournament[];
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
