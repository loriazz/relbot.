const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const util = require('minecraft-server-util');
exports.run = async (client, message, args) => { 
let prefix = ayarlar.prefix; 
let db = require("quick.db").get(`sunucumc.${message.guild.id}`)

  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setAuthor(`RELİVEF SERVER BİLGİ | BİLGİ MENÜSÜ`)
  .addField(`TWİTCH: https://twitch.tv/relivef`,)
  .addField(`YOUTUBE: https://www.youtube.com/channel/UCjqUL92NXJeS7zuvZiRRgIA`,)
  message.channel.send(embed)
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['b','']
  }
  exports.help = {
    name: 'bilgi'
  };
