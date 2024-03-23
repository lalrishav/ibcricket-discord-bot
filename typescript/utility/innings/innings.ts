//start match will start the first innings automatically

import {Inning, InningStatus} from "../../dtos/inning";
import {Player} from "../../dtos/player";
import {EndMatch, GetMatchDetails, UpdateMatch} from "../matches/matches";
import {GetPlayerByTournamentIdAndPlayerId} from "../players/players";
import {GetTournamentDetails} from "../tournament/tournament";
import {Match, MatchStatusEnum} from "../../dtos/match";

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
    if (!match.status || match.status == MatchStatusEnum.ABANDONED || match.status == MatchStatusEnum.NOT_YET_STARTED || match.status == MatchStatusEnum.COMPLETED ){
        throw new Error ("can not start innings , match status " + match?.status || 'NOT YET STARTED')
    }

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
    match.stadium = stadium
    const player = GetPlayerByTournamentIdAndPlayerId(tournamentId, playerId)


    switch (match.currentInning) {
        case 1 :
            match.firstInning = getInnings("1", qpNumber, player, team, tournamentId)
            match.battingFirst = player
            match.status = MatchStatusEnum.FIRST_INNING_IN_PROGRESS
            if(player.discordId == match.firstPlayer.discordId){
                match.battingSecond = match.secondPlayer
            }else {
                match.battingSecond = match.firstPlayer
            }
            break;
        case 2:
            match.secondInning = getInnings("2", qpNumber, player, team, tournamentId)
            match.status = MatchStatusEnum.SECOND_INNING_IN_PROGRESS
            break;
        case 3:
            match.thirdInning = getInnings("3", qpNumber, player, team, tournamentId)
            match.status = MatchStatusEnum.THIRD_INNING_IN_PROGRESS
            break;
        case 4:
            match.fourthInning = getInnings("4", qpNumber, player, team, tournamentId)
            match.status = MatchStatusEnum.FOURTH_INNING_IN_PROGRESS
            break;
        default:
            break;
    }
    UpdateMatch(tournament, match)

    return match
}

export const EndInnings = (matchId: string,playerId: string, score: string, overs: string, wicket: string, matchLink: string, tournamentId: string = "1")=>{

    const tournament = GetTournamentDetails(tournamentId)
    let match = GetMatchDetails(tournament, matchId)

    if (!match.status || match.status == MatchStatusEnum.ABANDONED || match.status == MatchStatusEnum.NOT_YET_STARTED || match.status == MatchStatusEnum.COMPLETED ){
        throw new Error ("can not start innings , match status " + match?.status || 'NOT YET STARTED')
    }

    if (match.firstPlayer.discordId != playerId && match.secondPlayer.discordId != playerId) {
        throw new Error("Only players of this match are allowed to start innings")
    }

    if (match.firstInning?.status != InningStatus.IN_PROGRESS && match.secondInning?.status != InningStatus.IN_PROGRESS && match.thirdInning?.status != InningStatus.IN_PROGRESS && match.fourthInning?.status != InningStatus.IN_PROGRESS) {
        throw new Error(`No innings to end`)
    }

    if (match.currentInning == 5) {
        throw new Error("match is already completed")
    }

    let keyword = ""
    switch (match.currentInning) {
        case 1 :
            const firstInning = match.firstInning
            if (firstInning) {
                firstInning.status = InningStatus.COMPLETED
                firstInning.endDate = new Date()
                firstInning.overs =  Number(overs)
                firstInning.runScored = Number(score)
                firstInning.wicket = Number(wicket)
                firstInning.matchLink = matchLink
                match.pitch
                match.firstInning = firstInning
                let comment = ""
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining  -  Math.ceil(Number(overs))
                if (match.totalOverRemaining <= 0) {
                    match = EndMatch(match, tournament, undefined, undefined, "Match Drawn", true)
                    comment = "Match Drawn"
                    return {match:match, innings: firstInning}
                }
                comment = `<@${match.battingFirst?.discordId}> scored ${score} runs`
                match.comment = comment
                UpdateMatch(tournament, match)
                return {match: match, innings: firstInning}
            }

            break;
        case 2:
            const secondInning = match.secondInning
            if(secondInning){
                secondInning.status = InningStatus.COMPLETED
                secondInning.endDate = new Date()
                secondInning.overs =  Number(overs)
                secondInning.runScored = Number(score)
                secondInning.wicket = Number(wicket)
                match.secondInning = secondInning
                let comment = "NA"
                // @ts-ignore
                const runDiff = match.secondInning.runScored - match.firstInning.runScored
                if(runDiff > 0) {
                    //that mean second inning player scored more than first inning player
                    comment = `<@${secondInning.player.discordId}> lead by ${runDiff} runs`
                }else {
                    comment = `<@${match.battingFirst?.discordId}> lead by ${Math.abs(runDiff)} runs`
                }
                match.comment = comment
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining -  Math.ceil(Number(overs))
                if (match.totalOverRemaining <= 0) {
                    match = EndMatch(match, tournament, undefined, undefined, "Match Drawn", true)
                    return {match:match, innings: secondInning}

                }
                UpdateMatch(tournament, match)
                return {match: match, innings: secondInning}
            }
            break;
        case 3:
            const thirdInning = match.thirdInning
            if(thirdInning){
                thirdInning.status = InningStatus.COMPLETED
                thirdInning.endDate = new Date()
                thirdInning.overs = Number(overs)
                thirdInning.runScored = Number(score)
                thirdInning.wicket = Number(wicket)
                match.thirdInning = thirdInning
                let comment = "NA"
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining -  Math.ceil(Number(overs))

                // @ts-ignore
                const firstTwoInningDiff = match.secondInning?.runScored - match.firstInning?.runScored
                console.log("firstTwoInningDiff" , firstTwoInningDiff)
                console.log("third innings score" , thirdInning.runScored)
                if(firstTwoInningDiff > 0){
                    //that mean there is a possibility of losing the match by innings
                    if(thirdInning.runScored < firstTwoInningDiff) {
                        match = EndMatch(match, tournament, match.battingSecond, match.battingFirst, `${match.battingSecond?.discordUsername} won by innings and ${firstTwoInningDiff - thirdInning.runScored} runs`, false, true)
                        return {match:match, innings: thirdInning}
                    }else{
                        comment = `<@${match.battingSecond?.discordId}> need ${thirdInning.runScored - firstTwoInningDiff + 1} to win`
                    }
                }else{
                    comment = `<@${match.battingSecond?.discordId}> need ${thirdInning.runScored - firstTwoInningDiff + 1} to win`
                }
                match.comment = comment

                if (match.totalOverRemaining <= 0) {
                    match = EndMatch(match, tournament, undefined, undefined, "Match Drawn", true)
                    return {match:match, innings: thirdInning}
                }

                UpdateMatch(tournament, match)
                return {match: match, innings: thirdInning}

            }
            break;
        case 4:
            const fourthInnings = match.fourthInning
            if(fourthInnings){
                fourthInnings.status = InningStatus.COMPLETED
                fourthInnings.endDate = new Date()
                fourthInnings.overs = Number(overs)
                fourthInnings.runScored = Number(score)
                fourthInnings.wicket = Number(wicket)
                match.fourthInning = fourthInnings
                // @ts-ignore
                match.totalOverRemaining = match.totalOverRemaining -  Math.ceil(Number(overs))

                // @ts-ignore
                const runToWin = (match.firstInning?.runScored + match.thirdInning?.runScored) - match.secondInning?.runScored + 1
                let comment = "NA"
                if (fourthInnings.runScored >= runToWin){
                    comment = `<@${match.battingSecond?.discordId}> won by ${10 - Number(wicket)} wicket`
                    match = EndMatch(match, tournament, match.battingSecond, match.battingFirst, comment, false)
                    return {match:match, innings: fourthInnings}
                }else if(fourthInnings.runScored < runToWin){
                    if(match.totalOverRemaining > 0){
                        comment = `<@${match.battingFirst?.discordId}> won by ${runToWin - fourthInnings.runScored} runs`
                        match = EndMatch(match, tournament, match.battingFirst, match.battingSecond, comment, false)
                        return {match:match, innings: fourthInnings}

                    }else if(match.totalOverRemaining <= 0){
                        comment = "Match draw"
                        match = EndMatch(match, tournament, undefined, undefined, comment, true)
                        return {match:match, innings: fourthInnings}
                    }
                }


                UpdateMatch(tournament, match)
                return {match: match, innings: fourthInnings}
            }
            break;
    }

}

const getInnings = (inningId: string, qpNumber: string, player: Player,team:string, tournamentId: string = "1"): Inning => {
    return {
        inningId: inningId,
        player: player,
        runScored: 0,
        wicket: 0,
        overs: 0,
        qpNumber: qpNumber,
        startDate: new Date(),
        status: InningStatus.IN_PROGRESS,
        country: team
    }
}

const EndFirstInnings = ()=>{

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
