# Judge Bot

JudgeBot is a small discord bot that allows you to run administration commands if a majority of users agree.

## How does it work ?

To use this bot, a user must write a command which will be accompanied by the target user as well as the reason associated with this action. Following the request to execute a command, a vote is launched for a limited period. The majority of voters must approve the action for it to be carried out.

## Commands

The Discord Bot uses the `judge-` prefix for any commands by default; if you change your prefix remember to set an env var `DISCORD_BOT_PREFIX` with your custom prefix.

| Command           | Start vote | Arguments                 | Description                                 | Example                                                    |
| ----------------- | ---------- | ------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `add-nickname`    | ✅         | @user new-nickname reason | Add a nickname to a user for the server     | `judge-add-nickname @user unknown Because nobody know him` |
| `deafen`          | ✅         | @user reason              | Make a user deaf                            | `judge-deafen @user He must not hear the following`        |
| `disconnect`      | ✅         | @user reason              | Disconnect a user from the vocal channel    | `judge-disconnect @user He is to much toxic`               |
| `help`            | ❌         | None reason               | Print help info and command usage           | `judge-help`                                               |
| `mute`            | ✅         | @user reason              | Make a user mute                            | `judge-mute @user He talk to much`                         |
| `remove-nickname` | ✅         | @user reason              | Remove the nickname of a user on the server | `judge-remove-nickname @user He introduced himself`        |
| `undeafen`        | ✅         | @user reason              | Restores hearing to a user                  | `judge-undeafen @user He need to listen that`              |
| `unmute`          | ✅         | @user reason              | Restores voice to a user                    | `judge-unmute @user We should to communicate with him`     |

## Getting started

### Installation

```shell
git clone https://github.com/Souallet/discord-judge-bot
cd discord-judge-bot/
npm i
```

### Configuration

#### Environment variables

##### Required

`DISCORD_BOT_TOKEN` : The Bot Token used by the bot to authenticate with Discord.

##### Optionnal

`DISCORD_BOT_PREFIX` : Prefix associated with the bot with which the commands should be started.

#### Config.js

It is possible to customize the bot by modifying the file : `~/src/config/config.js`.
The file have the following structure.

```js
{
  "prefix": process.env.DISCORD_BOT_PREFIX || "judge-",
  "token": process.env.DISCORD_BOT_TOKEN,
  "client": {
    "color": "#0099ff",
    "image": "src/assets/images/judge.png",
    "url": ""
  },
  "commands": {
    "blacklist": ["ban", "unban", "kick"]
  },
  "votes": {
    "min": 1,
    "duration": 60000,
    "emojis": {
      "pro": "👍",
      "con": "👎"
    }
  },
  "judgement": {
    "image": "src/assets/images/judge_gavel.png"
  },
  "help": {
    "image": "src/assets/images/help.png"
  }
}
```

## Licensing

The code in this project is licensed under MIT license.
