const Discord = require("discord.js")
module.exports = {
    cooldown: 0,
    commands: ['shop'],
    maxArgs: 1,
    callback: async (message, arguments) => {
            const logo =
              'https://www.logodesignlove.com/images/symbols/the-music-shop-logo-01.jpg'
            const embed = new Discord.MessageEmbed()
              .setTitle('====SHOP====')
              .setAuthor(message.author.username)
              .setThumbnail(logo)
              .setFooter('Dm Asg_Potter để mua (chỉ tính xu nhận tại server)')
              .setColor('#F022A5')
              .addFields(
                {
                  name: '3iv gible',
                  value: '300 coins',
                  inline: true,
                },
                {
                  name: '4iv larvitar',
                  value: '500 coins',
                  inline: true,
                },
                {
                  name: '4iv larvesta',
                  value: '500 coins',
                  inline: true,
                },
                {
                  name: 'p5iv larvesta',
                  value: '1500 coins',
                },
                {
                  name: 'color role',
                  value: '300 coins',
                },
                {
                  name: 'custom role',
                  value: '1000 coins',
                },
                {
                  name: 'latias',
                  value: '500000 coins',
                },
              )
        
            message.channel.send(embed)
        }}
