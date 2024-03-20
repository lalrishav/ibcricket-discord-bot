//start match will start the first innings automatically

import {Inning, InningStatus} from "../../dtos/inning";
import {Player} from "../../dtos/player";
import {GetMatchDetails, UpdateMatch} from "../matches/matches";
import {GetPlayerByTournamentIdAndPlayerId} from "../players/players";
import {GetTournamentDetails} from "../tournament/tournament";
import {Match} from "../../dtos/match";

export const CreateInnings = (qpNumber: string, player: Player) => {
    return {
        //todo
        inningId: "1",
        player,
        runScored: 0,
        wicket: 0,
        overs: 0,
        qpNumber,
        startDate: new Date(),
        status: InningStatus.IN_PROGRESS,
    };
};

export const StartInning = (matchId: string, team: string, stadium: string, qpNumber: string, playerId: string, tournamentId: string = "1"): Match => {

    const tournament = GetTournamentDetails(tournamentId)
    const match = GetMatchDetails(tournament, matchId)

    if (match.firstPlayer.discordId != playerId && match.secondPlayer.discordId != playerId) {
        throw new Error("Only players of this match are allowed to start innings")
    }

    if (match.firstInning?.status == InningStatus.IN_PROGRESS || match.secondInning?.status == InningStatus.IN_PROGRESS || match.thirdInning?.status == InningStatus.IN_PROGRESS || match.fourthInning?.status == InningStatus.IN_PROGRESS) {
        throw new Error(`Inning ${match.currentInning} is still in progress`)
    }

    if (match.currentInning == 4) {
        throw new Error("match is already completed")
    }


    match.currentInning = (match.currentInning || 0) + 1
    let keyword = ""
    switch (match.currentInning) {
        case 1 :
            match.firstInning = getFirstInnings(qpNumber, playerId, team, tournamentId)
            break;
        case 2:
            keyword = "secondInning"
            break;
        case 3:
            keyword = "thirdInning"
            break;
        case 4:
            keyword = "fourthInning"
            break;
    }
    UpdateMatch(tournament, match)

    return match
}

export const EndInnings = (matchId: string,playerId: string, score: string, overs: string, wicket: string, matchLink: string, tournamentId: string = "1")=>{
    const tournament = GetTournamentDetails(tournamentId)
    const match = GetMatchDetails(tournament, matchId)

    if (match.firstPlayer.discordId != playerId && match.secondPlayer.discordId != playerId) {
        throw new Error("Only players of this match are allowed to start innings")
    }

    if (match.firstInning?.status != InningStatus.IN_PROGRESS && match.secondInning?.status != InningStatus.IN_PROGRESS && match.thirdInning?.status != InningStatus.IN_PROGRESS && match.fourthInning?.status == InningStatus.IN_PROGRESS) {
        throw new Error(`No innings to end`)
    }

    if (match.currentInning == 4) {
        throw new Error("match is already completed")
    }

    let keyword = ""
    switch (match.currentInning) {
        case 1 :
            const firstInning = match.firstInning
            if (firstInning) {
                firstInning.status = InningStatus.COMPLETED
                firstInning.endDate = new Date()
                firstInning.overs = Number(overs)
                firstInning.runScored = Number(score)
                firstInning.wicket = Number(wicket)
                firstInning.matchLink = matchLink
                match.firstInning = firstInning
                match.totalOverRemaining = match.totalOverRemaining || 240 - Number(overs)
                if (match.totalOverRemaining < 0) {
                    throw new Error("you crossed the maximum over")
                }
                UpdateMatch(tournament, match)
                return {match: match, innings: firstInning}
            }

            break;
        case 2:
            keyword = "secondInning"
            break;
        case 3:
            keyword = "thirdInning"
            break;
        case 4:
            keyword = "fourthInning"
            break;
    }

}

const getFirstInnings = (qpNumber: string, playerId: string,team:string, tournamentId: string = "1"): Inning => {
    const player = GetPlayerByTournamentIdAndPlayerId(tournamentId, playerId)
    return {
        inningId: "1",
        player: player,
        runScored: 0,
        wicket: 0,
        overs: 0,
        qpNumber: qpNumber,
        startDate: new Date(),
        status: InningStatus.IN_PROGRESS,
    }
}

// export const EndInnings = (tournamentId, matchId, playerId) => {
//   const match = GetMatchDetails(tournamentId, matchId);
//   const player: Player = GetPlayerByTournamentIdAndPlayerId(
//     tournamentId,
//     playerId
//   );

//   if (DoPlayerBelongToInnings(, playerId)) {

//   } else {
//     //todo
//   }
// };
