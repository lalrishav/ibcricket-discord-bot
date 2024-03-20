require("dotenv").config();
const {REST, Routes, ApplicationCommandOptionType} = require("discord.js");

const commands = [
    {
        name: "create-tournament",
        description: "Create a tournament by choosing the  options",
        options: [
            {
                name: "name",
                description: "The name of the tournament.",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "overs",
                description:
                    "Choose the number of overs (currently only test match is suported)",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "unlimited",
                        value: "unlimited",
                    },
                ],
                required: true,
            },
            {
                name: "pitch_type",
                description: "Choose the pitch type",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "bounce",
                        value: "bounce",
                    },
                    {
                        name: "green",
                        value: "green",
                    },
                    {
                        name: "normal",
                        value: "normal",
                    },
                    {
                        name: "dry",
                        value: "dry",
                    },
                ],
                required: true,
            },
        ],
    },
    {name: "list-players", "description": "list all the players of current tournament"},
    {
        name: "start-tournament", "description": "start your tournament", options: [
            {
                name: "tournament_id",
                description: "Enter the tournament id to start",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    }
];

const rest = new REST({version: "10"}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash utils...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {body: commands}
        );

        console.log("Slash utils were registered successfully!");
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();
