const ms = require('ms');
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: Çekiliş başlatmak için **__Yönetici__** yetkisine sahip olmanız gerekmektedir.');
    }

    // Giveaway channel
    let çekilişKanalı = message.mentions.channels.first();
    // If no channel is mentionned
    if(!çekilişKanalı){
        return message.channel.send(':x: Çekiliş yapmak için bir kanal belirleyin');
    }

    // Giveaway duration
    let çekilişZamanı = args[1];
    // If the duration isn't valid
    if(!çekilişZamanı || isNaN(ms(çekilişZamanı))){
        return message.channel.send(':x: Bir çekiliş zamanı belirleyin');
    }

    // Number of winners
    let çekilişKazananları = args[2];
    // If the specified number of winners is not a number
    if(isNaN(çekilişKazananları) || (parseInt(çekilişKazananları) <= 0)){
        return message.channel.send(':x: Kaç kişi kazanacak onu belirleyin');
    }

    // Giveaway prize
    let çekilişÖdülü = args.slice(3).join(' ');
    // If no prize is specified
    if(!çekilişÖdülü){
        return message.channel.send(':x: Bir ödül belirleyin!');
    }

    // Start the giveaway
    client.giveawaysManager.start(çekilişKanalı, {
        // The giveaway duration
        time: ms(çekilişZamanı),
        // The giveaway prize
        prize: çekilişÖdülü,
        // The giveaway winner count
        winnerCount: çekilişKazananları,
        // Who hosts this giveaway
        hostedBy: message.author,
        // Messages
        messages: {
            giveaway: "🎉🎉 **ÇEKİLİŞ BAŞLADI** 🎉🎉",
            giveawayEnded: "🎉🎉 **ÇEKİLİŞ BİTTİ** 🎉🎉",
            timeRemaining: "Ne zaman bitecek: **{duration}**!",
            inviteToParticipate: "Katılmak için 🎉 reaksiyonuna basın!",
            winMessage: "Tebrikler, {winners}!  **{prize}** Kazandın(ız)!",
            embedFooter: "Çekiliş",
            noWinner: "Çekiliş iptal edildi, Kazanan yok",
            hostedBy: "Çekilişi başlatan: {user}",
            winners: "Kazanan(lar)",
            endedAt: "Şu zaman bitti ",
            units: {
                seconds: "saniye",
                minutes: "dakika",
                hours: "saat",
                days: "gün",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`${çekilişKanalı} Kanalında çekiliş başlatıldı!`);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['çekiliş-yap'],
  permLevel: 0
};

exports.help = {
  name: 'çekiliş-başlat' 
};