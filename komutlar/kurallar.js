const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("ORANGE")
.setAuthor(`DJ RELİVEF `, client.user.avatarURL)  
.setTitle("RELİVEF KURALLAR")
.setThumbnail(client.user.avatarURL)
    .setDescription(`

    1-  Ailevi Küfür etmek yasak arkadaşlar. Sansürlüsü,kısaltmalısı fark etmiyor her türlü küfür yasak.Bir problem olduğu zaman münakaşaya girmek yerine yetkili arkadaşlara ulaşabilirsiniz. 
    2- Her hangi bir kanal veya discord reklamı yasaktır.
    3-  Kavgalarınızı özelden yapınız.
    4-  Cinsel, kan, vahşet içerikli paylaşımlar yasaktır.
    5- Din, dil, ırk ve siyaset içerikli konular kesinlikle yasaktır.
    6-Başka yayıncıların isimlerinden veya yaptıkları işlerden bahsetmek mute-ban sebebidir
    7-  Yeni gelen insanlar ile küçümseyici bir şekilde değil aksine yardımcı olacak şekilde iletişime geçiniz.
    8-  Spam ve flood yasak.
    9-  Oyun, dizi, film ve her konuda üzerinden ne kadar geçilse bile spoiler vermek yasaktır.
    10- Bu discord'dan kendi discord'una adam çekmeye çalışmak kesinlik yasak ve ban sebebidir.
`)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["kurallar"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'kurallar', 
    description: '',
    usage: ''
  };