  const Discord = require("discord.js")
  const client = new Discord.Client()
module.exports = {
    cooldown: 0,
    commands: ['punch'],
    maxArgs: 1,
    callback: async (message, arguments) => {
        const author = message.author.username
        const authormt = message.author.users
        const mention = message.mentions.users.first()
        if (!mention) {
          message.channel.send('Hãy đề cập một người để đấm >:D')
          return
        }
        if(mention.id == message.author.id){
          message.channel.send('Đấm bản thân ??? Mày bị ngu à')
          return
        }
        if(mention.id == 816551731789037624){
          message.channel.send('Bạn không thể đấm tôi <:2442_Sad_Mimikyu_gun:828181241492013056>')
          return
        }
        const mentionz = mention.username  
        const messages = ["https://cdn.weeb.sh/images/HkFlwpZZf.gif", "https://cdn.weeb.sh/images/B1rZP6b-z.gif", "https://cdn.weeb.sh/images/HJqSvaZ-f.gif", "https://cdn.weeb.sh/images/B1-ND6WWM.gif", "https://cdn.weeb.sh/images/SyYbP6W-z.gif", "https://cdn.weeb.sh/images/SJR-PpZbM.gif", "https://cdn.weeb.sh/images/ByI7vTb-G.gif", "https://cdn.weeb.sh/images/rJHLDT-Wz.gif", "https://cdn.weeb.sh/images/B1rZP6b-z.gif"]
        const messagesz = [`${author} đã đấm ${mentionz} , ouch!!`, `${author} đã cho ${mentionz} một cú đấm! Ha!`, `${author} bụp ${mentionz} !! Oof`]
        const rd = messages[Math.floor(Math.random() * messages.length)]
        const rdz = messagesz[Math.floor(Math.random() * messagesz.length)];
    const embed = new Discord.MessageEmbed()
      .setTitle(rdz)
      .setFooter('make by Asg_Potter')
      .setColor('#F022A5')
      .setImage(rd) 
    message.channel.send(embed)
  }}
