
const economy = require('../../economy')

module.exports = {
  commands: ['addbalance', 'addbal'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<Mục tiêu @> <số tiền>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Vui lòng gắn thẻ người dùng để thêm tiền vào.')
      return
    }

    const coins = arguments[1]
    if (isNaN(coins)) {
      message.reply('Vui lòng cung cấp số tiền hợp lệ.')
      return
    }

    const guildId = message.guild.id
    const userId = mention.id

    const newCoins = await economy.addCoins(guildId, userId, coins)

    message.reply(
      `Bạn đã tặng cho <@${userId}> ${coins} coin(s). Ví của họ bây giờ là ${newCoins}!`
    )
 
}
}
