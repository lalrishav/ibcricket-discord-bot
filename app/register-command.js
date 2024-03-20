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
        name: "start-tournament", "description": "start your tournament"
    },
    {
        name: "fixtures", "description": "get fixtures"
    },
    {
        name: "start-match", "description": "get fixtures" , options: [
            {
                name: "match_id",
                description: "Match id, get it by using /fixtures",
                type: ApplicationCommandOptionType.String,
                required: true,
            }]
    },
    {
        name: "start-inning", "description": "start innings" , options: [
            {
                name: "country",
                description:
                    "select a country to play against",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "eng",
                        value: "eng",
                    },
                    {
                        name: "aus",
                        value: "aus",
                    },
                    {
                        name: "wi",
                        value: "wi",
                    },
                ],
                required: true,
            },
            {
                name: "stadium",
                description:
                    "select a stadium to play in",
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: "1",
                        value: "1",
                    },
                    {
                        name: "2",
                        value: "2",
                    },
                    {
                        name: "3",
                        value: "3",
                    },
                ],
                required: true,
            },
            {
                name: "qp_number",
                description: "Enter quick play number",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },
    {
        name: "end-inning", "description": "end your innings" , options: [
            {
                name: "run_scored",
                description: "Enter your run scored",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "number_of_overs_played",
                description: "Enter your number of overs played",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "number_of_wickets",
                description: "Enter your number of wickets",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "match_link",
                description: "Enter your matchLink",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
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
