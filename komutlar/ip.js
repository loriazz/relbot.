const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const util = require('minecraft-server-util');
exports.run = async (client, message, args) => { 

  
let db = require("quick.db").get(`sunucumc.${message.guild.id}`)

if(!db) return message.channel.send("Sunucu Seçili değil!")
  

  util.status(db.ip) 
    .then((response) => { //console.log(response);
  let prefix = ayarlar.prefix;
  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setAuthor(db.name)
  .setDescription(`> ` + response.host)
message.channel.send(embed)
    
    });
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['b','']
  }
  exports.help = {
    name: 'ip'
  }