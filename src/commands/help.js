const Discord = require("discord.js");
const Config = require("../config/config");

module.exports = {
  name: "help",
  args: "",
  description: "Liste les commandes utilisables.",
  execute(client, message, args) {
    let attachments = [];
    attachments.push(
      new Discord.MessageAttachment(Config.client.image, "judge.png"),
      new Discord.MessageAttachment(Config.help.image, "help.png")
    );

    const messageEmbed = new Discord.MessageEmbed()
      .setColor(Config.client.color)
      .setTitle(`Liste des commandes`)
      .attachFiles(attachments)
      .setAuthor("Judge Bot", "attachment://judge.png", Config.client.url)
      .setDescription("Liste des commandes disponibles au vote.")
      .setThumbnail("attachment://help.png")
      .setTimestamp()
      .setFooter(`Demandé par : ${message.author.username}`);

    client.commands.forEach((command) => {
      messageEmbed.addFields({
        name: `${command.name} ${command.args}`,
        value: command.description,
        inline: false,
      });
    });

    return message.reply(messageEmbed);
  },
};
