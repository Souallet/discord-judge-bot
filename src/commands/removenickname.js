module.exports = {
  name: "remove-nickname",
  description: "Supprime le surnom attribué à un utilisateur !",
  message($askingUsername, $targetUsername) {
    return `${$askingUsername} souhaite enlever le surnom de ${$targetUsername}.`;
  },
  execute(client, message, args) {
    const mentionnedMember = message.mentions.members.first();
    mentionnedMember
      .setNickname("", "La communauté t'a enlevé ton surnom.")
      .then((member) =>
        message.channel.send(
          `${member.user.username} a retrouver son surnom original.`
        )
      )
      .catch((err) =>
        message.channel.send("Il m'est impossible de renommer cet utilisateur.")
      );
  },
};
