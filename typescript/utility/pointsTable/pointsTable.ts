import { Player } from "../../dtos/player"
import { PointsTable, PointsTableInfo } from "../../dtos/pointsTable"

export const InitatePointsTable = (players: Player[]): PointsTable=>{
    const pointsTable: PointsTable = {}
    players.forEach((player)=>{
        //todo change name to discord id
        pointsTable[player.name] = InitateEmptyPointsInfo()
    })
    return pointsTable
}

const InitateEmptyPointsInfo = (): PointsTableInfo=>{
    return  {
        "totalMatchesPlayed": 0,
        "totalInningsPlayed": 0,
        "totalMatchesWin": 0,
        "totalMatchesLost": 0,
        "totalMatchesDrawn": 0,
        "winPoints": 0,
        "bonusPoints": 0,
        "totalPoints": 0,
        "totalRuns": 0,
        "totalWickets": 0,
        "totalOver": 0,
        "average": 0,
        "opponentRuns": 0,
        "opponentOvers": 0,
        "opponentWicket": 0,
        "runRate": 0,
        "strikeRate": 0,
        "averageOverPerInnings": 0,
        "maxScorePossible": 0
    }
}