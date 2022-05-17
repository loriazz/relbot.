const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: Çekiliş bitirmek için **__Yönetici__* yetkisine sahip olmanız gerekmektedir.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Bir mesaj IDsi girin');
    }

    // try to found the giveaway with prize then with ID
    let çekiliş = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!çekiliş){
        return message.channel.send('Şu IDde bir mesaj bulamadım ya da ben körüm: `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(çekiliş.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('Çekiliş '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' saniye sonra bitecek..');
    })
    .catch((e) => {
        if(e.startsWith(` ${çekiliş.messageID} IDli çekiliş zaten bitmiş`)){
            message.channel.send('Çekiliş zaten bitmiş.');
        } else {
            console.error(e);
            message.channel.send('Bir hata oluştu.');
        }
    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çekiliş-bitir"],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-bitir' 
};