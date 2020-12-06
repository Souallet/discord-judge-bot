const Discord = require("discord.js");
const Config = require("../config/config");
const { msToTime } = require("../utils/helpers/time.helper");
const { updateCountdown } = require("../utils/helpers/message.helper");
module.exports = {
  name: "message",
  async execute(client, message) {
    // Prévenir des message de bots
    if (message.author.bot === true) return;

    // Message contenant le préfix
    if (!message.content.startsWith(Config.prefix)) return;

    // Commande invoquée aves ses arguments
    const [COMMAND, ...args] = message.content
      .trim()
      .substring(Config.prefix.length)
      .split(/\s+/);

    // Vérifie si la commande existe
    const cmd = client.commands.get(COMMAND);
    if (!cmd) message.channel.send("Commande introuvable.");

    // Si on demande l'aide
    if (cmd.name == "help") return cmd.execute(client, message, args);

    // Si des paramètres sont passés
    if (args.length === 0) {
      return message.reply("Veuillez identifier un utilisateur et la raison.");
    }

    // Vérifie si l'utilisateur existe
    const mentionnedMember = message.mentions.members.first();
    if (!mentionnedMember) message.channel.send("Utilisateur introuvable.");

    // Récupère la raison
    const reason =
      args.slice(1).join(" ").concat(".") || "Indisponible pour le moment.";

    // Image locales jointes
    let attachments = [];
    attachments.push(
      new Discord.MessageAttachment(Config.client.image, "judge.png"),
      new Discord.MessageAttachment(Config.judgement.image, "judge_gavel.png")
    );

    // Vote de message embeded
    const voteMessage = new Discord.MessageEmbed()
      .setColor(Config.client.color)
      .setTitle(`Un jugement à été demandé.`)
      .attachFiles(attachments)
      .setAuthor("Judge Bot", "attachment://judge.png")
      .setDescription(`Description de la commande : ${cmd.description}`)
      .addFields(
        {
          name: cmd.message(
            message.author.username,
            mentionnedMember.user.username,
            args
          ),
          value: `Raison : ${reason}`,
        },
        {
          name: `Temps restant :`,
          value: msToTime(Config.votes.duration),
        },
        {
          name: `(${Config.votes.emojis.pro}) À voté pour :`,
          value: "Personne n'a voté pour.",
          inline: true,
        },
        {
          name: `(${Config.votes.emojis.con}) À voté contre :`,
          value: "Personne n'a voté contre.",
          inline: true,
        }
      )
      .setThumbnail("attachment://judge_gavel.png")
      .setTimestamp();

    // Envoie le message de vote
    sentMessage = await message.channel.send(voteMessage);

    // Ajoute les options de vote
    sentMessage.react(Config.votes.emojis.pro);
    sentMessage.react(Config.votes.emojis.con);

    let timeLeft = Config.votes.duration;

    updateCountdown(voteMessage, sentMessage, timeLeft);
    let countdown = setInterval(() => {
      timeLeft -= 1000;
      updateCountdown(voteMessage, sentMessage, timeLeft);
      if (timeLeft == 0) clearInterval(countdown);
    }, 1000);

    const filter = (reaction, user) => {
      return (
        [Config.votes.emojis.pro, Config.votes.emojis.con].includes(
          reaction.emoji.name
        ) && user.bot === false
      );
    };

    const collector = sentMessage.createReactionCollector(filter, {
      dispose: true,
      time: Config.votes.duration,
    });

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === Config.votes.emojis.pro) {
        let embedProField = Object.assign({}, voteMessage.fields[2]);
        if (reaction.count - 1 == 1) {
          embedProField.value = user.username;
        } else {
          embedProField.value += `, ${user.username}`;
        }
        voteMessage.spliceFields(2, 1, embedProField);
      } else {
        let embedConField = Object.assign({}, voteMessage.fields[3]);
        if (reaction.count - 1 == 1) {
          embedConField.value = user.username;
        } else {
          embedConField.value += `, ${user.username}`;
        }
        voteMessage.spliceFields(3, 1, embedConField);
      }
      sentMessage.edit(voteMessage);
    });

    collector.on("remove", (reaction, user) => {
      if (reaction.emoji.name === Config.votes.emojis.pro) {
        let embedProField = Object.assign({}, voteMessage.fields[2]);
        if (reaction.count == 1) {
          embedProField.value = "Personne n'a voté pour.";
        } else {
          embedProField.value = embedProField.value
            .split(", ")
            .filter((v) => v != user.username)
            .join(", ");
        }
        voteMessage.spliceFields(2, 1, embedProField);
      } else {
        let embedConField = Object.assign({}, voteMessage.fields[3]);
        if (reaction.count == 1) {
          embedConField.value = "Personne n'a voté contre.";
        } else {
          embedConField.value = embedConField.value
            .split(", ")
            .filter((v) => v != user.username)
            .join(", ");
        }
        voteMessage.spliceFields(3, 1, embedConField);
      }
      sentMessage.edit(voteMessage);
    });

    collector.on("end", (collected) => {
      if (collected.size < Config.votes.min) {
        message.reply("Il n'y a pas eu assez de votes.");
      } else {
        const pros = collected.get(Config.votes.emojis.pro);
        const cons = collected.get(Config.votes.emojis.con);
        const totalPros = typeof pros !== "undefined" ? pros.count : 1;
        const totalCons = typeof cons !== "undefined" ? cons.count : 1;

        if (totalPros > totalCons) {
          cmd.execute(client, message, args);
        } else {
          message.reply(
            "L'action ne sera pas exécutée, trop d'utilisateurs sont contre."
          );
        }
      }
    });
  },
};
