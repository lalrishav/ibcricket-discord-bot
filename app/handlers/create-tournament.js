require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

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
  if (interaction.commandName === "create-tournament") {
    const name = interaction.options.get("name").value;
    const overs = interaction.options.get("overs").value;
    const pitchType = interaction.options.get("pitch_type").value;
    console.log(name, overs, pitchType);
    interaction.reply(`Tag all the players in reply`);
  }
});

client.login(process.env.TOKEN);
