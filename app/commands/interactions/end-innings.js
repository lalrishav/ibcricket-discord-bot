const {StartInning, EndInnings} = require("../../../typescript/utility/innings/innings");
const {MatchStatusEnum} = require("../../../typescript/dtos/match");
const {getFixture} = require("./fixture");
const endInnings = async (interaction, appEmitter)=>{
    try {
        const discordUserId = interaction.user.id
        const score = interaction.options.get("run_scored").value;
        const overs = interaction.options.get("number_of_overs_played").value;
        const wickets = interaction.options.get("number_of_wickets").value;
        const link = interaction.options.get("match_link").value;

        const channelName = interaction.channel.name
            const matchId = channelName.toString().split("-")[0]
            if (!matchId){
                interaction.reply("something went wrong")
            }
            const {innings, match} = EndInnings(matchId, discordUserId, score, overs, wickets, link)
            await interaction.reply(`Below is the match summary - 
            
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
            IB Match Link: ${innings.matchLink || ''}
            Comment: ${match.comment || ''}
            `)

            if(match.status === MatchStatusEnum.COMPLETED){
                if(!match.result.isDraw){
                    await interaction.followUp(`Congratulations <@${match.result.winner?.discordId}> for your win!!  <@${match.result.looser.discordId}> better luck next time`)
                }
                await interaction.followUp("This channel will be available for 24 more hours")
                await interaction.followUp("Sending latest points table and fixture")
                await getFixture(interaction)
            }

    }catch (e) {
        interaction.reply(e.message)
    }
}

module.exports = {endInnings}