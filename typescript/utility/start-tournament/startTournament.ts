import { Tournament, TournamentStatus } from "../../dtos/tournament";
import { ReadJsonFile, UpdateJsonFile } from "../file-operation";
import { InitatePointsTable } from "../pointsTable/pointsTable";

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

export const GetTournamentDetails = (tournamentId: string): Tournament => {
  const data: Tournament[] = ReadJsonFile("tournament.json") as Tournament[];
  const index = data.findIndex((_) => _.tournamentId == tournamentId);
  if (index < 0) {
    //todo error no tournament found
    console.error("No tournament found");
    return {} as Tournament;
  } else {
    return data[index];
  }
};
