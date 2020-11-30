module.exports = {
  name: "add-nickname",
  description: "Attribut un surnom à un utilisateur !",
  execute(message, args) {
    const mentionnedMember = message.mentions.members.first();
    const newNickname = args[1];

    mentionnedMember
      .setNickname(newNickname, "La communauté t'a renommé.")
      .then((member) =>
        message.channel.send(
          `${member.user.username} est devenu ${newNickname}.`
        )
      )
      .catch((err) =>
        message.channel.send("Il m'est impossible de renommer cet utilisateur.")
      );
  },
};
