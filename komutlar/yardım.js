const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => { 

  let prefix = ayarlar.prefix;
  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle("RELİVEF SERVER BİLGİ | YARDIM MENÜSÜ")
  .setDescription(`\` ${prefix}sosyal \` komutu ile bize destek olabilirsiniz`)
  .addField(`${prefix}setup`,`Botu Ayarlamanızı Sağlar`,true)
  .addField(`${prefix}sıfırla`,`Botu Sıfırlamanızı Sağlar`,true)
  .addField(`${prefix}bilgi`,`Ayarlanılan Sunucu Hakkında Bilgileri verir`,true)
  .addField(`${prefix}sosyal`,`Sosyal Medya Hesaplarımızı Gösterir`,false)
  .addField(`${prefix}Moderasyon`,`Moderasyon Komutlarını Gösterir`,false)
  .addField(`${prefix}seviye-yardım`,`Seviye Komutlarını Gösterir`,true)
  .addField(`${prefix}müzik-yardım`,`Müzik komutlarını gösterir`,true)
  .addField(`${prefix}şikayet`,`bir sorununuz varsa bu komutla bize bildirebilirsiniz`,true)
  .addField(`${prefix}avatar`,`bir kullanıcının avatarını gösterir`,true)
  .addField(`${prefix}afk`,`afk olmanıza yarar`,true)
  .setThumbnail(client.user.avatarURL())
  .setFooter(`${message.author.tag} Tarafından İstendi`, message.author.avatarURL())
message.channel.send(embed)
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h','']
  }
  exports.help = {
    name: 'yardım'
  }