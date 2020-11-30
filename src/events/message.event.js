const Config = require("../config/config");

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

    // Si des paramètres sont passés
    if (args.length === 0) {
      return message.reply("Veuillez identifier un utilisateur et la raison.");
    }

    // Vérifie si l'utilisateur existe
    const mentionnedMember = message.mentions.members.first();
    if (!mentionnedMember) message.channel.send("Utilisateur introuvable.");

    // Envoie le message de vote
    sentMessage = await message.channel.send(
      `${message.author} souhaite ${cmd.description} à ${mentionnedMember}`
    );

    // Ajoute les options de vote
    sentMessage.react(Config.votes.emojis.pro);
    sentMessage.react(Config.votes.emojis.con);

    const filter = (reaction, user) => {
      return (
        [Config.votes.emojis.pro, Config.votes.emojis.con].includes(
          reaction.emoji.name
        ) && user.bot === false
      );
    };

    sentMessage
      .awaitReactions(filter, { time: Config.votes.time })
      .then((collected) => {
        const pros = collected.get(Config.votes.emojis.pro);
        const cons = collected.get(Config.votes.emojis.con);

        const totalPros = typeof pros !== "undefined" ? pros.count : 1;
        const totalCons = typeof cons !== "undefined" ? cons.count : 1;
        const total = totalPros + totalCons - 2;

        if (total < Config.votes.min) {
          message.reply("Il n'y a pas eu assez de votes.");
        } else {
          if (totalPros > totalCons) {
            // Execute la commande
            cmd.execute(message, args);
          } else {
            message.reply("L'action ne sera pas exécuté.");
          }
        }
      })
      .catch((err) => {
        message.reply("Une erreur s'est produite.");
        console.log(`Une erreur s'est produite ${err}`);
      });
  },
};
