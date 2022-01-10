const Discord = require('discord.js');
const ayarlar = require('./ayarlar.json');
const bot = new Discord.Client()
const westra = new Discord.ShardingManager('./server.js', {
    totalShards: 1,
    token: ayarlar.TOKEN
});
const baslat = new Discord.ShardingManager('./bot.js', {
    totalShards: 1,
    token: ayarlar.TOKEN
});

const baslat2 = new Discord.ShardingManager('./ticketbot/index.js', {
  totalShards: 1,
  token: ayarlar.TOKEN
});



westra.spawn(); 
baslat.spawn();
baslat2.spawn();

westra.on('launch', shard => {
  console.log(`**${shard.id}** ID'li shard başlatıldı.`)
});

baslat.on('launch', shard => {
  console.log(`**${shard.id}** ID'li shard başlatıldı.`)
});

baslat2.on('launch', shard => {
  console.log(`**${shard.id}** ID'li shard başlatıldı.`)
});



setTimeout(() => {
    westra.broadcastEval("process.exit()");
}, 21600000);

setTimeout(() => {
  baslat.broadcastEval("process.exit()");
}, 21600000);

setTimeout(() => {
  baslat2.broadcastEval("process.exit()");
}, 21600000);

