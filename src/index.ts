import { Emoji, Events, Message } from "discord.js";
import * as bot from "./client";
import {
  onGuildCreate,
  onInteraction,
  onMessage,
  onNewMember,
  ready,
} from "./controllers/eventController.js";
import * as db from "./utils/Connection.js";
import OpenAI from "openai";

const client = bot.getClient();

db.connect();
bot.connect();

//event
client.once(Events.ClientReady, ready);

client.on(Events.GuildCreate, onGuildCreate);

client.on(Events.InteractionCreate, onInteraction);

client.on(Events.GuildMemberAdd, onNewMember);

client.on(Events.MessageCreate, onMessage);
