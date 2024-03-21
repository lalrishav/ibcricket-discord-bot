const {StartInning} = require("../../../typescript/utility/innings/innings")

const startInning = (interaction) => {
    try {
        const discordUserId = interaction.user.id
        const country = interaction.options.get("country").value;
        const qpNumber = interaction.options.get("qp_number").value;
        const stadium = interaction.options.get("stadium").value;


        const channelName = interaction.channel.name


            const matchId = channelName.toString().split("-")[1]
            if (!matchId){
                interaction.reply(`something went wrong or not correct channel for this command, channel name should start with match-<matchNumber>-<player2>-vs-</player2>`)
            }else{
                const match = StartInning(matchId, country, stadium, qpNumber, discordUserId)
                interaction.reply(`
                Inning number - ${match.currentInning || 0}. All the best <@${discordUserId}> for your innings, after completion please use /end-innings score overs profileLink to end your innings
                Your inning details - 
                Playing against : ${country || ''}
                Quick play number : ${qpNumber || ''}
                Stadium: ${stadium || ''}
                `)
            }

    }catch (e) {
        interaction.reply(e.message)
    }
}

module.exports = {startInning}