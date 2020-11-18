require("dotenv").config();

module.exports = {
  prefix: process.env.DISCORD_BOT_PREFIX || "judge-",
  token: process.env.DISCORD_BOT_TOKEN,
};
