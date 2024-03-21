const {GetFixtures} = require("../../../typescript/utility/fixtures/fixture");
const {takeWebpageScreenshot} = require("../../utils/takeScreenshot")
const {getFixtureTable} = require("../../utils/renderTable")

const getFixture = async (interaction)=>{
    try {
        const fixture = GetFixtures("1")
        const table = getFixtureTable(fixture)
        const screenshot = await takeWebpageScreenshot(`https://api.quickchart.io/v1/table?data=${JSON.stringify(table)}`)

        interaction.reply({
            files: [{ attachment: screenshot, name: "screenshot.png" }],
        })
    }catch (e){
        interaction.reply(e.message)
    }
}

module.exports = {getFixture}