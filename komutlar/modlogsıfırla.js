const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) {
   const embed = new Discord.MessageEmbed()
   .setColor('#fffa00')
   .setTitle('**HATA**')
   .setDescription('**Bu Komutu Kullanabilmek İçin Yetkili Olmalısın!**')
   message.channel.send(embed)
  }
  
  let modlogs = db.get(`./mainjsons/modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
   const embed = new Discord.MessageEmbed()
   .setColor('#fffa00')
   .setTitle('**HATA**')
   .setDescription(`**Bu sunucuda daha önceden modlog kanalı ayarlanmamış. Ayarlamak için:** \`${prefix}modlog ayarla <#kanal>\``)
   .setTimestamp() 
   message.channel.send(embed)
  } else {
    if(modlogs) {    
      db.delete(`./mainjsons/modlogkanaly_${message.guild.id}`) 
      const embed = new Discord.MessageEmbed()
      .setColor('#fffa00')
      .setTitle('**BAŞARILI**')
      .setDescription('**Mod-log Kanalı Başarıyla Sıfırlandı.**')
      .setTimestamp() 
      message.channel.send(embed)
     }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["modlog-sıfırla"],
    permLevel: 0
}

exports.help = {
    name: 'modlog-sıfırla',
    description: 'Sıfırlar.',
    usage: 'modlog-sıfırla'
}