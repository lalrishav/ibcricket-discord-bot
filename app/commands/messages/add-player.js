const { User } = require("discord.js");
const {AddPlayer} = require("../../../typescript/utility/players/players");


const addPlayer = (message) => {
  if (message.mentions.users.size === 0){
    message.channel.send(
        "You need to tag user as well e.g- add-players @lalrishav @ibcricket-bot"
    );
    return
  }
  const players = Object.values(
    JSON.parse(JSON.stringify(message.mentions.users))
  );
  try {
    AddPlayer("1", players);
    message.channel.send(
        "Added all the mentioned player to the tournament, You can still add and remove users until tournament starts "
    );
  }catch (error) {
    //todo
  }
};

module.exports = { addPlayer };
