module.exports = {
    commands: ['charizard_mega_y'],
    maxArgs: 1,
    callback: (message, arguments, text) => {
        message.channel.send('https://thumbs.gfycat.com/BleakAliveGilamonster-size_restricted.gif')
      .then((msg) => {
          setTimeout(function() {
            msg.edit(`https://cdn.staticneo.com/w/pokemon/a/a9/006my.gif`);
          }, 2000)});
    }}
