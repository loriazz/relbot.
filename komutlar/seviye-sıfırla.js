const Discord = require('discord.js');

const db = require("quick.db");

const ayarlar = require("../ayarlar.json")

exports.run = async(client, message, args) => {


if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()
                                                                               .setColor("#f6ff00")

.setTitle(`Uyarı`)

.setDescription(` Bu Komutu Kullanmak İçin; \`ADMINISTRATOR\` Yetkisine Sahip Olmalısın!`))

  

db.delete(`./mainjsons/seviyesınır${message.guild.id}`)

db.delete(`./mainjsons/seviyexp${message.guild.id}`)

db.delete(`./mainjsons/seviyekanal${message.guild.id}`)

 return message.channel.send(new Discord.MessageEmbed()

.setColor("#f6ff00")

.setThumbnail(client.user.avatarURL()) 

.setDescription(`<a:tada:751896954182697051> Seviye-Sistemi Bütün Ayarlamaları Sıfırlandı!`)

.setFooter(`${client.user.username} Seviye Sistemi!`)   )

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviye-sıfırla'

};