const Config = require("../config/config");

module.exports = {
  name: "messageReactionAdd",
  async execute(client, reaction, user) {
    const { name } = reaction.emoji;
    console.log("execute -> name", name);
    const { message } = reaction;
    console.log("execute -> message", message);
    const { author } = message;
    console.log("execute -> author", author);
  },
};
