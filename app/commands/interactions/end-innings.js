const {StartInning, EndInnings} = require("../../../typescript/utility/innings/innings");
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
                <@${match.firstPlayer.discordId}> vs <@${match.secondPlayer.discordId}>
                Match: ${match.matchId}
                Run scored: ${innings.runScored}
                Wickets: ${innings.wicket}
                Overs: ${innings.overs}
                Total Over remaining: ${match.totalOverRemaining}
                Ground: ${match.pitch}
                Team Playing Against: ${innings.country}
                IB Match Link: ${innings.matchLink}
            `)
        }
    }catch (e) {
        console.log("error" , e)
    }
}

module.exports = {endInnings}