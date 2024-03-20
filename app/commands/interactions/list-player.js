const {GetPlayerByTournamentId} = require("../../../typescript/utility/players/players");

const listPlayers = (interaction)=>{
    try {
        const players = GetPlayerByTournamentId()
        const usernames = players.map(item => item.discordId);
        const userMentionsByUsername = usernames.map(username => `<@${username}>`).join(' ');
        interaction.reply(`Player list:   ${userMentionsByUsername}`);
    }catch (e) {
        console.log(e)
        //todo
    }
}

module.exports = { listPlayers };
