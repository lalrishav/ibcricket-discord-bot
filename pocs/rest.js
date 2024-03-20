import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const clientId = '1219427646212145204';
const guildId = 'Your_Guild_ID'; // Optional, if you want to register the command in a specific guild

const commands = [
    {
        name: 'abc',
        description: 'Description of your command',
    },
];

const rest = new REST({ version: '9' }).setToken('MTIxOTQyNzY0NjIxMjE0NTIwNA.GrWqWn.cF2qrGFYAT-8x7AfMgGH1vXZ04KuNHZ07q0-cU');

(async () => {
    try {
            console.log('Started refreshing application (/) utils globally.');
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
        

        console.log('Successfully registered application (/) utils.');
    } catch (error) {
        console.error(error);
    }
})();
