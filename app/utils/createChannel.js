const discord = require("discord.js");

const createChannel = async (client, name)=>{
    console.log(process.env.GUILD_ID)
    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (!guild) return console.error('Guild not found.');

    try {
        // Create the channel
        const channel = await guild.channels.create({
            name: name,
            type: discord.ChannelType.GuildText,
            topic: 'This is a new text channel!', // Optional: Set the channel topic
            reason: 'Needed a new channel.', // Optional: Specify the reason for creating the channel
        });
        console.log('Channel created:', channel);
        return channel
    } catch (error) {
        throw new Error("something went wrong")
    }
}

module.exports = {createChannel}