const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  let kişiid = "766267562849730612"//dm ye mesaj gönderecek kişinin id si
  let kanalid = "924338948766068789"//komut kullanılacak kanalın id si

if(message.channel.id !== kanalid) return;
const oyunismi = args[0]
const kayitciismi = message.author.username


//kullanıcı isim girmemiş uyarısı
let boş = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor("Kayıt Sistemi")
.setDescription("Lütfen Kayıt Olmak İstediğiniz İsmi Giriniz");


message.delete();

//eğer kullanıcı bir isim girmemişse onu algılama ve yazdırma
if (!args.length) {
  message.reply(boş).then(a=>a.delete({timeout:5000}));
  return;
}


message.delete();

//kanala mesaj gönderme
let kayıtsistem = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor("Kayıt Sistemi")
.setDescription(`${kayitciismi} Başarıyla ${oyunismi} Adı İle Kayıt Oldun`);
message.reply(kayıtsistem).then(a=>a.delete({timeout:5000})); //3000 = 3sn 10000 = 10sn lütfen 3000 in aşağısına inmeyin


//dm mesaj gönderme
let embed = new Discord.MessageEmbed()
.setColor("ORANGE")
.setAuthor("New Message", "https://cdn.discordapp.com/attachments/502649544622735362/520740243133956138/receive.png")
.setDescription("KAYIT BİLDİRİM")
.setTitle(`**${kayitciismi}** adlı kişi bu isim ile kayıt olmak istiyor **${oyunismi}**`)
.setFooter("ReliveF moderasyon")
client.users.cache.get(kişiid).send(embed);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`kayıt`]
};

exports.help = {
  name: 'kayıt',
  description: "kayıt",
  usage: "kayıt"
};