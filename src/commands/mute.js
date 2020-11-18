module.exports = {
  name: "mute",
  description: "Rend une personne muette !",
  execute(message, args) {
    message.channel.send("Pong.");
  },
};
