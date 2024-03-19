import { Player } from "./player";

export type Inning = {
    inningId: string,
    player: Player,
    runScored: number,
    wicket: number,
    overs: number,
    qpNumber: string,
    startDate: Date,
    endDate?: Date,
    status: InningStatus,
}

export enum InningStatus {
    NOT_AVAILABLE = "NOT_AVAILABLE",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}