module.exports = {
  name: "kick",
  description: "Exclus une personne du serveur !",
  execute(message, args) {
    const mentionnedMember = message.mentions.members.first();

    if (!mentionnedMember.kickable)
      return message.channel.send(`Je n'ai pas le droit d'exclure.`);

    mentionnedMember
      .kick("La communauté ta exclue.")
      .then((mentionnedMember) =>
        message.channel.send(`${mentionnedMember} a été expulsé.`)
      )
      .catch((err) =>
        message.channel.send("Je n'ai pas réussi à exclure l'utilisateur.")
      );
    message.channel.send(`On l'exclut du serveur.`);
  },
};
