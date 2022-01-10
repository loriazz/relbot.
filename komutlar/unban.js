const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

  const permError = new Discord.MessageEmbed()
    .setColor('GREEN')
        .setDescription('```To Use This Command You Must Have the "Ban Members" Authority```')

  const userError = new Discord.MessageEmbed()
    .setColor('GREEN')
        .setDescription('```+unban <üye ıd> <Nedeni>```')

  const userError2 = new Discord.MessageEmbed()
    .setColor('GREEN')
        .setDescription("```No Letters Can Be Used in ID```")

  const userError3 = new Discord.MessageEmbed()
    .setColor('GREEN')
        .setDescription('```This User Is Not Banned```')

  const levelError = new Discord.MessageEmbed()
    .setColor('GREEN')
        .setDescription('```You will not remove the ban on a Friend with the Same or Higher role as you```')


  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send
        (permError).then
          (message.delete()).then
            (msg => msg.delete({timeout: 5000, reason: "peepo"}));

  let user = args[0];
    if  (!user) return message.channel.send
          (userError).catch(console.error).then
            (message.delete()).then
              (msg => msg.delete({timeout: 5000, reason: "peepo"}));

  if  (isNaN(args[0])) return message.channel.send
        (userError2).catch(console.error).then
          (message.delete()).then
            (msg => msg.delete({timeout: 5000, reason: "peepo"}));

  if  (user.highestRole >= message.author.highestRole) return message.channel.send
          (levelError).then
            (message.delete()).then
              (msg => msg.delete({timeout: 5000, reason: "peepo"}));


  const banList = await message.guild.fetchBans();


  if (!user.id === banList) return message.channel.send
      (userError3).then
        (message.delete()).then
          (msg => msg.delete({timeout: 5000, reason: "kayex"}));

  message.guild.members.unban(user);
message.channel.send(`<@!${user}> **Kullanıcının Banı Kalktı**`)

  }
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
        kategori: "Yetkili"

  };

  exports.help = {
    name: 'unban',
    description: 'İstediğiniz kişinin banını kaldırır.',
    usage: 'unban [kullanıcı] [sebep]'
  };
