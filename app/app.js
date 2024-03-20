require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const {
  createTournament,
} = require("./commands/interactions/create-tournament");
const { addPlayer } = require("./commands/messages/add-player");
const {listPlayers} = require("./commands/interactions/list-player");
const {startTournament} = require("./commands/interactions/start-tournament");
const EventEmitter = require('events');
const {GetFixtures} = require("../typescript/utility/fixtures/fixture");
const {getFixtureTable} = require("../app/utils/renderTable")
const {takeWebpageScreenshot} = require("../app/utils/takeScreenshot")
const {getFixture} = require("./commands/interactions/fixture");

const appEmitter = new EventEmitter();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
  appEmitter.on("sendTournamentStartDetails", async (channel,tournamentId)=>{
    if(channel){
      const fixture = GetFixtures(tournamentId)
      const table = getFixtureTable(fixture)
      const url = `https://api.quickchart.io/v1/table?data=${JSON.stringify(table)}`
      console.log(url)
      const screenshot = await takeWebpageScreenshot(url)
      channel.send({files: [{ attachment: screenshot, name: "screenshot.png" }],})
    }
  })
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);
  switch (interaction.commandName) {
    case "create-tournament":
      createTournament(interaction);
      break;
    case "list-players":
      listPlayers(interaction);
      break;
    case "start-tournament":
      await startTournament(interaction, appEmitter)
      break;
    case "fixtures":
      await getFixture(interaction)
      break;
    default:
      break;
  }
});

client.on("messageCreate", (message) => {
  const content = message.content
  if (message.toString().startsWith("add-players")) {
    addPlayer(message)
  }
});

client.login(process.env.TOKEN);
