require("dotenv").config();

module.exports = {
  prefix: process.env.DISCORD_BOT_PREFIX || "judge-",
  token: process.env.DISCORD_BOT_TOKEN,
  client: {
    color: "#0099ff",
    image:
      "https://e7.pngegg.com/pngimages/105/137/png-clipart-graphics-judge-illustration-cartoon-judge-hand-cartoon-thumbnail.png",
    url: "",
  },
  commands: {
    blacklist: ["ban", "unban", "kick"],
  },
  votes: {
    min: 3,
    time: 60000,
    emojis: {
      pro: "👍",
      con: "👎",
    },
  },
};
