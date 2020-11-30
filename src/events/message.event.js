const Config = require("../config/config");

module.exports = {
  name: "message",
  async execute(client, message) {
    // Prévenir des message de bots
    if (message.author.bot === true) return;
    console.log("execute -> message.author", message.author);

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
    console.log("execute -> mentionnedMember", mentionnedMember);

    // Envoie le message de vote
    sentMessage = await message.channel.send(
      `${message.author} souhaite ${cmd.description} à ${mentionnedMember}`
    );

    // Ajoute les options de vote
    sentMessage.react("👍");
    sentMessage.react("👎");

    // Execute la commande
    // cmd.execute(message, args);
  },
};
