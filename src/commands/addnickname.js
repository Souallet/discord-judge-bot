module.exports = {
  name: "add-nickname",
  args: "@{nom d'utilisateur} {raison du vote}",
  description: "Attribut un surnom à un utilisateur !",
  message($askingUsername, $targetUsername, args) {
    return `${$askingUsername} souhaite renommer ${$targetUsername} en "${args[1]}".`;
  },
  execute(client, message, args) {
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
