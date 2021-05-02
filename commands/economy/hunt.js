const mongo = require('../../mongo')
const zooSchema = require('../../schemas/zoo-schema')
module.exports = {
  cooldown: 0,
  commands: ['hunt', 'h'],
  maxArgs: 1,
  callback: async (message) => {
    const userId = message.author.id
    var myArr = ["🐝","🐊", "👻","🐑" ,"🦋","🐉" ," 🦄","🐓","🐇","🐿️","☃️","<:111111:837660687332540416>","<:242424324:837664883821903912>","<:2222222222:837664883499728897>","<:88888888888888:837664883666714668>","<:777777777777777:837664883642073138>","<:7776_pokemon_eevee:828181241529368587>","<:774656553725853717:837664883692273734>","<:7194_pokemon_charmander:828181241547325460>","<:408678800990273576:837664883612188692>","<:408682294593716224:837664883725434890>","<:408683232851394580:837664883633422367>","<:5555555555555:837664883628572702>","<:000000000000000:837664883692666900>" ,"<:2222222222233333:837664883717439488>","<:333333333333333:837664883574439958>"];
var mySet = new Set(myArr);
myArr = [...mySet];
    const zooz = myArr[Math.floor(Math.random() * myArr.length)]
console.log(myArr);
     message.channel.send(`you catched a ${zooz} `)
     const zzz = {
        zoo1: zooz,
      }
        await zooSchema.findOneAndUpdate(
          {
            userId,
          },
          {
            userId,
            $push: {
              zoo: zzz,
            },
          },
          {
            upsert: true,
          }
        )
      } 
  }    
