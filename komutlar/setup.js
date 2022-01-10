
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => { 

  let prefix = ayarlar.prefix;
  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("RELİVEF SERVER BİLGİ | SETUP MENÜSÜ")
  .setDescription(`Kurulum Menüsüne Hoş geldiniz lütfen sizden istenilen verileri örnekteki gibi yerleştiriniz.`)
  .addField(`${prefix}kur <Sunucuİsmi> <SunucuİpAdresi>`,false)
  .setThumbnail(client.user.avatarURL())
message.channel.send(embed)
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['s','']
  }
  exports.help = {
    name: 'setup'
  }