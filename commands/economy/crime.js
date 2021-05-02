const economy = require('../../economy')

module.exports = {
  cooldown: 420,
  commands: ['crime'],
  maxArgs: 1,
  callback: async (message, arguments) => {
    const coins = arguments[1]
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    const guildId = message.guild.id
    const userId = message.author.id
        function random() {
      const randomz = Math.floor(Math.random() * 2)
      return randomz === 1
    };
    if (random() === true) {
      message.channel.send(`Bạn tiếp tục phạm tội và trốn thoát với ** ${randomNumber} ** đô`)
      await economy.addCoins(guildId, userId, randomNumber)
    } else {
      message.channel.send(`Bạn tiếp tục phạm tội nhưng bị bắt! bạn bị phạt số tiền là ${randomNumber}`)
      await economy.rmv(guildId, userId, randomNumber)
    }
  }
}
