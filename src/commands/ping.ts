import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import dns from 'dns'

const SlashCommand = new SlashCommandBuilder() 
    .setName("ping")
    .setDescription("Mostra a latência do BOT, do servidor da Rosie e do WebSocket!")
    // .setDescriptionLocalizations({
    //     "pt-BR": "Mostra a latência do BOT, do servidor da Rosie e do WebSocket!",
    //     "en-US": "Shows the latency of the BOT, Rosie's server and WebSocket!"
    // });

export default {
    data: SlashCommand,
    async execute(client: Client, interaction: CommandInteraction) {
        const now = await Date.now();
        const message = await interaction.reply({ content: "📡 Conectando...", fetchReply: true });
        const replyPing = await Math.abs(message.createdTimestamp - interaction.createdTimestamp);

        // Latência do servidor (FUTURO URL)
        const rosiePing = await new Promise((resolve) => {
            dns.resolve('www.google.com', (err) => {
                resolve(Math.abs(Date.now() - now));
            });
        });

        interaction.editReply(
            `📡 Latência do BOT: ${replyPing}ms\n🔨 Latência do servidor: ${rosiePing}ms\n🤖 Latência do WebSocket: ${client.ws.ping}ms`
        );
    }
}