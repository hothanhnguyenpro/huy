const Discord = require('discord.js')
const client = new Discord.Client()
const path = require('path')
const fs = require('fs')
const config = require('./config.json')
const command = require('./command')
const levels = require('./levels')
const commandBasez = require('./commands/command-base')
client.on("message", async message => {	  
  if(message.content === 'hi'){	   
     message.channel.send("hi bro");	}
     if(message.content === 'hello'){	   
      message.channel.send("chào cậu");	  }
      if(message.content === 'chào'){	   
        message.channel.send("chào lại nè :))");	  }
        if(message.content === 'xin chào'){	   
          message.channel.send("chào người ae");}
          if(message.content === 'lô'){	   
            message.channel.send("chào cho đàng hoàng");	  }
          	})
client.on('ready', async () => {
  console.log('The client is ready!')
  command(client, '-', (message) => {
    const content = message.content.replace('!status ', '')
    // "!status hello world" -> "hello world"

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })  
  command(client, 'allsv', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })
  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }
  commandBasez.loadPrefixes(client)
  levels(client)
  readCommands('commands')
})
client.login(config.token)
