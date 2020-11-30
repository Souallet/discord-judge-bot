require("dotenv").config();

module.exports = {
  prefix: process.env.DISCORD_BOT_PREFIX || "judge-",
  token: process.env.DISCORD_BOT_TOKEN,
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
