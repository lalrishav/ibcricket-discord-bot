const {StartMatch} = require("../../../typescript/utility/matches/matches");
const {createChannel} = require("../../utils/createChannel");

const startMatch = async (client, interaction) => {
    try {
        const matchId = interaction.options.get("match_id").value;
        if (!matchId){
            throw new Error("match id is required, pls refer to the fixture table for it")
        }
        const discordUserId = interaction.user.id
        const match = StartMatch(matchId, discordUserId)
        await interaction.reply(`All the best for your match. batting first need to type /start-inning `)

    }catch (e){
        interaction.reply(e.message)
    }

}
module.exports = {startMatch}