const {
  InitiateTournament,
} = require("../../../typescript/utility/tournament/tournament");

const createTournament = (interaction) => {
  const name = interaction.options.get("name").value;
  const overs = interaction.options.get("overs").value;
  const pitchType = interaction.options.get("pitch_type").value;
  try {
    const tournamentId = InitiateTournament(name, overs, pitchType);
    interaction.reply(
        `Your tournament id is - ${tournamentId}, type add-player and  tag all the players of the tournament`)
  }catch (e){
    console.log(e);
  }
};

module.exports = { createTournament };
