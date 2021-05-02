const economy = require('../../economy')

module.exports = {
  cooldown: 5,
  commands: ['slot', 's'],
  maxArgs: 1,
  callback: async (message, arguments) => {
    const coins = arguments[1]
    const bet = parseInt(arguments[0])
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    const guildId = message.guild.id
    const userId = message.author.id
    const bs = message.author.username
    const messages = ["<:votecoin:828983395890495519>", "<:pkc:828983395912122378>", "<:pkd:828983066034044998>"]
    if (isNaN(bet)) {
      message.reply('Vui lòng cung cấp số tiền hợp lệ.')
      return
    }
    if (bet < 0) {
      message.reply('bạn không thể đánh một số nhỏ hơn 0')
      return
    }
        if (await economy.getCoins(guildId, userId) < bet ) return message.reply('Tiền đâu đòi đánh nhiều thế' )
        function random() {
          const randomz = Math.floor(Math.random() * 2);
          console.log(randomz);
          return randomz === 1;
        };
    var slot1 = messages[Math.floor(Math.random() * messages.length)];
    var slot2 = messages[Math.floor(Math.random() * messages.length)];
    var slot3 = messages[Math.floor(Math.random() * messages.length)];
    
    
    if (slot1 === slot2 && slot1 === slot3) {
      message.channel.send(`.-----SLOTS-----.
|<a:Slots:828255645249437706>     <a:Slots:828255645249437706>     <a:Slots:828255645249437706>|
|.--------.--------.|
|   <:1322:829158255518941214>     .    <:1432:829158255593914388>   |
|.--------.--------.|`)
.then((msg) => {
  setTimeout(function() {
    msg.edit(`.-----SLOTS-----.
|${slot1}     ${slot2}     ${slot3}|   bạn thắng!
|.--------.--------.|
|   <:1322:829158255518941214>     .    <:1432:829158255593914388>   |
|.--------.--------.|`);
  }, 2000)});
  await economy.addCoins(guildId, userId, bet)  
    } else {
      message.channel.send(`.-----SLOTS-----.
|<a:Slots:828255645249437706>     <a:Slots:828255645249437706>     <a:Slots:828255645249437706>|
|.--------.--------.|
|   <:1322:829158255518941214>     .    <:1432:829158255593914388>   |
|.--------.--------.|`)
      .then((msg) => {
        setTimeout(function() {
          msg.edit(`.-----SLOTS-----.
|${slot1}     ${slot2}     ${slot3}|   bạn thua!
|.--------.--------.|
|   <:1322:829158255518941214>     .    <:1432:829158255593914388>   |
|.--------.--------.|`);
        }, 2000)});
      await economy.rmv(guildId, userId, bet)    
    }
  }
}
