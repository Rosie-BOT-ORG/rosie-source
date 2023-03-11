import type { Client } from 'discord.js';
import config from '../config';

const TOKEN = config.TOKEN;

export default async function login(client: Client) {
    try {
        client.login(TOKEN);
    } catch (err) {
        throw err;
    }
}