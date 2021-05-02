const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')

module.exports = {
  commands: ['listwarnings', 'lw'],
  minArgs: 1,
  expectedArgs: "<Target user's @>",
  requiredRoles: ['Moderator'],
  callback: async (message, arguments, text) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Hãy mention người cần xem danh sách')
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
        })

        let reply = `<@${userId}> bị warn vì:\n\n`

        for (const warning of results.warnings) {
          const { author, timestamp, reason } = warning

          reply += `Bởi ${author} vào ngày ${new Date(
            timestamp
          ).toLocaleDateString()} vì lí do "${reason}"\n\n`
        }

        message.reply(reply)
      } finally {
        mongoose.connection.close()
      }
    })
  },
}
