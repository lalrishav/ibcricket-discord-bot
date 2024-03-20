import {Match, MatchStatusEnum} from "../../dtos/match";
import {Player} from "../../dtos/player";
import {DoPlayerBelongToMatch} from "../../validators/validator";
import {GetPlayerByTournamentIdAndPlayerId} from "../players/players";
import {GetTournamentDetails, UpdateTournament} from "../tournament/tournament";
import {Tournament} from "../../dtos/tournament";

export const InitiateMatches = (players: Player[], pitch: string): Match[] => {
    const numPlayers = players.length;
    const matches: Match[] = [];
    let index = 1;
    for (let i = 0; i < numPlayers; i++) {
        for (let j = i + 1; j < numPlayers; j++) {
            matches.push({
                matchId: index.toString(),
                firstPlayer: players[i],
                secondPlayer: players[j],
                pitch: pitch,
                status: MatchStatusEnum.NOT_YET_STARTED,
            });

            index++;
        }
    }
    return matches;
};

export const GetMatchesByTournamentId = (tournamentId: string): Match[] => {
    const tournament = GetTournamentDetails(tournamentId);
    return tournament.matches;
};

export const GetMatchesByTournamentIdAndPlayerId = (
    tournamentId: string,
    playerId: string
): Match[] => {
    const tournament = GetTournamentDetails(tournamentId);
    const matches = tournament.matches;
    const playerMatch: Match[] = [];
    matches.forEach((item) => {
        if (DoPlayerBelongToMatch(item, playerId)) {
            playerMatch.push(item);
        }
    });
    return playerMatch;
};

export const GetMatchDetails = (
    tournament: Tournament,
    matchId: string
): Match => {
    const matches = tournament.matches;
    const index = matches.findIndex((item) => item.matchId == matchId);
    if (index != -1) {
        return matches[index];
    } else {
        return {} as Match;
        //todo invalid match id
    }
};

export const StartMatch = (
    matchId: string,
    playerId: string,
    tournamentId: string = "1",
): Match => {

    const tournament = GetTournamentDetails(tournamentId)
    const match = GetMatchDetails(tournament, matchId);
    if (match.status != MatchStatusEnum.NOT_YET_STARTED) {
        throw new Error("match is already started")
    }
    let battingFirstDiscordId: string;
    battingFirstDiscordId = playerId;
    const battingFirstPlayer: Player = GetPlayerByTournamentIdAndPlayerId(
        tournamentId,
        battingFirstDiscordId
    );

    if (DoPlayerBelongToMatch(match, playerId)) {
        match.battingFirst = battingFirstPlayer;
        match.status = MatchStatusEnum.INITIATED;
        match.startDate = new Date();
        const index = tournament.matches.findIndex(item => item.matchId === matchId);
        if (index !== -1) {
            tournament.matches[index] = match;
            UpdateTournament(tournament)
            return match
        }else{
            throw new Error("something went wrong")
        }
    } else {
        throw new Error("only player belong to this match can start")
        //todo
    }
};

//todo
// export const GetMatchesScheduleByTournamentIdAndPlayerIdAndStatus = (
//   tournamentId: string,
//   playerId: string,
//   status: string
// ): Match[] => {
//   const tournament = GetTournamentDetails(tournamentId);
//   const matches = tournament.matches;
//   const playerMatch: Match[] = [];
//   matches.forEach((item) => {
//     if (
//       (item.firstPlayer.discordId == playerId ||
//         item.firstPlayer.discordId == playerId) &&
//       item.status == status
//     ) {
//       playerMatch.push(item);
//     }
//   });
//   return playerMatch;
// };
