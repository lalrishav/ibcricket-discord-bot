import { Inning } from "../dtos/inning";
import { Match } from "../dtos/match";
import { Tournament } from "../dtos/tournament";

export const DoPlayerBelongToMatch = (match: Match, playerId: string)=>{
    return match.firstPlayer?.discordId == playerId || match.secondPlayer.discordId == playerId
}

export const DoPlayerBelongToInnings = (inning: Inning, playerId: string)=>{
    return inning.player?.discordId == playerId 
}