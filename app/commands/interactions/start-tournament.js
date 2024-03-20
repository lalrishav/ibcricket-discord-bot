const {start} = require("../../../typescript/utility/tournament/tournament");
const {GetFixtures} = require("../../../typescript/utility/fixtures/fixture");
const {takeWebpageScreenshot} = require("../../utils/takeScreenshot")
const {getFixtureTable} = require("../../utils/renderTable")
const startTournament = async (interaction, appEmitter) => {
    const tournamentId = "1";
    try {
        let tournament = start(tournamentId)
        await interaction.reply(`Tournament started successfully, sending you the fixtures and point tables`);
        setTimeout(async () => {
            try {
                appEmitter.emit('sendTournamentStartDetails', interaction.channel, 1);
                // const fixture = GetFixtures(tournamentId)
                // const table = getFixtureTable(fixture)
                // const screenshot = takeWebpageScreenshot(`https://api.quickchart.io/v1/table?data=${table}`)
                //
                // await interaction.followUp({
                //     files: [{ attachment: screenshot, name: "screenshot.png" }],
                // })
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