const discord = require("discord.js");


exports.run = async(client, message, args) => {

let şikayet = args.slice(0).join(' ')
if (!şikayet) return message.channel.send(`Şikayetlerinizi Belirtiniz!`)

message.channel.send(`:white_check_mark: **Şikayetin İletildi!**`)

const embed = new discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
.setTitle(`${message.author.username} - Şikayet`)
.setColor('#313131')
.setDescription(`🤬 Kullanıcının Şikayeti: **${şikayet}**`)
.setThumbnail(message.author.avatarURL())
client.channels.cache.get('918231280674566184').send(embed)
    message.delete({timeout: 100})
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'şikayet'
}