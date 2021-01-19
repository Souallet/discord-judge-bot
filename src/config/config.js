require("dotenv").config();

module.exports = {
  prefix: process.env.DISCORD_BOT_PREFIX || "judge-",
  token: process.env.DISCORD_BOT_TOKEN,
  client: {
    color: "#0099ff",
    image: "src/assets/images/judge.png",
    url: "",
  },
  commands: {
    blacklist: ["ban", "unban", "kick"],
  },
  votes: {
    min: process.env.MIN_VOTE_NUM || 5,
    duration: 60000,
    emojis: {
      pro: "👍",
      con: "👎",
    },
  },
  judgement: {
    image: "src/assets/images/judge_gavel.png",
  },
  help: {
    image: "src/assets/images/help.png",
  },
};
