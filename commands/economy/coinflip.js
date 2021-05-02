const economy = require('../../economy')

module.exports = {
  cooldown: 5,
  commands: ['cf'],
  maxArgs: 1,
  callback: async (message, arguments) => {
    const coins = arguments[1]
    const bet = parseInt(arguments[0])
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    const guildId = message.guild.id
    const userId = message.author.id
    const bs = message.author.username
    if (isNaN(bet)) {
      message.reply('Vui lòng cung cấp số tiền hợp lệ.')
      return
    }
    if (bet < 0) {
      message.reply('bạn không thể đặt cược một số nhỏ hơn 0')
      return
    }
        if (await economy.getCoins(guildId, userId) < bet ) return message.reply('Bạn không có đủ tiền' )
        function random() {
          const randomz = Math.floor(Math.random() * 2);
          console.log(randomz);
          return randomz === 1;
        };

    
    if (random() === true) {
        message.channel.send(`**${bs}** bạn bỏ ra <:Cowoncy_Note:828245113855279136> ${bet} ...
đang tung đồng xu <a:12:828212865835991050>...`)
        .then((msg) => {
        setTimeout(function() {
          msg.edit(`**${bs}** you spent <:Cowoncy_Note:828245113855279136> ${bet} ...
đồng xu dừng lại ở mặt <:Gambling_Coinflip:828216727690149948>  và bạn thắng <:Cowoncy_Note:828245113855279136> ${bet + bet}`);
        }, 2000)});  
      await economy.addCoins(guildId, userId, bet)
    } else {
        message.channel.send(`**${bs}** you spent <:Cowoncy_Note:828245113855279136> ${bet} ...
đang tung đồng xu <a:12:828212865835991050>...`)
        .then((msg) => {
          setTimeout(function() {
            msg.edit(`**${bs}** you spent <:Cowoncy_Note:828245113855279136> ${bet} ...
đồng xu dừng lại ở mặt <:CoinTails:828216727903928320> và bạn mất hết số tiền đó... :c`);
          }, 2000)});
        await economy.rmv(guildId, userId, bet)
    }
  }
}
