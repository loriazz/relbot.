
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
exports.run = async (client, message, args) => { 

  let prefix = ayarlar.prefix;
  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("RELİVEF SERVER BİLGİ | SOSYAL MENÜSÜ")
  .setDescription(`Sosyal Medya Hesaplarımız. \n  [Discord](https://discord.gg/8UDxhrBMTq) \n  [Twitch](https://www.twitch.tv/relivef) \n  [Youtube](https://www.youtube.com/channel/UCjqUL92NXJeS7zuvZiRRgIA)  \n  [Bağış](https://www.bynogame.com/tr/destekle/relivef)`)
  .setThumbnail(client.user.avatarURL())
message.channel.send(embed)
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['social','']
  }
  exports.help = {
    name: 'sosyal'
  }