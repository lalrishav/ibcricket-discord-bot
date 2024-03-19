import { Match, MatchStatusEnum } from "../../dtos/match";
import { Player } from "../../dtos/player";
import { DoPlayerBelongToMatch } from "../../validators/validator";
import { CreateInnings } from "../innings/innings";
import { GetPlayerByTournamentIdAndPlayerId } from "../players/players";
import { GetTournamentDetails } from "../start-tournament/startTournament";

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
  const battingFirstDiscordId = playerId;
  const battingfirstPlayer: Player = GetPlayerByTournamentIdAndPlayerId(
    tournamentId,
    battingFirstDiscordId
  );

  if (DoPlayerBelongToMatch(match, playerId)) {
    match.battingFirst = battingfirstPlayer;
    match.status = MatchStatusEnum.FIRST_INNING_IN_PROGRESS;
    (match.country = country), (match.startDate = new Date());
    match.firstInning = CreateInnings(qpNumber, battingfirstPlayer);
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
