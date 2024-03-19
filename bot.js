const { Client, GatewayIntentBits, MessageE } = require("discord.js");
const { createCanvas } = require("canvas");
const Chart = require("chart.js");
const puppeteer = require("puppeteer");
const { handleSchedule } = require("./commands/schedule");
const {
  getTournamentSchedule,
} = require("./typescript/utility/getTournamentProgress");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is ready!");
});
const PREFIX = "!";

client.on("messageCreate", async (message) => {
  console.log("recieved ", message.content);
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const tournament = require("./mocks/tournament.json");
  if (command === "init_tournament") {
    const filter = (response) => response.author.id === message.author.id;
    await message.channel.send(
      "Please answer the below questions in the reply"
    );

    const questions = [
      "What is Name of tournament ?",
      "Number of overs ? (10, 20, 50, unlimited)",
      "Pitch - (green, bounce, dry, normal)",
      "Tag all players - ",
    ];

    const answers = [];

    for (const question of questions) {
      await message.channel.send(question);
      const response = await message.channel.awaitMessages({
        filter,
        max: 1,
        time: 60000,
        errors: ["time"],
      });
      console.log("response is ", response);
      answers.push(response.first().content);
    }
    console.log("all the answers are ", answers);
    const [name, over, pitch, players] = answers;
    await message.channel.send(
      `Please review below - 
            Name : ${name},
            Overs : ${over},
            Pitch : ${pitch},
            Player : ${players}
        If all okay you can reply "okay"
        `
    );

    const response = await message.channel.awaitMessages({
      filter,
      max: 1,
      time: 60000,
      errors: ["time"],
    });
    console.log("response is ", response.first().content);

    if (response.first().content.toLowerCase() == "yes") {
      console.log("hello");
      await message.channel.send(
        "Tournament created successfully , tournament id - 123455"
      );
    }
  } else if (command.startsWith("schedule")) {
    console.log("handling schedule");
    const tournamentData = getTournamentSchedule(tournament);
    const tableTitle = "User Information";
    const tableData = [];
    tournamentData.forEach((data) => {
      tableData.push([data.matchId,data.firstPlayer, data.secondPlayer, data.status]);
    });

    const embed = {
      title: tableTitle,
      color: 0x0099ff, // You can customize the color as needed
      fields: []
  };

    // const embed = new MessageEmbed().setTitle(tableTitle).setColor("#0099ff"); // You can customize the color as needed

    // Add fields to the embed
    tableData.forEach((row) => {
      embed.fields.push({ name: `Match ${row[0]}`, value: `${row[1]} vs ${row[2]}
      Status : ${row[3]}
      ` });
    });

    // Send the embed as a message
    message.channel.send({ embeds: [embed] });
  }
});

client.login(
  "MTIxOTQyNzY0NjIxMjE0NTIwNA.GrWqWn.cF2qrGFYAT-8x7AfMgGH1vXZ04KuNHZ07q0-cU"
);
