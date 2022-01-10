const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args, dil) => {
   let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor("#f6ff00")
 .setDescription(` **${karaliste}** sebebiyle karalisteye alınmışsın!`)
  if(karaliste) 
    return message.channel.send(westraben)
  
  
  
if(args[0] === "kapat") {
  db.delete(`sunucular.${message.guild.id}.koruma`)
  message.channel.send(` Self-bot koruması kapatıldı`)
} else if(args[0] === "aç") {
  db.set(`sunucular.${message.guild.id}.koruma`, `aktif`)
  message.channel.send(' Self Bot Koruma Aktif Edildi.')
} else return message.reply(dil.doğrukullanım)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
  kategori: "Koruma-Sistem"
};

exports.help = {
  name: 'self-koruma',
  description: 'Self botları engeller',
  usage: 'koruma <aç/kapat>'
};