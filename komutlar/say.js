const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.send('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

 
    const say = new Discord.MessageEmbed()
        .setColor("GREEN")
    .setTitle(message.guild.name)
        .addField("<:star:862299521211564062>   Sunucudaki üye sayısı", message.guild.memberCount)
        .addField("<:star:862299521211564062>   Çevrimiçi üye sayısı", message.guild.members.cache.filter(m => m.user.presence.status !== "offline").size)
        .addField("<:star:862299521211564062>   Çevrimdışı üye sayısı", message.guild.members.cache.filter(m => m.user.presence.status == "offline").size)
   
    message.channel.send(say);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
 }