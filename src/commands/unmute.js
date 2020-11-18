module.exports = {
  name: "unmute",
  description: "Rend la parole à un utilisateur !",
  execute(message, args) {
    message.channel.send("Pong.");
  },
};
