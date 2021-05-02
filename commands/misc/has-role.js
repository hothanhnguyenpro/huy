module.exports = {
  commands: 'hasrole',
  minArgs: 2,
  expectedArgs: "<Target user's @> <The role name>",
  permissions: 'ADMINISTRATOR',
  description: "xem người đó có role gì đó không. Ví dụ: hasrole @AsG_Potter @tên role để check xem nó có role đó k",
  callback: (message, arguments) => {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('hãy tag người cần kiểm tra')
      return
    }

    arguments.shift()

    const roleName = arguments.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`Role không tồn tại "${roleName}" cả`)
      return
    }

    const member = guild.members.cache.get(targetUser.id)

    if (member.roles.cache.get(role.id)) {
      message.reply(`Nó có role ${roleName} `)
    } else {
      message.reply(`Nó không có role ${roleName} `)
    }
  },
}
