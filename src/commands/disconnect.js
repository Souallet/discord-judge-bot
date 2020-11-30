module.exports = {
  name: "disconnect",
  description: "Déconnecte une personne du channel vocal !",
  execute(message, args) {
    const mentionnedMember = message.mentions.members.first();

    mentionnedMember.voice
      .kick("La communauté t'a déconnecté.")
      .then((mentionnedMember) =>
        message.channel.send(`${mentionnedMember} a été déconnecté.`)
      )
      .catch((err) =>
        message.channel.send(
          "Il m'est impossible de déconnecter cet utilisateur."
        )
      );
  },
};
