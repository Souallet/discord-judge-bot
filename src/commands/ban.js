module.exports = {
  name: "ban",
  args: "@{nom d'utilisateur} {raison du vote}",
  description: "Bannie un utilisateur du serveur !",
  message($askingUsername, $targetUsername) {
    return `${$askingUsername} souhaite bannir ${$targetUsername}.`;
  },
  execute(client, message, args) {
    const mentionnedMember = message.mentions.members.first();

    if (!mentionnedMember.bannable)
      return message.channel.send(`Je n'ai pas le droit de le ban.`);
    mentionnedMember
      .ban("La communauté t'a bannie.")
      .then((mentionnedMember) =>
        message.channel.send(`${mentionnedMember} a été banni.`)
      )
      .catch((err) =>
        message.channel.send("Je n'ai pas réussi à bannier l'utilisateur.")
      );
  },
};
