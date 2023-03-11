import { Client } from "discord.js";
import execute from "./commandExecuter";

export default function setClientEvents(client: Client) {
    client.on("interactionCreate", (interaction) => {
        if (interaction.isChatInputCommand()) {
            execute(client, interaction);
        }
    })
}