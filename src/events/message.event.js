const Config = require("../config/config");

module.exports = {
  name: "message",
  async execute(client, message) {
    console.log("execute -> Config.prefix", Config);
    console.log("execute -> message.content", message.content);
    // Prévenir des message de bots
    if (message.author.bot === true) return;
    // Message contenant le préfix
    if (!message.content.startsWith(Config.prefix)) return;
    // Commande invoquée aves ses arguments
    const [COMMAND, ...args] = message.content
      .trim()
      .substring(Config.prefix.length)
      .split(/\s+/);

    console.log(COMMAND);
    console.log(client.commands);
    // Si des paramètres sont passés
    if (args.length === 0) {
      return message.reply("Veuillez identifier un utilisateur et la raison.");
    }
    // Vérifie si l'utilisateur existe
    const mentionnedMember = message.mentions.members.first();
    if (!mentionnedMember) message.channel.send("Utilisateur introuvable.");

    // switch (COMMAND) {
    //   case "kick":
    //     // if (!mentionnedMember.kickable)
    //     //   return message.channel.send(`Je n'ai pas le droit d'exclure.`);
    //     // mentionnedMember
    //     //   .kick("La communauté ta exclue.")
    //     //   .then((mentionnedMember) =>
    //     //     message.channel.send(`${mentionnedMember} a été expulsé.`)
    //     //   )
    //     //   .catch((err) =>
    //     //     message.channel.send("Je n'ai pas réussi à exclure l'utilisateur.")
    //     //   );
    //     // message.channel.send(`On l'exclut du serveur.`);
    //     break;
    //   case "ban":
    //     // if (!mentionnedMember.bannable)
    //     //   return message.channel.send(`Je n'ai pas le droit de le ban.`);
    //     // mentionnedMember
    //     //   .ban("La communauté t'a bannie.")
    //     //   .then((mentionnedMember) =>
    //     //     message.channel.send(`${mentionnedMember} a été banni.`)
    //     //   )
    //     //   .catch((err) =>
    //     //     message.channel.send("Je n'ai pas réussi à bannier l'utilisateur.")
    //     //   );
    //     break;
    //   case "unban":
    //     // // Check s'il est dans la liste des bans
    //     // if (!mentionnedMember.bannable)
    //     //   return message.channel.send(`Je n'ai pas le droit de le ban.`);
    //     // mentionnedMember
    //     //   .ban("La communauté t'a bannie.")
    //     //   .then((mentionnedMember) =>
    //     //     message.channel.send(`${mentionnedMember} a été banni.`)
    //     //   )
    //     //   .catch((err) =>
    //     //     message.channel.send("Je n'ai pas réussi à bannier l'utilisateur.")
    //     //   );
    //     break;
    //   case "mute":
    //     // mentionnedMember.voice
    //     //   .setMute(true, "La communauté t'a rendue muet.")
    //     //   .then((mentionnedMember) =>
    //     //     message.channel.send(`${mentionnedMember} a été rendu muet.`)
    //     //   )
    //     //   .catch((err) =>
    //     //     message.channel.send(
    //     //       "Il m'est impossible de rendre muet cet utilisateur."
    //     //     )
    //     //   );
    //     break;
    //   case "unmute":
    //     // mentionnedMember.voice
    //     //   .setMute(true, "La communauté t'a rendue la parole.")
    //     //   .then((mentionnedMember) =>
    //     //     message.channel.send(`${mentionnedMember} a retouvé la parole.`)
    //     //   )
    //     //   .catch((err) =>
    //     //     message.channel.send(
    //     //       "Il m'est impossible de rendre la parole à cet utilisateur."
    //     //     )
    //     //   );
    //     break;
    //   case "deafen":
    //     // mentionnedMember.voice
    //     //   .setDeaf(true, "La communauté t'a rendue sourd.")
    //     //   .then((mentionnedMember) =>
    //     //     message.channel.send(`${mentionnedMember} a été rendu sourd.`)
    //     //   )
    //     //   .catch((err) =>
    //     //     message.channel.send(
    //     //       "Il m'est impossible de rendre sourd cet utilisateur."
    //     //     )
    //     //   );
    //     break;
    //   case "undeafen":
    //     // mentionnedMember.voice
    //     //   .setDeaf(false, "La communauté t'a rendue l'ouïe.")
    //     //   .then((mentionnedMember) =>
    //     //     message.channel.send(`${mentionnedMember} a retrouvé l'ouïe.`)
    //     //   )
    //     //   .catch((err) =>
    //     //     message.channel.send(
    //     //       "Il m'est impossible de rendre sourd cet utilisateur."
    //     //     )
    //     //   );
    //     break;
    //   case "rename":
    //     const newNickname = args[1];
    //     mentionnedMember
    //       .setNickname(newNickname, "La communauté t'a renommé.")
    //       .then((member) =>
    //         message.channel.send(
    //           `${member.user.username} est devenu ${newNickname}.`
    //         )
    //       )
    //       .catch((err) =>
    //         message.channel.send(
    //           "Il m'est impossible de renommer cet utilisateur."
    //         )
    //       );
    //     break;
    //   case "remove-nickname":
    //     mentionnedMember
    //       .setNickname("", "La communauté t'a enlevé ton surnom.")
    //       .then((member) =>
    //         message.channel.send(
    //           `${member.user.username} a retrouver son surnom original.`
    //         )
    //       )
    //       .catch((err) =>
    //         message.channel.send(
    //           "Il m'est impossible de renommer cet utilisateur."
    //         )
    //       );
    //     break;
    //   default:
    //     message.channel.send("Apprend mes commandes et reviens me voir.");
    //     break;
    // }
  },
};
