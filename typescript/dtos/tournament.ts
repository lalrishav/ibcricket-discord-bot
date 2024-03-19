import { Match } from "./match"
import { Player } from "./player"
import { PointsTable } from "./pointsTable"

export type Tournament = {
    tournamentId: string,
    name: string,
    numberOfOvers: string,
    typeOfPitch: string,
    players: Player[],
    matches: Match[],
    startDate?: Date,
    endDate?: Date,
    status: TournamentStatus,
    pointsTable?: PointsTable,
}

export enum TournamentStatus  {
    YET_TO_START = "YET TO START",
    IN_PROGRESS = "IN PROGRESS",
    CANCELLED = "CANCELLED"
}
