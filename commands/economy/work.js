const economy = require('../../economy')

module.exports = {
  cooldown: 480,
  commands: ['work'],
  maxArgs: 1,
  callback: async (message, arguments) => {
    const coins = arguments[1]
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    const guildId = message.guild.id
    const userId = message.author.id
    const newCoins = await economy.addCoins(guildId, userId, randomNumber)

    message.reply(
      `Bạn làm việc theo ca dài nửa giờ và kiếm được ${randomNumber} đô(s). Bây giờ bạn có ${newCoins}`
    )
  },
}
