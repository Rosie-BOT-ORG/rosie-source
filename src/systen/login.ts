import type { Client } from 'discord.js'

const TOKEN = process.env.TOKEN || "Nzg3MDgxMjkxMjI5MTY3NjI2.GTfh5k.CuoLubuiFlAoCXfgjgascr-iceOEuTWmBFxxdY";

export default async function login(client: Client) {
    try {
        client.login(TOKEN);
    } catch (err) {
        throw err;
    }
}