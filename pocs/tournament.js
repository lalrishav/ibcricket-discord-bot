const { Client, GatewayIntentBits } = require("discord.js");
const { createCanvas } = require("canvas");
const Chart = require("chart.js");
const puppeteer = require("puppeteer");

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

client.on("aaaaa", async (message) => {
  console.log("recieved ", message.content);
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "init_tournament") {
    const filter = (response) => response.author.id === message.author.id;

    const questions = [
      "What is Name of tournament ?",
      "How old are you?",
      "What is your email?",
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

    const [name, age, email] = answers;
    await message.channel.send(
      `Thank you, ${name}. You are ${age} years old. Your email is ${email}.`
    );
  }
});

client.on('messageCreate', message => {
    // Check if the message is from a user and starts with a specific command (e.g., !question)
    if (!message.author.bot && message.content.startsWith('!question')) {
        // Send the single-choice question
        message.channel.send('What is the capital of France?\nA. London\nB. Paris\nC. Rome\nD. Berlin').then(questionMsg => {
            // React to the message with emojis representing the choices
            questionMsg.react('🇦');
            questionMsg.react('🇧');
            questionMsg.react('🇨');
            questionMsg.react('🇩');
            
            // Create a filter to only collect one reaction from the user who initiated the question
            const filter = (reaction, user) => {
                return ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            const collector = questionMsg.createReactionCollector(filter, { max: 1, time: 15000 }); // Collector collects only one reaction and runs for 15 seconds

            collector.on('collect', (reaction, user) => {
                // Handle user's reaction
                switch (reaction.emoji.name) {
                    case '🇦':
                        // Handle option A
                        break;
                    case '🇧':
                        // Handle option B
                        break;
                    case '🇨':
                        // Handle option C
                        break;
                    case '🇩':
                        // Handle option D
                        break;
                    default:
                        break;
                }
            });

            collector.on('end', collected => {
                // End of collector
                console.log(`Collected ${collected.size} reactions`);
            });
        });
    }
});

client.login(
  "MTIxOTQyNzY0NjIxMjE0NTIwNA.GrWqWn.cF2qrGFYAT-8x7AfMgGH1vXZ04KuNHZ07q0-cU"
);
