//INITIALIZATION OF PACKAGES
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const { prefix } = require("./config.json");
const Discord = require("discord.js");
const client = new Client({
  disableEveryone: true
});

//PATH INITIALIZATION PACKAGE
const fs = require("fs")

//HANDLER VARIABLES
client.commands = new Collection();
client.aliases = new Collection();

//HANDLER PATH INITIALIZATION
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//STARTING THE BOT
client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);
  
//BOT PLAYING PRESENCE
client.user.setActivity("YOUR STATUS HERE");
});

//MESSAGE EVENT
client.on("message", async message => {
  //BOT DOES'NT RESPOND TO OTHER BOTS
  if (message.author.bot) return;
  //BOT DOES'T REPLY TO DMS
  if (!message.guild) return;
  //IF THE MESSAGE DOESNT START WITH PREFIX IT DOESNT RESPOND
  if (!message.content.startsWith(prefix)) return;
  
//CACHE THE MEMBER IF NOT
if (!message.member)
    message.member = await message.guild.fetchMember(message);
  
//INITIALIZE IMPORTANT VARIABLES
//ARGS IS ARGUMENTS IT SPLICES THE PREFIX AND COMMAND
const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  
//TURNS COMMAND TO LOWERCASE
const cmd = args.shift().toLowerCase();
  
//IF THERE IS ONLY PREFIX AND NO COMMAND IT DOES NOT RESPOND
if (cmd.length === 0) return;

//FETCH THE COMMANDS FROM THE COMMANDS FOLDER
let command = client.commands.get(cmd);
  
//IF COMMAND IS NOT FOUND IT SEARCHES FOR THE ALIASES
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  
//IF IT RECOGNISES IT AS AN COMMAND IT RUNS THE COMMAND
if (command) command.run(client, message, args);
});
client.login(process.env.BOT_TOKEN);
