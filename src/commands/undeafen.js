module.exports = {
  name: "undeafen",
  description: "Rend l'ouïe à un utilisateur !",
  message($askingUsername, $targetUsername) {
    return `${$askingUsername} souhaite rendre l'ouïe à ${$targetUsername}.`;
  },
  execute(client, message, args) {
    const mentionnedMember = message.mentions.members.first();

    mentionnedMember.voice
      .setDeaf(false, "La communauté t'a rendue l'ouïe.")
      .then((mentionnedMember) =>
        message.channel.send(`${mentionnedMember} a retrouvé l'ouïe.`)
      )
      .catch((err) =>
        message.channel.send(
          "Il m'est impossible de rendre sourd cet utilisateur."
        )
      );
  },
};
