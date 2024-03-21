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
            const matchId = channelName.toString().split("-")[1]
            if (!matchId){
                interaction.reply(`something went wrong or not correct channel for this command, channel name should start with match-<matchNumber>-<player2>-vs-</player2>`)
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
                const totalFirstBatsmanScore = (match.firstInning.runScored || 0) + ( match.thirdInning.runScored || 0)
                const totalSecondBatsmanScore = (match.secondInning.runScored || 0) + ( match.fourthInning.runScored || 0)
                const totalFirstBatsmanWicket = (match.firstInning.wicket || 0) + ( match.thirdInning.wicket || 0)
                const totalSecondBatsmanWicket = (match.secondInning.wicket || 0) + ( match.fourthInning.wicket || 0)

                if(!match.result.isDraw){
                    await interaction.followUp(`Congratulations <@${match.result.winner?.discordId}> for your win!!  <@${match.result.looser.discordId}> better luck next time`)
                    await interaction.followUp(
            `Test Match No: ${matchId} <@${match.battingFirst.discordId}> vs <@${match.battingSecond.discordId}>
Final scores
<@${match.battingFirst.discordId}>: ${match.firstInning.runScored || 0}/${match.firstInning.wicket || 0} (Overs: ${match.firstInning.overs || 0}) and ${match.thirdInning.runScored || 0}/${match.thirdInning.wicket || 0} (O: ${match.thirdInning.overs || 0}) = ${totalFirstBatsmanScore}/${totalFirstBatsmanWicket} (Total score)
<@${match.battingSecond.discordId}>: ${match.secondInning.runScored || 0}/${match.secondInning.wicket || 0} (Overs: ${match.secondInning.overs || 0}) and ${match.fourthInning.runScored || 0}/${match.fourthInning.wicket || 0} (O: ${match.fourthInning.overs || 0}) = ${totalSecondBatsmanScore}/${totalSecondBatsmanWicket} (Total score)
${match.comment}`
                    )
                }
            }

    }catch (e) {
        interaction.reply(e.message)
    }
}

module.exports = {endInnings}