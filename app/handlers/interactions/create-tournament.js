const createTournament = (interaction) => {
  const name = interaction.options.get("name").value;
  const overs = interaction.options.get("overs").value;
  const pitchType = interaction.options.get("pitch_type").value;
  console.log(name, overs, pitchType);
  interaction.reply(
    `Tournament creating in progress , Tag all the players below e.g players @lalrishav @karthik etc`
  );
};

module.exports = { createTournament };
