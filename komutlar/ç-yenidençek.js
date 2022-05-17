const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: Çekilişi yeniden çekmek için **__Yönetici__** yetkisine sahip olmanız gerekmektedir.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Bir Medaj IDsi girin!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Şu IDdeki:`'+ args.join(' ') +'` çekilişi bulamadım veya körüm');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Çekiliş yeniden çekildi!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('Bitmeyen çekilişi yeniden çekemem!');
        } else {
            console.error(e);
            message.channel.send('Bir Hata Oluştu.');
        }
    });

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['çekiliş-yeniden'],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-yçek' 
};