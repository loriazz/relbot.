const Discord = require("discord.js");

module.exports.run = async (Octopus, message, args) => {
  let msg = await message.channel.send("Test Ediliyor.:clock1:");
  let msg1 = await message.channel.send("Test Ediliyor..:clock1:");
  let msg2 = await message.channel.send("Test Ediliyor...:clock1:");
  let testembed = new Discord.MessageEmbed()
  .setColor("0xe2ff00")
  .setDescription("Test Başarılı. Bot Çevrimiçi :sunglasses:")
  message.channel.send(testembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'botkontrol'
};