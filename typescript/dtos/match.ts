import { Inning } from "./inning"
import { Player } from "./player"

export type Match = {
    matchId: string,
    firstPlayer: Player,
    secondPlayer: Player,
    pitch: string,
    country: string,
    battingFirst: Player,
    firstInning: Inning,
    secondInning: Inning,
    thirdInning: Inning,
    fourthInning: Inning,
    status: MatchStatusEnum,
    startDate: Date,
    endDate?: Date
}

export enum MatchStatusEnum {
    "NOT_YET_STARTED",
    "IN_PROGRESS",
    "COMPLETED",
    "ABANDONED",
    "TOSS_DONE",
}

