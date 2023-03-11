import { ChatInputCommandInteraction, Client } from "discord.js";
import { join } from 'path';
import config from "../config";
import { commands } from "./commandsManager";

var usersInCooldown = [];

setInterval(() => usersInCooldown = [], 3000);

export default async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    if (!commands.find((i) => i.name == interaction.commandName)) {
        interaction.reply("Este comando não existe mais ou está inativo. Desculpe a inconveniência.");
        return;
    }

    if (usersInCooldown.includes(interaction.user.id)) {
        interaction.reply("Espere alguns segundos antes de executar outro comando.");
        return;
    }

    const command = await import(join(__dirname, `../commands/${interaction.commandName}.js`));
    command.default.execute(client, interaction);

    if (interaction.user.id != config.owenerId && !config.administrators.includes(interaction.user.id)) {
        usersInCooldown.push(interaction.user.id);
    }
}