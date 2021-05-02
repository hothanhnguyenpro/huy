const economy = require('../../economy')

module.exports = {
  cooldown: 5,
  commands: ['bet'],
  maxArgs: 1,
  callback: async (message, arguments) => {
    const coins = arguments[1]
    const bet = parseInt(arguments[0])
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    const guildId = message.guild.id
    const userId = message.author.id
    if (isNaN(bet)) {
      message.reply('Vui lòng cung cấp số tiền hợp lệ.')
      return
    }
    if (bet < 0) {
      message.reply('Bạn không thể đặt cược một số nhỏ hơn 0')
      return
    }
        if (await economy.getCoins(guildId, userId) < bet ) return message.reply('Bạn không có đủ tiền' )
        function random() {
          const randomz = Math.floor(Math.random() * 2);
          console.log(randomz);
          return randomz === 1;
        };
    
    if (random() === true) {
      message.channel.send(`💰 Bạn giành chiến thắng và nhận ${bet} 💰`)
      await economy.addCoins(guildId, userId, bet)
    } else {
      message.channel.send(`💸 Bạn đã thua cược với số tiền ${bet} 💸`)
      await economy.rmv(guildId, userId, bet)
    }
  }
}
