const economy = require('../../economy')

module.exports = {
  commands: 'pay',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<đề cập người dùng @> <số tiền>",
  callback: async (message, arguments, text) => {
    const { guild, member } = message
     
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Vui lòng chỉ định ai đó để cung cấp tiền cho.')
      return
    }

    const coinsToGive = arguments[1]
    if (isNaN(coinsToGive)) {
      message.reply('Vui lòng cung cấp số lượng xu hợp lệ để cung cấp.')
      return
    }
    if (coinsToGive < 0 ) return message.reply('Cho kiểu gì???' )

    const coinsOwned = await economy.getCoins(guild.id, member.id)
    if (coinsOwned < coinsToGive) {
      message.reply(`bạn không có ${coinsToGive} đô!`)
      return
    }

    const remainingCoins = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    )
    const newBalance = await economy.addCoins(guild.id, target.id, coinsToGive)

    message.reply(
      `Bạn đã tặng <@${target.id}> ${coinsToGive} đô! Giờ họ có ${newBalance} đô và bạn có ${remainingCoins} đô!`
    )
  },
}
