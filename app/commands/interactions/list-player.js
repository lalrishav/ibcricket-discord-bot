const {GetPlayerByTournamentId} = require("../../../typescript/utility/players/players");

const listPlayers = (interaction)=>{
    try {
        const players = GetPlayerByTournamentId()
        const usernames = players.map(item => item.discordUsername);
        const userMentionsByUsername = usernames.map(username => `@${username}`).join(' ');
        interaction.reply(`Hey  ${userMentionsByUsername}, check this out!`);
    }catch (e) {
        console.log(e)
        //todo
    }
}

module.exports = { listPlayers };
