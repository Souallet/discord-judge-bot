const { readdirSync } = require("fs");
const Config = require("../config/config");

module.exports = (client) => {
  // Getting all command files
  const commandFiles = readdirSync("./src/commands").filter((file) =>
    file.endsWith(".js")
  );

  commandFiles.forEach((file) => {
    // Import command
    const cmd = require(`../commands/${file}`);

    // Validate command
    if (!cmd.execute)
      throw new TypeError(
        `[ERROR][COMMANDS]: execute function is required for commands! (${file})`
      );

    if (!cmd.name)
      throw new TypeError(
        `[ERROR][COMMANDS]: name is required for commands! (${file})`
      );

    if (cmd.name.trim() === "")
      throw new TypeError(`[ERROR][COMMANDS]: name cannot be empty! (${file})`);

    // Check if command is blacklisted
    if (Config.commands.blacklist.includes(cmd.name)) {
      console.warn(`[WARNING][COMMANDS]: Command: ${cmd.name} is blacklisted.`);
      return; // Continue to the next iteration
    }

    // if (!cmd.category)
    //   console.warn(
    //     `[WARNING][COMMANDS]: Command: ${cmd.name} will not be shown in the help command because no category is set.`
    //   );

    // Set command to client
    client.commands.set(cmd.name, cmd);
  });
};
