import { Client, GatewayIntentBits } from "discord.js";
import updateClientCommands from "./systen/commandsManager";
import setClientEvents from "./systen/events";
import server from "./systen/server";
import login from "./systen/login";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

async function main() {
    client.on('ready', () => {
        updateClientCommands(client);
        setClientEvents(client);
        
        console.log("BOT online.");
    });

    await server();
    login(client);
}

main();