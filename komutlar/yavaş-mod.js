const Discord = require('discord.js');

exports.run = async(client, message, args) => {
if (message.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new Discord.MessageEmbed()
                .setDescription(`Proper use: \`-yavaş-mod [0/100]\``)
                .setColor('RANDOM')
                .setTimestamp()
            message.channel.send({embed})
            return
          }
if (limit > 100) {
    return message.channel.send(new Discord.MessageEmbed().setDescription("The time limit can be a maximum of **100** seconds.").setColor('RANDOM'));
}
    message.channel.send(new Discord.MessageEmbed()
.setDescription(`Write Limit set to  **${limit}** seconds.`).
setColor('RANDOM'));
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})};
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yavaşmod" , "slowmode"],
  permLevel: 3,
};

exports.help = {
  name: 'yavaşmod',
  description: 'Sohbete yazma sınır (süre) ekler.',
 }; 
