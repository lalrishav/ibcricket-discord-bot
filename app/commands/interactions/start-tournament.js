const {start} = require("../../../typescript/utility/tournament/tournament");

const startTournament = (interaction) => {
    const tournamentId = interaction.options.get("tournament_id").value;
    try {
        start(tournamentId)
        interaction.reply(`Tournament started successfully, sending you the fixtures and point tables`);
    } catch (e) {
        //todo
        interaction.reply(e.message);
        console.log("error ", e.message)
    }
}

module.exports = {startTournament}