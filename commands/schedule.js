const { MessageEmbed } = require("discord.js");
const { getTournamentSchedule } = require("../typescript/utility/getTournamentProgress")
const tournament = require("../mocks/tournament.json")
var table = require('text-table');

const handleSchedule = (message)=>{
    console.log("handling schedule")
    const tournamentData = getTournamentSchedule(tournament)
    const tableTitle = "User Information";
    const tableData = [
        ["Player 1", "Player 2", "Status"],
    ]
    tournamentData.forEach((data)=>{
        tableData.push([
            data.firstPlayer, data.secondPlayer, data.status
        ])
    })

    let formattedTable = "```\n";
    formattedTable += tableTitle + "\n\n";

    for (let i = 0; i < tournamentData.length; i++) {
        formattedTable += tournamentData[i].join("\t") + "\n";
    }

    formattedTable += "```";

    message.channel.send(table(tableData));
}

