require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const {
  createTournament,
} = require("./commands/interactions/create-tournament");
const { addPlayer } = require("./commands/messages/add-player");
const {listPlayers} = require("./commands/interactions/list-player");

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
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.commandName);
  switch (interaction.commandName) {
    case "create-tournament":
      createTournament(interaction);
      break;
    case "list-players":
      listPlayers(interaction);
      break;
    default:
      break;
  }
});

client.on("messageCreate", (message) => {
  const content = message.content
  console.log("received msg", content)
  if (message.toString().startsWith("add-players")) {
    addPlayer(message)
  }
});

client.login(process.env.TOKEN);
