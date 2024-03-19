import { Match } from "../dtos/match";
import { TournamentSchedule } from "../dtos/output/TournamentSchedule";
import { Tournament } from "../dtos/tournament";

export const getTournamentSchedule = (tournament: Tournament) : TournamentSchedule[] =>{
    const matches = tournament.matches
    const schedule: TournamentSchedule[] = []
    matches.forEach((match: Match)=>{
        schedule.push({
            matchId: match.matchId,
            firstPlayer: match.firstPlayer.name,
            secondPlayer: match.secondPlayer.name,
            status: match?.status?.toString(),
            // startDate: match?.startDate?.toDateString(),
            // endDate: match?.endDate?.toDateString || ''
        })
    })

    return schedule
}