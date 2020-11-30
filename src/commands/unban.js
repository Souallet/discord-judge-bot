module.exports = {
  name: "unban",
  description: "Supprime un utilisateur de la liste des bannis !",
  execute(message, args) {
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
