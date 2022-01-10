const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
exports.run = async (client, message, args) => {
  const payidarzaman = moment

    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .addField("**__Ping__**",`Mesaj Gecikmesi: ${new Date().getTime() - message.createdTimestamp} ms\n  Bot Gecikmesi: ${client.ws.ping}ms`, true)
    .addField("**:kullanc:__Kullanıcı Sayısı__** ", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
    .addField("**:msa:__Sunucu Sayısı__**", `${client.guilds.cache.size.toLocaleString()}`, true)
    .addField("**__Kanal Sayısı__**", `${client.channels.cache.size.toLocaleString()}`, true)
    .addField("**__Aktiflik__**", `${payidarzaman}`, true)
    .addField("**__Node.JS Versiyon__**", `${process.version}`, true)
    .addField("**__Ram Kullanımı__**", `${(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB"}`, true)
    .addField("**__Discord.JS__**", `${Discord.version}`, true)
    .addField("**__Konum__**", `Turkey :flag_tr:`, true)
    .addField("**__İşletim Sistemi__**", ` \`Windows 10 | 64 Bit\` `, true)

  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['is'],
  permLevel: 0
};

exports.help = {
  name: "botbilgi",
  description: "botbilgi",
  usage: "botbilgi"
}; 