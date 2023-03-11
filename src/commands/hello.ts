import { SlashCommandBuilder } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say hello'),

    async execute(client, interaction) {
        await interaction.reply("hello");
    }
}