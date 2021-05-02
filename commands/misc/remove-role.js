module.exports = {
  commands: ['removerole', 'delrole', 'deleterole'],
  minArgs: 2,
  expectedArgs: "<Target user's @> <The role name>",
  permissions: 'ADMINISTRATOR',
  description: "tịch thu role",
  callback: (message, arguments) => {
    const targetUser = message.mentions.users.first()
    if (!targetUser) {
      message.reply('hãy tag người cần lấy lại role')
      return
    }

    arguments.shift()

    const roleName = arguments.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      message.reply(`role không tồn tại "${roleName}"`)
      return
    }

    const member = guild.members.cache.get(targetUser.id)

    if (member.roles.cache.get(role.id)) {
      member.roles.remove(role)
      message.reply(`Nó đã bị lấy lại role ${roleName} `)
    } else {
      message.reply(`Nó không có role${roleName} `)
    }
  },
}
