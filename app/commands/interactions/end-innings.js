const {StartInning, EndInnings} = require("../../../typescript/utility/innings/innings");
const {MatchStatusEnum} = require("../../../typescript/dtos/match");
const endInnings = (interaction)=>{
    try {
        const discordUserId = interaction.user.id
        const score = interaction.options.get("run_scored").value;
        const overs = interaction.options.get("number_of_overs_played").value;
        const wickets = interaction.options.get("number_of_wickets").value;
        const link = interaction.options.get("match_link").value;

        const channelName = interaction.channel.name
        if(!channelName.toString().endsWith("bot")) {
            interaction.reply("Not a valid channel to fire this command")
        }else{
            const matchId = channelName.toString().split("-")[0]
            if (!matchId){
                interaction.reply("something went wrong")
            }
            const {innings, match} = EndInnings(matchId, discordUserId, score, overs, wickets, link)
            interaction.reply(`Below is the match summary - 
            
            Played by - <@${match.currentInning % 2 !== 0 ? match.battingFirst.discordId : match.battingSecond.discordId}>
            
            <@${match.firstPlayer.discordId}> vs <@${match.secondPlayer.discordId}>
            Match: ${match.matchId}
            Innings: ${match.currentInning}
            Run scored: ${innings.runScored}
            Wickets: ${innings.wicket}
            Overs: ${innings.overs}
            Total Over remaining: ${match.totalOverRemaining}
            Ground: ${match.pitch}
            Team Playing Against: ${innings.country}
            IB Match Link: ${innings.matchLink}
            Comment: ${match.comment}
            `)
            if((match.status !== MatchStatusEnum.COMPLETED && match.status !== MatchStatusEnum.ABANDONED)) {
                switch (match.currentInning ){
                    case 1:
                        // interaction.channel.reply(`Its time for second inning <@${match.battingSecond.discordId}>, use /start-inning command to start your innings`)
                        break
                    case 2:
                        // interaction.channel.reply(`Its time for third inning <@${match.battingFirst.discordId}>, use /start-inning command to start your innings`)
                        break
                    default:
                        break
                }
            }
        }
    }catch (e) {
        console.log("error" , e)
    }
}

module.exports = {endInnings}