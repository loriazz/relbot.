const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const util = require('minecraft-server-util');
exports.run = async (client, message, args) => { 
let prefix = ayarlar.prefix; 
let db = require("quick.db").get(`sunucumc.${message.guild.id}`)

  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setAuthor(`ReliveF SEVİYE BİLGİ | BİLGİ MENÜSÜ`)
  .addField(`!seviyebilgi: `,`Seviye Bilgisini Gösterir`)
  .addField(`!seviye-top: `,`En Çok Seviyeli Kişileri Gösterir`)
  .addField(`------YÖNETİCİ KOMUTLARI------ `,`⇓⇓⇓⇓⇓⇓`)
  .addField(`!seviye-xp: `,`Seviyeyi Ayarlar`)
  .addField(`!seviye-sıfırla: `,`Seviyeyi Sıfırlar`)
  .addField(`!seviye-rol: `,`Seviye Atliyinca Rol Verir`)
  .addField(`!seviye-log: `,`Seviye Kanalını Ayarlar`)
  .addField(`!seviye-ayarlar: `,`Seviye Ayarlarını Gösterir`)
message.channel.send(embed)
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sb','']
  }
  exports.help = {
    name: 'seviye-yardım'
  };