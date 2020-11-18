const fs = require("fs");

const loadCommands = require("./utils/loadCommands.util");
const loadEvents = require("./utils/loadEvents.util");

const Config = require("./config/config");

const { Client, Collection } = require("discord.js");

const client = new Client();
client.commands = new Collection();

client.once("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

loadCommands(client);
loadEvents(client);

// Login client to the server
client.login(Config.token);
