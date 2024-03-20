const {StartInning} = require("../../../typescript/utility/innings/innings")

const startInning = (interaction) => {
    try {
        const discordUserId = interaction.user.id
        const country = interaction.options.get("country").value;
        const qpNumber = interaction.options.get("qp_number").value;
        const stadium = interaction.options.get("stadium").value;
        const channelName = interaction.channel.name
        if(!channelName.toString().endsWith("bot")) {
            interaction.reply("Not a valid channel to fire this command")
        }else{
            const matchId = channelName.toString().split("-")[0]
            if (!matchId){
                interaction.reply("something went wrong")
            }
            const match = StartInning(matchId, country, stadium, qpNumber, discordUserId)
            interaction.reply("All the best for your innings, after completion please use /end-innings score overs profileLink to end your innings")
        }
    }catch (e) {
        console.log("error" , e)
    }
}

module.exports = {startInning}