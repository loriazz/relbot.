const Discord = require('discord.js')
const ayarlar = require('../ayarlar2.json')
module.exports = {
  name: "müzik-yardım",
  description: "müzik", 
  execute(client, message) {
  message.channel.send(new Discord.MessageEmbed()
                      .setDescription(
    `
\`${ayarlar.PREFIX}oynat <şarkı-adı>\` : **Bir Şarkıyı Oynatır.** \n
\`${ayarlar.PREFIX}atla\` : **Sıradaki şarkıyı atlar.**\n
\`${ayarlar.PREFIX}döngü\` : **Çalan şarkıyı sürekli tekrarlar.**\n
\`${ayarlar.PREFIX}durdur\` : **Şarkıyı durdurur.**\n
\`${ayarlar.PREFIX}devam\` : **Duran şarkıyı devam ettirir.**\n
\`${ayarlar.PREFIX}sıra\` : **Şarkı sırasını gösterir.**\n
\`${ayarlar.PREFIX}şarkı\` : **Oynatılan şarkının adını söyler.**\n
\`${ayarlar.PREFIX}davet\` : **Botun davet linkini atar.**\n
`)
                       .setColor("ffc300")
                      )    
}
} 