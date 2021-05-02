const Discord = require("discord.js")
module.exports = {
    cooldown: 0,
    commands: ['help'],
    maxArgs: 1,
    callback: async (message, arguments) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('====HELP====')
      .setAuthor(message.author.username)
      .setFooter('make by Asg_Potter')
      .setColor('#F022A5')
      .addFields(
        {
          name: '`-bal`: xem số tiền của bạn',
          value: '---',
        },
         {
          name: '`-bet <số tiền>`: cược tiền',
          value: '---',
        },
        {
          name: '`-shop`: xem cửa hàng',
          value: '---',
        },
        {
          name: '`-pay <số tiền> <đề cập người muốn trả>`: trả tiền cho người khác',
          value: '---',
        },
          {
          name: '`-slot <số tiền>`: chơi slot',
          value: '---',
        },
        {
          name: '`-work`: làm việc để kiếm tiền',
          value: '---',
        },
        {
          name: '`-crime`: làm việc xấu để kiếm tiền >:Đ',
          value: '---',
        },
        {
          name: '`-serverinfo`: xem thông tin server',
          value: '---',
        },
        {
          name: '`-cf <số tiền>`: đặt cược và tung xu',
          value: '---',
        },
        {
          name: '`-bj <số tiền>`: đánh bài xì dách',
          value: '---',
        },
      )
  
    message.channel.send(embed)
  }}
