
const Discord = require('discord.js');
const db = require("quick.db");
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => { 

let prefix = ayarlar.prefix;

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komutu Kullanmaya yetkin yok`)
   let data = await db.get(`sunucumc.${message.guild.id}`)
    if(!data) return message.channel.send("Bot zaten ayarlı degil! \n Lütfen kurulum yapınız ` -kur `")
    if(!data.name) return message.channel.send("Sunucu ismi zaten ayarlı degil")
    if(!data.ip) return message.channel.send("Sunucu ip adresi zaten ayarlı degil")
    db.delete(`sunucumc.${message.guild.id}`);
    message.channel.send("Tüm Ayarlar Sıfırlandı!");
  
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['delete','']
  }
  exports.help = {
    name: 'sıfırla'
  }