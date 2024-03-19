import { Inning } from "./inning"
import { Player } from "./player"

export type Match = {
    matchId: string,
    firstPlayer: Player,
    secondPlayer: Player,
    pitch: string,
    country?: string,
    battingFirst?: Player,
    firstInning?: Inning,
    secondInning?: Inning,
    thirdInning?: Inning,
    fourthInning?: Inning,
    status: MatchStatusEnum,
    startDate?: Date,
    endDate?: Date,
    result?: MatchResult,
    currentInning? : number
}

export enum MatchStatusEnum {
    NOT_YET_STARTED = "NOT_YET_STARTED",
    FIRST_INNING_IN_PROGRESS = "FIRST_INNING_IN_PROGRESS",
    SECOND_INNING_IN_PROGRESS = "SECOND_INNING_IN_PROGRESS",
    THIRD_INNING_IN_PROGRESS = "THIRD_INNING_IN_PROGRESS",
    FOURTH_INNING_IN_PROGRESS = "FOURTH_INNING_IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ABANDONED = "ABANDONED",
    TOSS_DONE = "TOSS_DONE",
}

export type MatchResult = {
    winner: Player,
    looser: Player,
    comment: string,
    bonusPoint: number,
    isLostByInnings: boolean
}


