const {start} = require("../../../typescript/utility/tournament/tournament");

const startTournament = async (interaction, appEmitter) => {
    const tournamentId = "1";
    try {
        let tournament = start(tournamentId)
        await interaction.reply(`Tournament started successfully, sending you the fixtures and point tables`);
        setTimeout(async () => {
            try {
                appEmitter.emit('sendTournamentStartDetails', interaction.channel, 1);
            } catch (e) {
                interaction.reply(e.message);
                console.log("error ", e.message)
            }
        }, 3000)

    } catch (e) {
        //todo
        interaction.reply(e.message);
        console.log("error ", e.message)
    }
}

module.exports = {startTournament}