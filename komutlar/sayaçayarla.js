const Discord = require(`discord.js`);
const db = require(`quick.db`);

exports.run = async (client, message, args) => {
    if(!message.member.hesPermission("MANAGE_GUİLD")) return message.reply(`Bu Komutu kullanabilmek için "\`Sunucuyu Yönet\`" yetkisine sahip olmalısın.`)
    let prefix = await require(`giriş-çıkış.db`).fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix

let kanal = message.mentions.channels.first || message.channel

let sayac = args[0]

const sayacsayi = db.fetch(`./mainjsons/sayacsayı.${message.author.id}`);
if(sayac === "sıfırla") {
if(!sayacsayi) {
message.reply("sayaç ayarlanmamış \n ayarlanmamış şeyi sıfırlayamassın");
  return;
}
db.delete(`./mainjsons/sayacsayı.${message.author.id}`);
db.delete(`./mainjsons/sayackanal.${message.author.id}`);
message.channel.send(`sayaç sistemi başarıyla sıfırlandı`);
return;
}

if(!message.member.hasPermission("MANAGE_GUİLD")) return message.channel.send(`Bu Komutu kullanabilmek için "\`Sunucuyu Yönet\`" yetkisine sahip olmalısın.`);

if (!kanal) return message.reply(`Bir sayaç kanalı belirtmelisin. \`${prefix}sayaç-ayarla #kanal <sayı> \``)
if (!sayac) return message.reply(`Bir sayaç kanalı belirtmelisin. \`${prefix}sayaç-ayarla ${kanal} <sayı> \``)
  if(isNaN(sayac)) return message.reply(`Geçerli bir sayı belirtmelisin. \`${prefix}sayaç <sayı> ${kanal}\``)
  if(sayac <= message.guild.member.size) return Message.reply(`sunucudaki kullanıcı sayısından (${message.guild.member.size}) daha yüksek bir değer girmelisin.`);

  db.set(`./mainjsons/sayacsayı.${message.author.id}`, sayac);
  db.set(`./mainjsons/sayackanal.${message.author.id}`, kanal.name)

  message.channel.send(`sayaç başarıyla \`${sayac}\`, bildirimin gidecegi kanal ise <#${kanal.id}> olarak ayarlandı.`)


//sayaç ayarlama kodu

};



exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: []
};

exports.help = {
    name: `sayaç-ayarla`,
    description: `sunucumuzda sayaç sisteminiayarlar`,
    usage: `sayaç-ayarla <#kanal> <sayı>`
};