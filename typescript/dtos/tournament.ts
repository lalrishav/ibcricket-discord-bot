import { Match } from "./match"
import { Player } from "./player"

export type Tournament = {
    tournamentId: string,
    name: string,
    numberOfOvers: string,
    typeOfPitch: string,
    players: Player[],
    matches: Match[],
    startDate: Date,
    endDate?: Date
}