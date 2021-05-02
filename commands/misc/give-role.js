module.exports = {
  commands: 'giverole',
  minArgs: 2,
  expectedArgs: "<Target user's @> <The role name>",
  permissions: 'ADMINISTRATOR',
  description: "thêm role cho member",
  callback: (message, arguments) => {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('Hãy bấm tên role để thêm.')
      return
    }

    arguments.shift()

    const roleName = arguments.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`Role không tồn tại "${roleName}"`)
      return
    }

    const member = guild.members.cache.get(targetUser.id)
    member.roles.add(role)

    message.reply(`Giờ nó đã có role "${roleName}" `)
  },
}
