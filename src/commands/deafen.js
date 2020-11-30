module.exports = {
  name: "deafen",
  description: "Rend une personne sourde !",
  execute(message, args) {
    const mentionnedMember = message.mentions.members.first();

    mentionnedMember.voice
      .setDeaf(true, "La communauté t'a rendue sourd.")
      .then((mentionnedMember) =>
        message.channel.send(`${mentionnedMember} a été rendu sourd.`)
      )
      .catch((err) =>
        message.channel.send(
          "Il m'est impossible de rendre sourd cet utilisateur."
        )
      );
  },
};
