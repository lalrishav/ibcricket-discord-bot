const {start} = require("../../../typescript/utility/tournament/tournament");

const startTournament = async (interaction, appEmitter) => {
    const tournamentId = "1";
    try {
        let tournament = start(tournamentId)
        await interaction.reply(`Tournament started successfully, Creating channels`);
        setTimeout(async () => {
            try {
                appEmitter.emit('sendTournamentStartDetails', interaction.channel, tournament);
            } catch (e) {
                interaction.reply(e.message);
                console.log("error ", e.message)
            }
        }, 3000)

    } catch (e) {
        interaction.reply(e.message);
    }
}

module.exports = {startTournament}