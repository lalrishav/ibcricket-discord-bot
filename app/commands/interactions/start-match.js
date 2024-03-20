const {StartMatch} = require("../../../typescript/utility/matches/matches");
const {createChannel} = require("../../utils/createChannel");

const startMatch = async (client, interaction) => {
    const matchId = interaction.options.get("match_id").value;
    const discordUserId = interaction.user.id
    const match = StartMatch(matchId, discordUserId)
    const channelName = `${match.firstPlayer.name} - vs - ${match.secondPlayer.name}`
    await interaction.reply(`Creating channel named - ${channelName}`)
    const channel = await createChannel(client, channelName)
    await channel.send(`Welcome <@${match.firstPlayer.discordId}> and <@${match.secondPlayer.discordId}> this is your channel which you will use for this match, Toss have to be accommodated manually right now, player who will bat first use /start-innings england stadium-2 qpNumber to start your innings, once completed you can use /end-innings score overs profileLink  to end your innings`)

}
module.exports = {startMatch}