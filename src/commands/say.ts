import { ChatInputCommandInteraction, Client, PermissionsBitField, SlashCommandBuilder } from 'discord.js'
const SlashCommand = new SlashCommandBuilder() 
    .setName("say")

    .setDescription("A Rosie repete o que foi dito no comando.")

    // .setDescriptionLocalizations({
    //     "pt-BR": "A Rosie repete o que foi dito no comando.",
    //     "en-US": "Rosie repeats what was said in command."
    // })

    .addStringOption(option => 
        option.setName("frase")
        .setDescription("A frase que será repetida pelo BOT.")
        .setRequired(true)
        .setMaxLength(50)
    );

export default {
    data: SlashCommand,
    async execute(client: Client, interaction: ChatInputCommandInteraction) {
        let message = interaction.options.get("frase").value.toString();

        const permissions = interaction.member.permissions as PermissionsBitField;
        const canMentionate = permissions.has("MentionEveryone") || permissions.has("Administrator");

        if ((message.includes("@everyone") || message.includes("@here")) && !canMentionate) {
            message = message.replace("@everyone", "(menção inválida)");
            message = message.replace("@here", "(menção inválida)");
        }

        interaction.reply(message);
    }
}