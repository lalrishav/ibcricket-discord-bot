import { Inning } from "./inning"
import { Player } from "./player"

export type Match = {
    matchId: string,
    firstPlayer: Player,
    secondPlayer: Player,
    pitch: string,
    battingFirst?: Player,
    battingSecond?: Player,
    firstInning?: Inning,
    secondInning?: Inning,
    thirdInning?: Inning,
    fourthInning?: Inning,
    status: MatchStatusEnum,
    startDate?: Date,
    endDate?: Date,
    result?: MatchResult,
    currentInning? : number,
    totalOverRemaining?: number,
    comment?: string
}

export enum MatchStatusEnum {
    NOT_YET_STARTED = "NOT_YET_STARTED",
    "INITIATED" = "INITIATED",
    FIRST_INNING_IN_PROGRESS = "FIRST_INNING_IN_PROGRESS",
    SECOND_INNING_IN_PROGRESS = "SECOND_INNING_IN_PROGRESS",
    THIRD_INNING_IN_PROGRESS = "THIRD_INNING_IN_PROGRESS",
    FOURTH_INNING_IN_PROGRESS = "FOURTH_INNING_IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ABANDONED = "ABANDONED",
    TOSS_DONE = "TOSS_DONE",
}

export type MatchResult = {
    winner: Player | undefined,
    looser: Player | undefined,
    comment: string,
    isLostByInnings: boolean
    isDraw: boolean
}


