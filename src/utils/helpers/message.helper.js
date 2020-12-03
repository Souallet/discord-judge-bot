const { msToTime } = require("./time.helper");

module.exports = {
  updateCountdown(embedMessage, sentMessage, timeLeft) {
    const newValue = timeLeft == 0 ? "Vote terminé" : msToTime(timeLeft);

    embedMessage.spliceFields(1, 1, {
      name: `Temps restant :`,
      value: newValue,
    });
    try {
      sentMessage.edit(embedMessage);
    } catch (e) {
      console.log(`Countdown erro : ${e}`);
    }
  },
};
