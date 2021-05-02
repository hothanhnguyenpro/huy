const Discord = require("discord.js")
module.exports = {
    cooldown: 0,
    commands: ['dọn'],
    maxArgs: 2,
    callback: async (message, args) => {
       if (!args[0]) return message.reply('Hãy cung cấp số lượng tin nhắn để xóa!')
       if (args > 50) return message.reply('Bạn không thể xóa tin nhắn nhiều hơn 50')
        const verify = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .addFields(
            { name: 'Xác minh', value: `Chờ đã! Bạn có chác là bạn muốn xóa ${args[0]} nhin nhắn(s)?\nReact 🇾 để xác nhận\nNếu không, react 🇳 để hủy bỏ.` }
        )
        await message.channel.send(verify).then(msg => {
            msg.react('🇾')
            msg.react('🇳')
            const filter = (reaction, user) => {
                return ['🇾', '🇳'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '🇾') {
                message.channel.bulkDelete(args[0]).then(async () => {
                await message.channel.bulkDelete(2)
                message.channel.send(`Đã xóa ${args[0]} tin nhắn`).then(msgg => {
                    setTimeout(async function(){
                        await msgg.delete()
                    }, 5000)
                })
            })
            } else {
                msg.delete()
                message.channel.send('Đã hủy')
            }
        }).catch(collected => {
            msg.reply('Hết thời gian nên lệnh sẽ bị hủy.');
        });
        })
      }}
