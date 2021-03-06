//INITIALIZATION
const { MessageEmbed } = require("discord.js");

//COMMAND HANDLER MODULE
module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command details",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    
//IF THERE IS NO EXTRA ARGUMENT THE BOT SHOWS THE FULL LIST OF COMMANDS
    if (args[0]) {
      const command = await client.commands.get(args[0]);

//IF THERE IS NO COMMAND AS SUCH IS THROWS AN ERROR
      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }
      
//NEW EMBED TO DISPLAY ALL THE COMMANDS
      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided :(")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());
      
      return message.channel.send(embed);
    } else {
      const commands = await client.commands;
      
//IF THERE IS AN OTHER ARGUMENT
      let emx = new MessageEmbed()
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

//SEARCH FOR THE COMMAND AND ITS INFO AND SEND EMBED OF ITS INFO
      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }
      return message.channel.send(emx);
    }
  }
};
