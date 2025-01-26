import { Client, Collection, REST, Routes } from "discord.js";
import path from "path";
import * as fs from "fs";

import { env } from "./ValidEnv.js";

const rest = new REST().setToken(env.TOKEN);

export default class MyClient extends Client {
    commands: Collection<any, any>; // use correct type :)
    rawCommands: Array<JSON>;

    constructor(options: any) {
        super(options);
        this.commands = new Collection();
        this.rawCommands = [];
        // this.loadCommands();
    }
    registerCommands() {
        (async () => {
            try {
                console.log(`Started refreshing ${this.rawCommands.length} application (/) commands.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data: any = await rest.put(Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID), { body: this.rawCommands });

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
            }
        })();
    }
    async loadCommands() {
        //load commands
        const commandPath = path.join(__dirname, "../commands");
        const commandFiles = fs.readdirSync(commandPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
        console.log(commandPath);
        console.log(commandFiles);
        for (const file of commandFiles) {
            const filePath = "../commands/" + file.replace(".ts", ".js");
            const command: any = await import("../commands/" + file.replace(".ts", ".js"));
            // console.log(command);
            if ("data" in command && "execute" in command) {
                //adding all commands into client
                this.commands.set(command.data.name, command);

                //this is to register bot commands and it has to be in json
                this.rawCommands.push(command.data.toJSON());
                console.log("Added Command -> " + command.data.name);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
