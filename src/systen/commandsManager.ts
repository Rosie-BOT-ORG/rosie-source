import { Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import config from '../config';

const CLIENT_ID = config.CLIENT_ID;
const TOKEN = config.TOKEN

export const commands = [];
const rest = new REST({ version: '10' }).setToken(TOKEN);

export const postCommands = async () => {
    try {
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
    } catch (err) {
        throw err;
    }
}

export const removeCommand = async (command) => {
    try {
        await rest.delete(
            Routes.applicationCommand(CLIENT_ID, command.id)
        );
    } catch (err) {
        throw err;
    }
}

export default async function updateClientCommands(client: Client) {
    const commandsPath = join(__dirname, '../commands');
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const command = await import(join(__dirname, `../commands/${commandFile}`));
        commands.push(command.default.data);
    }

    await client.application.commands.cache.forEach((command) => {
        if (!commands.find((i) => i.name == command.name)) {
            removeCommand(command);
        }
    });
    
    postCommands();
}