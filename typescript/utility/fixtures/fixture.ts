import {GetTournamentDetails} from "../tournament/tournament";
import {Fixture} from "../../dtos/fixture";

export const GetFixtures = (tournamentId: string = "1") : Fixture[]=>{
    const tournament = GetTournamentDetails(tournamentId)
    const matches = tournament.matches
    const fixtures: Fixture[] = []
    matches.forEach((item)=>{
        fixtures.push({
            "matchNumber": item.matchId,
            "firstPlayer": item.firstPlayer.discordUsername,
            "secondPlayer": item.secondPlayer.discordUsername,
            "status": item.status,
            "result": item.result?.comment || ''
        })
    })
    return fixtures
}