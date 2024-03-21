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
const {startMatch} = require("./commands/interactions/start-match");
const {startInning} = require("./commands/interactions/start-inning");
const {endInnings} = require("./commands/interactions/end-innings");
const {createChannel} = require("./utils/createChannel");

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
  appEmitter.on("sendTournamentStartDetails", async (channel,tournament)=>{
    if(channel){
      const halfWayIndex = Math.ceil(tournament.matches.length / 2);

      // for (let i = 0; i < tournament.matches.length; i++) {
      //   const match = tournament.matches[i];
      //
      //   const category = i < halfWayIndex ? "1220422570550104094" : "1220422570550104094";
      //   const channelName = `match-${match.matchId}- ${match.firstPlayer.name}-vs-${match.secondPlayer.name}`
      //   const newChannel = await createChannel(client, channelName, category)
      //   await newChannel.send(`Welcome <@${match.firstPlayer.discordId}> and <@${match.secondPlayer.discordId}> this is your channel which you will use for this match, Toss have to be accommodated manually right now using https://cointoss.studio91media.co.uk/, player who will bat first use /start-innings <england> <stadium-2> <qpNumber> to start your innings, once completed you can use /end-innings <score> <overs> <profileLink>  to end your innings. If facing any issue or bot is offline please proceed manually.`)
      // }
    }
  })
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(`command fired /${interaction.commandName} by ${interaction.user.username}`);
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
    case "start-match":
      await startMatch(client, interaction)
      break;
    case "start-inning":
      await startInning(interaction)
      break;
    case "end-inning":
      await endInnings(interaction, appEmitter)
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
