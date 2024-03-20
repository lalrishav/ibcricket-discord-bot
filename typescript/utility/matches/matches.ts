import { Match, MatchStatusEnum } from "../../dtos/match";
import { Player } from "../../dtos/player";
import { DoPlayerBelongToMatch } from "../../validators/validator";
import { CreateInnings } from "../innings/innings";
import { GetPlayerByTournamentIdAndPlayerId } from "../players/players";
import {GetTournamentDetails} from "../tournament/tournament";

export const CreateMatches = (players: Player[], pitch: string): Match[] => {
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
  tournamentId: string,
  matchId: string
): Match => {
  const tournament = GetTournamentDetails(tournamentId);
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
  tournamentId: string,
  matchId: string,
  playerId: string,
  country: string,
  qpNumber: string
) => {
  const match = GetMatchDetails(tournamentId, matchId);
  let battingFirstDiscordId: string;
  battingFirstDiscordId = playerId;
  const battingFirstPlayer: Player = GetPlayerByTournamentIdAndPlayerId(
    tournamentId,
    battingFirstDiscordId
  );

  if (DoPlayerBelongToMatch(match, playerId)) {
    match.battingFirst = battingFirstPlayer;
    match.status = MatchStatusEnum.FIRST_INNING_IN_PROGRESS;
    match.country = country
    match.startDate = new Date();
    match.firstInning = CreateInnings(qpNumber, battingFirstPlayer);
    match.currentInning = 1
  } else {
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
