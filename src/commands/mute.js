module.exports = {
  name: "mute",
  description: "Rend une personne muette !",
  execute(message, args) {
    const mentionnedMember = message.mentions.members.first();

    mentionnedMember.voice
      .setMute(true, "La communauté t'a rendue muet.")
      .then((mentionnedMember) =>
        message.channel.send(`${mentionnedMember} a été rendu muet.`)
      )
      .catch((err) =>
        message.channel.send(
          "Il m'est impossible de rendre muet cet utilisateur."
        )
      );
  },
};
