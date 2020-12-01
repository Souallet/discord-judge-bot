const Discord = require("discord.js");
const Config = require("../config/config");

module.exports = {
  name: "help",
  description: "Liste les commandes utilisables.",
  execute(client, message, args) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(Config.client.color)
      .setTitle(`Liste des commandes`)
      .setAuthor("Judge Bot", Config.client.image, Config.client.url)
      .setDescription("Liste des commandes disponibles au vote.")
      .setThumbnail(Config.client.image)
      .setTimestamp()
      .setFooter(`Demandé par : ${message.author.username}`);

    client.commands.forEach((command) => {
      messageEmbed.addFields({
        name: command.name,
        value: command.description,
        inline: false,
      });
    });

    return message.reply(messageEmbed);
  },
};
