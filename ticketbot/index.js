const Discord = require("discord.js");
const client = new Discord.Client({
  disableMentions: 'everyone'
})
require("dotenv").config()
require('discord-reply');
const { Database } = require("quick.db");
const db = require("quick.db");
const randomstring = require("randomstring");
const disbut = require('discord-buttons');
require('discord-buttons')(client);
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const config = require(`./config.json`)
const prefix = config.prefix;

async function channelLog(embed) {
  if (!config.ticket_log) return;
  let ch = await client.channels.cache.get(config.ticket_log) || message.guild.channels.cache.find(channel => channel.name.match("ticket-log"));
  if (!ch) return console.log(`Pls fill config.json`)
  ch.send(embed)
}


client.on("warn", info => console.log(info));

client.on("error", console.error)

client.on("message", async(message) =>{
  if (message.author.bot || !message.guild) return;
  let args = message.content.toLowerCase().split(" ");
  let command = args.shift()
  if (command == prefix + `help`) {
    let embed = new Discord.MessageEmbed()
      .setTitle(`**Bot komutları listesi**`)
      .setDescription(`> \`${prefix}send\` - Talep Açmak İçin Bir Mesaj Gönderir - **Send Message For Opening A Ticket**
      > \`${prefix}add\` - **Belirli Bir Talepe Üye Ekler** - **Add User On A Tİcket**
      > \`${prefix}Remove\` - **Belirli Bir Talepden Üyeyi Kaldırır** - **Remove User On A Ticket**
      > \`${prefix}delete\` - **Talepi Siler** - **Delete A Ticket**
      > \`${prefix}close\` - **Talepi Kapatır** - **Close A Ticket**
      > \`${prefix}open\` - **Talep Açar** - **Opens A Ticket**
      > \`${prefix}rename\` - **Talepin İsmini Değiştirir** - **Rename A Ticket**
      > \`${prefix}setchannels\` - **Taleplerin Açılacağı Kanalı config** - **Set For Tickets Opening Channel**
      > \`${prefix}setstaff\` - **Talepe Bakacak Rolleri config** - **Set a Roles Looking For Tickets**`)
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(``)
    message.lineReply({ embed: embed })
  }
  if (command == prefix + `add`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu Komutu Kullanmaya Yetkin Yok`);
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Json_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu Sunucuda Rollerin Ayarlanması Gerekiyor \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.lineReply(`Mention a member of its ID`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
        }).then(() => {
          message.lineReply({ embed: { description: `${member} Başarıyla Eklendi ${channel}`, color: 0x5865F2 } });
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Kişi Başarıyla Talepe Eklendi`)
            .addField(`Talep`, `<#${channel.id}>`)
            .addField(`Eklenen Kişi`, member.user)
            .addField(`Tarafından Yapıldı`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        });
      }
      catch (e) {
        return message.channel.send(`An error occurred, please try again!`);
      }
    }
  }
  if (command == prefix + `remove`) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu Komutu Kullanmaya Yetkin Yok`);
    let args = message.content.split(' ').slice(1).join(' ');
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu Sunucuda Rollerin Ayarlanması Gerekiyor \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args || message.guild.members.cache.find(x => x.user.username === args || x.user.username === args));
      if (!member) return message.lineReply(`Mention a member of its ID`);
      try {
        channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
        }).then(() => {
           let log_embed = new Discord.MessageEmbed()
            .setTitle(`Kişi Başarıyla Talepeden Kaldırıldı`)
            .addField(`Talep`, `<#${channel.id}>`)
            .addField(`Kaldırılan`, member.user)
            .addField(`Tarafından Yapıldı`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          message.lineReply({ embed: { description: ` ${member} Üye Başarılı Bir Şekilde ${channel} Kanalından Kaldırıldı`, color: 0x5865F2 } });
        });
      }
      catch (e) {
        return message.channel.send(`An error occurred, please try again!`);
      }
    }
  }
  if (command == prefix + 'delete') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu Komutu Kullanmaya Yetkin Yok`);
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu Sunucuda Rollerin Ayarlanması Gerekiyor \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      message.lineReply({ embed: { description: `Ticketiniz 5 Saniye Sonra Kapatılıyor`, color: 0x5865F2 } })
      setTimeout(async () => {
        let log_embed = new Discord.MessageEmbed()
            .setTitle(`Talep Silindi`)
            .addField(`Talep Numarası`, `${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
            .addField(`Tarafından`,`<@!${await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by}>`)
            .addField(`Tarafından Yapıldı`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`RED`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
          channel.delete()
      }, 5000)
    }
  }
  if (command == prefix + 'close') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu Komutu Kullanmaya Yetkin Yok`);
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Staff_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu Sunucuda Rollerin Ayarlanması Gerekiyor \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.lineReply({ embed: { description: `Ticketiniz 5 Saniye Sonra Kapatılıyor,`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Talep <@!${message.author.id}> Tarafından Kapatıldı <@!${message.author.id}>`, color: `YELLOW` } })
          let type = 'member'
          await Promise.all(channel.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
          channel.setName(`closed-${(await db.get(`ticket_${channel.id}_${message.guild.id}`))}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Talep Silindi`)
            .addField(`Talep`, `<#${channel.id}>`)
            .addField(`Tarafından Yapıldı`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`YELLOW`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`An error occurred, please try again!`);
        }
      }, 1000)
    }
  }

  if (command == prefix + 'open') {
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Json_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu Sunucuda Rollerin Ayarlanması Gerekiyor \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let msg = await message.lineReply({ embed: { description: `Talepiniz Açılıyor...`, color: 0x5865F2 } })
      setTimeout(async () => {
        try {
          msg.delete()
          channel.send({ embed: { description: `Yeni Talep <@!${message.author.id}> Tarafından Açıldı`, color: `GREEN` } })
          let meember = client.users.cache.get(await db.get(`ticket_${channel.id}_${message.guild.id}`).ticket_by);
          channel.updateOverwrite(meember, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Json_${message.guild.id}.Json`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.updateOverwrite((await db.get(`Json_${message.guild.id}.Json`)), {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          channel.setName(`ticket-${await db.get(`ticket_${channel.id}_${message.guild.id}`).count}`)
          let log_embed = new Discord.MessageEmbed()
            .setTitle(`Talep Açıldı`)
            .addField(`Talep`, `<#${channel.id}>`)
            .addField(`Tarafından Yapıldı`, `<@!${message.author.id}>`)
            .setTimestamp()
            .setColor(`GREEN`)
            .setFooter(message.guild.name, message.guild.iconURL())
          channelLog(log_embed)
        } catch (e) {
          return message.channel.send(`An error occurred, please try again!`);
        }
      }, 1000)
    }
  }
  if (command == prefix + 'rename' || command == prefix + 'setname') {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.lineReply(`:x: Bu Komutu Kullanmaya Yetkin Yok`);
    let channel = message.mentions.channels.first() || message.channel;
    const sfats = await db.get(`Json_${message.guild.id}`)
    if (!sfats) return message.lineReply({ embed: { description: `Bu Sunucuda Rollerin Ayarlanması Gerekiyor \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (await db.get(`ticket_${channel.id}_${message.guild.id}`)) {
      let args = message.content.split(' ').slice(1).join(' ');
      if (!args) return message.lineReply({ embed: { description: `Lütfen Talepin İsmini Ne Yapacağınızı Belirtin`, color: 0x5865F2 } })
      channel.setName(args)
      message.delete()
      let log_embed = new Discord.MessageEmbed()
        .setTitle(`Talep İsim Değiştirma`)
        .addField(`Yeni İsim`, args)
        .addField(`Talep`, `<#${channel.id}>`)
        .addField(`Tarafından`, `<@!${message.author.id}>`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(message.guild.name, message.guild.iconURL())
      channelLog(log_embed)
    }
  }

  if (command == prefix + 'setchannels'){
    if (!message.member.hasPermission('ADMİNISTRATOR')) return message.lineReply(`:x: Bu Komutu Kullanmaya Yetkin Yok`);
    if (args.length != 2) return message.lineReply({ embed: { description: `Lütfen Önce Kanal İdsini Sonra Katagori idnisi Giriniz `, color: 0x5865F2 } })
    if (message.mentions.roles.length < 2 && !Number(args[0]) && !Number(args[1])) return message.lineReply({ embed: { description: `Lütfen Önce Kanal İdsini Sonra Katagori idnisi Giriniz`, color: 0x5865F2 } })
    const txt = message.guild.channels.cache.get(args[0]);
    const cat = message.guild.channels.cache.get(args[1]);
    if (txt.type !== "text") return message.channel.send("1. Olarak Kanal İdsini yazınız");
    if (cat.type !== "category") return message.channel.send("2.Olarak Katagoti İdsini Yazınız");
    await db.set(`Channels_${message.guild.id}.Log`, txt.id)
    await db.set(`Channels_${message.guild.id}.Cat`, cat.id)
    message.react("?")
  }

  if (command == prefix + 'send' || command == prefix + 'ticket') {
    const sfats = message.guild.roles.cache.get("898214571364450306")
    const sfas = await db.get(`Channels_${message.guild.id}`)
    if (!sfats || sfats === null) return message.lineReply({ embed: { description: `Bu Sunucuda Rollerin Ayarlanması Gerekiyor \`{prefix}setstaff\``, color: 0x5865F2 } })
    if (!sfas || sfas === null) return message.lineReply({ embed: { description: `Bu Sunucuda Kanalların Ayarlanması Gerekiyor \`${prefix}setchannels\``, color: 0x5865F2 } })
    let idd = randomstring.generate({ length: 20 })
    let args = message.content.split(' ').slice(1).join(' ');
    if (!args) args = `Talepler`
    let button7 = new disbut.MessageButton()
      .setStyle(`green`)
      .setEmoji(`??`)
      .setLabel(`Özel Destek`)
      .setID("oyb")
    let button8 = new disbut.MessageButton()
      .setStyle(`green`)
      .setEmoji(`??`)
      .setLabel(`Genel Destek`)
      .setID("gyb")
    let embed = new Discord.MessageEmbed()
      .setTitle(args)
      .setDescription("Bilet Oluşturmak İçin Aşağıdaki Butonlardan Birisina Basabilirsiniz.")
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setColor(0x5865F2)
      .setFooter(message.guild.name, message.guild.iconURL())
    let msg = await message.channel.send({ embed: embed, buttons: [button7,button8] }).then(async msg => {
      
      let log_embed = new Discord.MessageEmbed()
        .setTitle(`Yeni biletler açmak için bir mesaj gönderildi`)
        .addField(`Kanal`, `<#${message.channel.id}>`)
        .addField(`tarafından`, `<@!` + message.author.id + `>`)
        .setTimestamp()
        .setColor(0x5865F2)
        .setFooter(message.guild.name, message.guild.iconURL())
      channelLog(log_embed)
      await db.set(`tickets_${idd}`, {
        reason: args,
        msgID: msg.id,
        id: idd,
        guildName: message.guild.name,
        guildAvatar: message.guild.iconURL(),
        channelID: message.channel.id
      })
    })
  }
})


client.on('clickButton', async (button) => {
  if (button.id === "oyb"){
    await button.reply.send(`Biletiniz işleniyor. Lütfen bekleyin`, true)
    await db.set(`counts_${button.message.id}_${button.message.guild.id}`, `+`, 1)
    let count = await db.get(`counts_${button.message.id}_${button.message.guild.id}`)
    let channel;
    await button.clicker.fetch();
    button.guild.channels.create(`ticket-${button.clicker.user.username}`, {
      permissionOverwrites: [
          {
            id: button.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
          {
            id: ("898214571364450306"),
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
          },
          {
            id: button.clicker.user.id,
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
          },
        ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `A Ticket : <@!${button.clicker.user.id}>`, reason: "Tüm hakları hakanerensen1'a aittir."
      }).then(async channel => {
        channel = channel
        await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })
        await button.reply.edit(`
        **Talepiniz Başarıyla Açıldı** <#${channel.id}>`, true)
            let log_embed = new Discord.MessageEmbed()
              .setTitle(`Yeni Ticket Açıldı`)
              .addField(`Talep`, `<#${channel.id}>`)
              .addField(`Talep Açan Kişi`, `<@!${button.clicker.user.id}>`)
              .addField(`Talep Sayısı`, count)
              .setTimestamp()
              .setColor(`GREEN`)
            channelLog(log_embed)
        const embedticket = new Discord.MessageEmbed()
          .setTimestamp()
          .setTitle("Özel Destek")
          .setFooter(`Ticket Açılma zamanı`)
          .setColor(0x5865F2)
          .setDescription(`<@&898214569418305536>, <@&898214568357142548>\n
          Destek Sizle Yakında İlgilenecektir\n
          Eğer Bu Talepi Kapatmak İsterseniz ?? Emojisine Basabilirsiniz `)
        let idp = randomstring.generate({ length: 25 })
        let bu1tton = new disbut.MessageButton()
          .setStyle(`gray`)
          .setEmoji(`??`)
          .setLabel(`Kapat`)
          .setID(345)
        channel.send(`Hoşgeldin <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {
        })
        })
      }
  },
      client.on('clickButton', async (button) => {
        if (button.id === "gyb"){
          await button.reply.send(`Biletiniz işleniyor. Lütfen bekleyin`, true)
          await db.set(`counts_${button.message.id}_${button.message.guild.id}`, `+`, 1)
          let count = await db.get(`counts_${button.message.id}_${button.message.guild.id}`)
          let channel;
          await button.clicker.fetch();
          button.guild.channels.create(`ticket-${button.clicker.user.username}`, {
            permissionOverwrites: [
                {
                  id: button.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
                {
                  id: ("898214571364450306"),
                  allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
                },
                {
                  id: ("898214568357142548"),
                  allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`,`MANAGE_MESSAGES`],
                },
                {
                  id: button.clicker.user.id,
                  allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
                },
              ], parent: (await db.get(`Channels_${button.message.guild.id}.Cat`)), position: 1, topic: `A Ticket : <@!${button.clicker.user.id}>`, reason: "Tüm hakları hakanerensen1'a aittir."
            }).then(async channel => {
              channel = channel
              await db.set(`ticket_${channel.id}_${button.message.guild.id}`, { count: count, ticket_by: button.clicker.user.id })
              await button.reply.edit(`
            **Talepiniz Başarıyla Açıldı** <#${channel.id}>`, true)
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Yeni Ticket Açıldı`)
                  .addField(`Talep`, `<#${channel.id}>`)
                  .addField(`Talep Açan Kişi`, `<@!${button.clicker.user.id}>`)
                  .addField(`Talep Sayısı`, count)
                  .setTimestamp()
                  .setColor(`GREEN`)
                channelLog(log_embed)
            const embedticket = new Discord.MessageEmbed()
              .setTimestamp()
              .setTitle("Genel Destek")
              .setFooter(`Ticket Açılma Zamanı`)
              .setColor(0x5865F2)
              .setDescription(`<@&898214571364450306> \n
              Destek Sizle Yakında İlgilenecektir\n
              Eğer Bu Talepi Kapatmak İsterseniz ?? Emojisine Basabilirsiniz `)
            let idd = randomstring.generate({ length: 25 })
            await db.set(`close_${button.clicker.user.id}`, idd)
            let bu1tton = new disbut.MessageButton()
              .setStyle(`gray`)
              .setEmoji(`??`)
              .setLabel(`Kapat`)
              .setID(678)
            channel.send(`Hoşgeldin <@!${button.clicker.user.id}>`, { embed: embedticket, component: bu1tton }).then(msg => {
              
            })
            })
        }
      }
    ,))
      client.on('clickButton', async (button1) => {
        await button1.clicker.fetch()
        let idd = randomstring.generate({ length: 25 })
        await db.set(`close_${button1.clicker.user.id}_sure`, idd)
        if (button1.id == 678) {
          let bu0tton = new disbut.MessageButton()
            .setStyle(`red`)
            .setLabel(`Kapat`)
            .setID(123)
          await button1.reply.send(`Bu Talepi Kapatmak İstediğinize Eminmisiniz?`, { component: bu0tton, ephemeral: true });
        }
      })
      client.on('clickButton', async (button4) => {
        await button4.clicker.fetch()
        let idp = randomstring.generate({ length: 25 })
        await db.set(`close_${button4.clicker.user.id}_sure`, idp)
        if (button4.id == 345) {
          let bu0tton = new disbut.MessageButton()
            .setStyle(`red`)
            .setLabel(`Kapat`)
            .setID(356)
          await button4.reply.send(`Bu Talepi Kapatmak İstediğinize Eminmisiniz?`, { component: bu0tton, ephemeral: true });
        }
      })
        client.on('clickButton', async (button) => {
          await button.clicker.fetch()
          if (button.id == 123) {
          await button.reply.send(`Talebiniz 5 Saniye Sonra Kapatılıyor`, true)   
            let ch = button.channel
            if (!ch) return;
            setTimeout(async () => {
              try {
                await ch.send({ embed: { description: `Talep Başarıyla Kapatıldı <@!${button.clicker.user.id}>`, color: `YELLOW` } });
                let type = 'member'
                await Promise.all(ch.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
                ch.delete()
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Talep Kapatıldı`)
                  .addField(`-Talep`, `<#${ch.id}>`)
                  .addField(`Tarafından`, `<@!${button.clicker.user.id}>`)
                  .setTimestamp()
                  .setColor(`YELLOW`)
                channelLog(log_embed)
              } catch (e) {
                return button.channel.send(`Bilinmeyen Hata, Lütfen Yeniden Deneyiniz`);
              }
            }, 4000)
          }
        })
        client.on('clickButton', async (button2) => {
          await button2.clicker.fetch()
          if (button2.id == 356) {
          await button2.reply.send(`Talebiniz 5 Saniye Sonra Kapatılıyor`, true)   
            let ch = button2.channel
            if (!ch) return;
            setTimeout(async () => {
              try {
                await ch.send({ embed: { description: `Talep Başarıyla Kapatıldı <@!${button2.clicker.user.id}>`, color: `YELLOW` } });
                let type = 'member'
                await Promise.all(ch.permissionOverwrites.filter(o => o.type === type).map(o => o.delete()));
                ch.delete()
                let log_embed = new Discord.MessageEmbed()
                  .setTitle(`Talep Kapatıldı`)
                  .addField(`Talep`, `<#${ch.id}>`)
                  .addField(`Tarafından`, `<@!${button2.clicker.user.id}>`)
                  .setTimestamp()
                  .setColor(`YELLOW`)
                channelLog(log_embed)
              } catch (e) {
                return button2.channel.send(`Bilinmeyen Hata, Lütfen Yeniden Deneyiniz`);
              }
            }, 4000)
          }
        })
        client.login(config.token);
