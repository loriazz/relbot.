const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed().setColor('RANDOM');
    const mesaj_gönder = (başlık, mesaj) => message.channel.send(embed.setTitle(başlık).setDescription(mesaj).setFooter(client.user.username).setTimestamp()).catch(() => {});
    const panel_sistem = db.get(`panel.${message.guild.id}`);

    if (!message.member.hasPermission('ADMINISRATOR')) return mesaj_gönder('Yetkiniz yok!', `:x:?**Yönetici** yetkiniz olmadığı için komutu kullanamazsınız.`);
    if (!args[0]) return mesaj_gönder('Seçenek yok!', ':exclamation:?Lütfen `aç` ve `kapat` seçeneklerinden birini belirtiniz.');
    if (args[1]) return mesaj_gönder('Fazla seçenek!', ':grey_exclamation:?Lütfen sadece `aç` veya `kapat` yazınız.');
    switch (args[0]) {
        case "aç":
            if (panel_sistem) return mesaj_gönder('Sistem açık!', ':gear:?Panel sistemi **açık** bulunmaktadır.');
            const izin_ayar = [
                {
                    id: message.guild.roles.cache.find(rol => rol.name === "@everyone").id,
                    deny: ['CONNECT'],
                    allow: ['VIEW_CHANNEL']
                }
            ];
            const kategori_ayarlar = { type: 'category', position: 0, reason: `${message.author.tag}?Panel sistemi açılıyor.`, permissionOverwrites: izin_ayar };
            await message.guild.channels.create("------{ Üye Panel }------", kategori_ayarlar).catch(() => {}).then(async kanal => {
                if (!kanal) return mesaj_gönder('Hata oluştu!', ':outbox_tray:?Kanallar oluşturulurken bir sorun ile karşılaşıldı.');
                const ses_ayarlar = { type: 'voice', position: 0, reason: `${message.author.tag}?Panel sistemi açılıyor.`, bitrate: 8000, permissionOverwrites: izin_ayar, parent: kanal };
                let kanal_başarı = [];
                const kanal_oluştur = async (isim) => await message.guild.channels.create(isim, ses_ayarlar).catch(() => {}).then(m => {
                    if (m.name.startsWith("•")) return kanal_başarı.push(`${m.id} c`);
                    return kanal_başarı.push(`${m.id} v`);
                });
                await message.guild.fetch().then(async sunucu => {
                }).catch(() => {});
                const üyeler = {
                    kişi: message.guild.members.cache.filter(üye => !üye.user.bot).size,
                    bot: message.guild.members.cache.filter(üye => üye.user.bot).size,
                    çiçi: message.guild.members.cache.filter(üye => üye.user.presence.status !== 'offline').size
                };

                kanal_başarı.push(`${kanal.id} c`);

                await kanal_oluştur(`Üye Sayısı: ${üyeler.kişi}`);
                await kanal_oluştur(`Bot Sayısı: ${üyeler.bot}`);
                await kanal_oluştur(`Çevrim İçi: ${üyeler.çiçi}`);


                if (!kanal_başarı.length === 5) return mesaj_gönder('Hata oluştu!', ':outbox_tray:?Tüm kanallar açılamadığı için sistem aktifleştirilmedi.');
                db.set(`panel.${message.guild.id}`, kanal_başarı);
                return mesaj_gönder('Başarılı!', ':+1_tone1:?Tüm kanallar oluşturuldu ve sistem açıldı!\n:bulb:?**Sistem 7,5 dakikada bir güncellenecek ve hata olması durumunda kapatılacaktır.**');
            });
            break;
        case "kapat":
            if (!panel_sistem) return mesaj_gönder('Sistem kapalı!', ':robot:?Panel sistemi **kapalı** bulunmaktadır.');
            let silinen_kanallar = 5;
            for (const panel_kanal of panel_sistem) {
                try {
                    await message.guild.channels.cache.get((panel_kanal.split(" "))[0]).delete().catch(() => {}).then(kanal => kanal.deleted ? --silinen_kanallar : () => {});
                } catch (h) {};  
            };
            const sildi_mesaj = silinen_kanallar ? " **Bazı kanallar silinemedi.**" : "";
            db.delete(`panel.${message.guild.id}`);
            return mesaj_gönder('Başarılı!', `:+1_tone1:?Panel sistemi kapatıldı!${sildi_mesaj}`);
        default:
            return mesaj_gönder('Geçersiz seçenek!', ':question:?Lütfen `aç` ve `kapat` seçeneklerinden birini belirtiniz.');
    };
};

exports.conf = {
    aliases: ["panel"]
};

exports.help = {
    name: "panel"
};const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    const embed = new MessageEmbed().setColor('RANDOM');
    const mesaj_gönder = (başlık, mesaj) => message.channel.send(embed.setTitle(başlık).setDescription(mesaj).setFooter(client.user.username).setTimestamp()).catch(() => {});
    const panel_sistem = db.get(`panel.${message.guild.id}`);

    if (!message.member.hasPermission('ADMINISRATOR')) return mesaj_gönder('Yetkiniz yok!', `:x:?**Yönetici** yetkiniz olmadığı için komutu kullanamazsınız.`);
    if (!args[0]) return mesaj_gönder('Seçenek yok!', ':exclamation:?Lütfen `aç` ve `kapat` seçeneklerinden birini belirtiniz.');
    if (args[1]) return mesaj_gönder('Fazla seçenek!', ':grey_exclamation:?Lütfen sadece `aç` veya `kapat` yazınız.');
    switch (args[0]) {
        case "aç":
            if (panel_sistem) return mesaj_gönder('Sistem açık!', ':gear:?Panel sistemi **açık** bulunmaktadır.');
            const izin_ayar = [
                {
                    id: message.guild.roles.cache.find(rol => rol.name === "@everyone").id,
                    deny: ['CONNECT'],
                    allow: ['VIEW_CHANNEL']
                }
            ];
            const kategori_ayarlar = { type: 'category', position: 0, reason: `${message.author.tag}?Panel sistemi açılıyor.`, permissionOverwrites: izin_ayar };
            await message.guild.channels.create("------{ Üye Panel }------", kategori_ayarlar).catch(() => {}).then(async kanal => {
                if (!kanal) return mesaj_gönder('Hata oluştu!', ':outbox_tray:?Kanallar oluşturulurken bir sorun ile karşılaşıldı.');
                const ses_ayarlar = { type: 'voice', position: 0, reason: `${message.author.tag}?Panel sistemi açılıyor.`, bitrate: 8000, permissionOverwrites: izin_ayar, parent: kanal };
                let kanal_başarı = [];
                const kanal_oluştur = async (isim) => await message.guild.channels.create(isim, ses_ayarlar).catch(() => {}).then(m => {
                    if (m.name.startsWith("•")) return kanal_başarı.push(`${m.id} c`);
                    return kanal_başarı.push(`${m.id} v`);
                });
                await message.guild.fetch().then(async sunucu => {
                }).catch(() => {});
                const üyeler = {
                    kişi: message.guild.members.cache.filter(üye => !üye.user.bot).size,
                    bot: message.guild.members.cache.filter(üye => üye.user.bot).size,
                    çiçi: message.guild.members.cache.filter(üye => üye.user.presence.status !== 'offline').size
                };

                kanal_başarı.push(`${kanal.id} c`);

                await kanal_oluştur(`Üye Sayısı: ${üyeler.kişi}`);
                await kanal_oluştur(`Bot Sayısı: ${üyeler.bot}`);
                await kanal_oluştur(`Çevrim İçi: ${üyeler.çiçi}`);


                if (!kanal_başarı.length === 5) return mesaj_gönder('Hata oluştu!', ':outbox_tray:?Tüm kanallar açılamadığı için sistem aktifleştirilmedi.');
                db.set(`panel.${message.guild.id}`, kanal_başarı);
                return mesaj_gönder('Başarılı!', ':+1_tone1:?Tüm kanallar oluşturuldu ve sistem açıldı!\n:bulb:?**Sistem 7,5 dakikada bir güncellenecek ve hata olması durumunda kapatılacaktır.**');
            });
            break;
        case "kapat":
            if (!panel_sistem) return mesaj_gönder('Sistem kapalı!', ':robot:?Panel sistemi **kapalı** bulunmaktadır.');
            let silinen_kanallar = 5;
            for (const panel_kanal of panel_sistem) {
                try {
                    await message.guild.channels.cache.get((panel_kanal.split(" "))[0]).delete().catch(() => {}).then(kanal => kanal.deleted ? --silinen_kanallar : () => {});
                } catch (h) {};  
            };
            const sildi_mesaj = silinen_kanallar ? " **Bazı kanallar silinemedi.**" : "";
            db.delete(`panel.${message.guild.id}`);
            return mesaj_gönder('Başarılı!', `:+1_tone1:?Panel sistemi kapatıldı!${sildi_mesaj}`);
        default:
            return mesaj_gönder('Geçersiz seçenek!', ':question:?Lütfen `aç` ve `kapat` seçeneklerinden birini belirtiniz.');
    };
};

exports.conf = {
    aliases: ["panel"]
};

exports.help = {
    name: "panel"
};