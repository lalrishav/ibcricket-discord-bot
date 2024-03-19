import { Client, Intents, MessageActionRow, MessageSelectMenu } from 'discord.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', async message => {
    console.log(message.content);
    if (message.content === 'abc') {
        const selectMenu = new MessageSelectMenu()
            .setCustomId('dropdown')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Option 1',
                    description: 'This is option 1',
                    value: 'option1',
                },
                {
                    label: 'Option 2',
                    description: 'This is option 2',
                    value: 'option2',
                },
                {
                    label: 'Option 3',
                    description: 'This is option 3',
                    value: 'option3',
                },
            ]);

        const row = new MessageActionRow().addComponents(selectMenu);

        await message.reply({ content: 'Please select an option:', components: [row] });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    await interaction.deferUpdate();

    const selectedOption = interaction.values[0];

    switch (selectedOption) {
        case 'option1':
            await interaction.followUp('You selected option 1');
            break;
        case 'option2':
            await interaction.followUp('You selected option 2');
            break;
        case 'option3':
            await interaction.followUp('You selected option 3');
            break;
        default:
            await interaction.followUp('Invalid option selected');
    }
});

client.login(
    "MTIxOTQyNzY0NjIxMjE0NTIwNA.GrWqWn.cF2qrGFYAT-8x7AfMgGH1vXZ04KuNHZ07q0-cU"
  );