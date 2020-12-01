module.exports = {
  name: "unmute",
  description: "Rend la parole à un utilisateur !",
  message($askingUsername, $targetUsername) {
    return `${$askingUsername} souhaite rendre la parole à ${$targetUsername}.`;
  },
  execute(client, message, args) {
    const mentionnedMember = message.mentions.members.first();

    mentionnedMember.voice
      .setMute(false, "La communauté t'a rendue la parole.")
      .then((mentionnedMember) =>
        message.channel.send(`${mentionnedMember} a retouvé la parole.`)
      )
      .catch((err) =>
        message.channel.send(
          "Il m'est impossible de rendre la parole à cet utilisateur."
        )
      );
  },
};
