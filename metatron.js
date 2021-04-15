require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const PREFIX = ">+";

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  bot.user.setPresence({
	 activity: {
		 name: '>+help'
	 } 
  });
});

bot.on('message', msg => {
  if (msg.content.startsWith(PREFIX)) {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase().substring(2);
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }
});