const Discord = require('discord.js');
const data = require('quick.db');


exports.run = async (client, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Bu komutu kullanmak için yetkin yetersiz')
if( message.author.id !== message.guild.owner.user.id) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif').setTitle('Bir hata oldu!').setDescription(`• \`${client.ayarlar.prefix}sunucu-kur\` **kullanmak için,** \`Sunucu Sahibi\` **olmanız gerekiyor.**`).addField('Sunucu Sahibi', message.guild.owner.user.tag).setImage('https://cdn.glitch.com/6f5bb25b-c11b-4003-8a39-69490341df18%2FScreenshot_1.png'));

message.channel.send(new Discord.MessageEmbed()
.setTitle('Oyun & Sohbet Tema')
.setThumbnail('https://cdn.discordapp.com/avatars/686185592899633200/6499d2f1c46b106eed1e25892568aa55.webp?size=512')
.setFooter(`Ping: ${client.ws.ping.toFixed(0)}`, client.user.avatarURL({dynamic: true}))
.setDescription(`${message.author} **Sunucunun** kurulmasını onaylıyor musun? 😇

**Dipnot:** Bazı kanllar silinmemiş gibi görünebilir. Discord dan çıkıp girin düzelir.`)).then(resulter => {
resulter.react('✅').then(() => resulter.react('❌'));

const yesFilter = (reaction, user) => { return reaction.emoji.name === '✅' && user.id === message.guild.owner.user.id; };
const yes = resulter.createReactionCollector(yesFilter, { time: 0 });
const noFilter = (reaction, user) => { return reaction.emoji.name === '❌' && user.id === message.guild.owner.user.id; };
const no = resulter.createReactionCollector(noFilter, { time: 0 });

yes.on('collect', async reaction => {
message.guild.channels.cache.forEach(a => a.delete());

message.guild.channels.create('●▬▬๑「Destek Alanı」๑▬▬●', {type: 'category'}).then(parent => {
  message.guild.channels.create('・Destek', {type: 'text'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🌐・Sunucu Hakkında', {type: 'category'}).then(parent => {
  message.guild.channels.create('📃・kurallar', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('📢・duyurular', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎁・çekilişler', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🤝・partnerler', {type: 'text'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('💬・Metin Kanalları', {type: 'category'}).then(parent => {
  message.guild.channels.create('💬・sohbet', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🤖・bot-komu', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('📸・medya', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('owo', {type: 'text'}).then(c => c.setParent(parent.id));
  });
  message.guild.channels.create('🔒・Yetkili Kanalları', {type: 'category'}).then(parent => {
  message.guild.channels.create('👮・kurucu-sohbet', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('👮・yetkili-sohbet', {type: 'text'}).then(a => a.setParent(parent.id));
  message.guild.channels.create('👮・Kurucu Odası', {type: 'voice'}).then(a => a.setParent(parent.id));
  message.guild.channels.create('👮・Yetkili Odasıı', {type: 'voice'}).then(a => a.setParent(parent.id));
  });
  
  message.guild.channels.create('🗣・Sesli Sohbet Odaları', {type: 'category'}).then(parent => {
  message.guild.channels.create('🗣・Sesli Sohbet 1', {type: 'voice'}).then(a => a.setParent(parent.id));
  message.guild.channels.create('🗣・Sesli Sohbet 2', {type: 'voice'}).then(a => a.setParent(parent.id));
  message.guild.channels.create('🗣・Sesli Sohbet 3', {type: 'voice'}).then(a => a.setParent(parent.id));
  });
  
  message.guild.channels.create('🎧・Sesli Müzik Odaları', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎧・Müzik Çalma', {type: 'voice'}).then(a => a.setParent(parent.id));
  message.guild.channels.create('🎧・Müzik Çalma', {type: 'voice'}).then(a => a.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・MİNECRAFT', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・Minecraft 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・Minecraft 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・LEAGUE OF LEGENDS', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・LoL 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・LoL 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・PUBG', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・PUBG 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・PUBG 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・PUBG MOBİL', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・PUBG Mobil 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・PUBG Mobil 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・FORTNİTE', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・Fortnite 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・Fortnite 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・EURO TRUCK SİMULATOR 2', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・ETS2 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・ETS2 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・CS:GO', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・CS:GO 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・CS:GO 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・COUNTER STRİKE 1.6', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・CS 1.6 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・CS 1.6 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('🎮・VALORANT', {type: 'category'}).then(parent => {
  message.guild.channels.create('🎮・Valorant 1', {type: 'voice'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🎮・Valorant 2', {type: 'voice'}).then(c => c.setParent(parent.id));
  });
  
  message.guild.channels.create('💤・AWAY FROM KEYBOARD', {type: 'category'}).then(parent => {
  message.guild.channels.create('💤・AFK', {type: 'voice'}).then(a => a.setParent(parent.id));
  });
  
  message.guild.channels.create('📖・KAYITLAR', {type: 'category'}).then(parent => {
  message.guild.channels.create('📥・giriş-çıkış', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('「☄」otorol', {type: 'text'}).then(c => c.setParent(parent.id));
  message.guild.channels.create('🕒・sayaç', {type: 'text'}).then(c => c.setParent(parent.id));
});
});

no.on('collect', async reaction => {
resulter.delete();
});

})


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'sunucukur'
};