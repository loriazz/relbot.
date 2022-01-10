const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
    if(message.channel.type=="dm") return message.channel.send("Dm'de kullanılamaz.")
        if(message.author.username.startsWith("[AFK]")) return false;
        if(message.author.id==message.guild.owner.id) return message.channel.send("Sana yetkim yetmediği için bu komutu kullanamazsın.");
        if(!message.member.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("Bu komut için ``İsimleri yönet`` yetkisine ihtiyacım var")
        if(message.guild.members.cache.get(message.author.id).nickname){
            if(message.guild.members.cache.get(message.author.id).nickname.startsWith("[AFK]")) return false;
        }
        if(message.guild.members.cache.get(message.author.id).nickname==null){
            var knick = message.author.username
        }else{
            var knick = message.guild.members.cache.get(message.author.id).nickname
        }
        let rMember = message.guild.members.cache.get(message.author.id)
        let user2 = message.author

        let sebep = args.join(" ")
        
        if (!sebep) return message.channel.send(`Bir sebep yazmalısın.`)
        
        db.set(`afk_${user2.id}`, sebep)
        db.set(`${message.author.id}nick`,rMember.nickname);
        var nic = db.get(`${message.author.id}nick`)
         var nick="[AFK]"+nic
         rMember.setNickname("[AFK]"+knick)
        message.channel.send(`<@${message.author.id}>`+` \`${sebep}\` sebebiyle AFK.`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
}
exports.help = {
    name: 'afk'
}