const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
 message.channel.createOverwrite(every, {
    SEND_MESSAGES: true
  });

  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription("**Sohbet kanalı Başarıyla Açıldı!**");
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "sohbet",
  permLevel: 3
};

exports.help = {
  name: "sohbetaç",
  description: "kapat ac",
  usage: "sohbetaç"
};
