
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
exports.run = async (client, message, args) => { 
  
let member = message.author;
let prefix = ayarlar.prefix;
  let sunucuismi = args[0]
  let sunucuip = args[1]
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komutu Kullanmaya yetkin yok`)
    if(!sunucuismi) return message.reply(`Lütfen Sunucu İsmini Belirtiniz`)
     if(!sunucuip) return message.reply(`Lütfen Sunucu İpsini Belirtiniz `) 
    db.set(`sunucumc.${message.guild.id}`, { name: sunucuismi, ip: sunucuip });
  
  
  message.channel.send("Kurulum Başarıyla tamamlandı.")
  
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['k','']
  }
  exports.help = {
    name: 'kur'
  }