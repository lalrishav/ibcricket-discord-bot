const { User } = require("discord.js");
const {
  AddPlayer,
} = require("../../../typescript/utility/tournament/tournament");

const addPlayer = (message) => {
  const players = Object.values(
    JSON.parse(JSON.stringify(message.mentions.users))
  );
  AddPlayer("1", players);
};

module.exports = { addPlayer };
