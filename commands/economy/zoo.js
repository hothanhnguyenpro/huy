const mongo = require('../../mongo')
const zooSchema = require('../../schemas/zoo-schema')
module.exports = {
  commands: ['zoo', 'z'],
  maxArgs: 2,
  callback: async (message) => {
    const userId = message.author.id

        const results = await zooSchema.findOne({
          userId
        })

        let reply = `**Bạn đã bắt được**:\n\n`

        for (const zzz of results.zoo) {
          const { zoo1 } = zzz

          reply += `${zoo1} `
        }

        message.channel.send(reply)
      } 
}