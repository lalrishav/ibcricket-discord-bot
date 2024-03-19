import { Player } from "./player";

export type Inning = {
    inningId: string,
    player: Player,
    runScored: number,
    wicket: number,
    overs: string,
    qpNumber: string,
    startDate: Date,
    endDate?: Date,
}