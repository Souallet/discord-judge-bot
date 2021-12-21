const { MessageEmbed, MessageAttachment } = require("discord.js");
const { msToTime } = require("..//utils/helpers/time.helper");
const Config = require("../config/config");

module.exports = {
  name: "config",
  args: "",
  description: "Affiche la configuration du bot.",
  execute(client, message, args) {
    let attachments = [];
    attachments.push(new MessageAttachment(Config.client.image, "judge.png"));

    const messageEmbed = new MessageEmbed()
      .setColor(Config.client.color)
      .setTitle(`Configuration du bot`)
      .attachFiles(attachments)
      .setAuthor("Judge Bot", "attachment://judge.png", Config.client.url)
      .setDescription("Paramétrage relatif au vote.")
      .addFields({
        name: `Nombre de vote minimum : `,
        value: Config.votes.min,
        inline: false,
      })
      .addFields({
        name: `Durée du vote : `,
        value: msToTime(Config.votes.duration),
        inline: false,
      })
      .addFields({
        name: `Emoji vote pour : `,
        value: Config.votes.emojis.pro,
        inline: false,
      })
      .addFields({
        name: `Emoji vote contre : `,
        value: Config.votes.emojis.con,
        inline: false,
      });

    return message.reply(messageEmbed);
  },
};
