const Discord = require('discord.js');
var durum;
exports.run = (client, message, params, args) => {
const kullanıcı = message.mentions.users.first()
    const offlinekullanıcı = message.mentions.users.first().tag
     const aktifdegil = new Discord.MessageEmbed()
     .setDescription(`${offlinekullanıcı} isimli kullanıcı şu anda aktif değil.`)
    .setColor('#00fe35')
    .setFooter('kullanıcı durumu')
  if (kullanıcı.presence.status === "offline") return message.channel.send(aktifdegil)
  if (kullanıcı.presence.clientStatus.mobile) {
    durum = "📱 Telefon";
  }
  if (kullanıcı.presence.clientStatus.desktop) {
    durum = "💻 Bilgisayar";
  }
  if (kullanıcı.presence.clientStatus.web) {
    durum = "🌐 Tarayıcı";
  }
  if (message.channel.type !== "group") {
      const bilgi = new Discord.MessageEmbed()
      .addField(`**Kullanıcı Adı:** ${kullanıcı.tag}`, `**Bağlanma Durumu:** ${durum}`)
      .setColor('#00fe35')
      .setFooter('kullanıcı durumu')
      return message.channel.send(bilgi)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'kullanıcıbilgi',
  description: 'tarayıcı',
  usage: 'kullanıcıbilgi'
};