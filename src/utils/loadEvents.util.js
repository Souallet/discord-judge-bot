const { readdirSync } = require("fs");

module.exports = (client) => {
  // Getting all event files
  const eventFiles = readdirSync("./src/events/").filter((file) =>
    file.endsWith(".js")
  );

  eventFiles.forEach((file) => {
    // Import event
    const event = require(`../events/${file}`);

    console.log("event", event);

    // Validate event
    if (!event.execute)
      throw new TypeError(
        `[ERROR]: execute function is required for events! (${file})`
      );

    if (!event.name)
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);

    client.on(event.name, event.execute.bind(null, client));
  });
};
