const Discord = require("discord.js")
const economy = require('../../economy')


module.exports = {
    cooldown: 0,
    commands: ['bj', 'blackjack'],
    maxArgs: 1,
    callback: async (message, arguments) => {
    const coins = arguments[1]
    const money = parseInt(arguments[0])
    const guildId = message.guild.id
    const userId = message.author.id
    const moneydb = await economy.getCoins(guildId, userId)

      if (money < 0) {
          message.channel.send("Vui lòng cung cấp số tiền hợp lệ.")
          return
      }

      if (moneydb < money) {
          message.channel.send('Bạn không có đủ tiền' )
          return 
      }


      var numCardsPulled = 0;
      var gameOver = false;

      var player = {
          cards: [],
          score: 0
      };
      var dealer = {
          cards: [],
          score: 0
      };

      function getCardsValue(a) {
          var cardArray = [],
              sum = 0,
              i = 0,
              dk = 10.5,
              doubleking = "QQ",
              aceCount = 0;
          cardArray = a;
          for (i; i < cardArray.length; i += 1) {
              if (cardArray[i].rank === "J" || cardArray[i].rank === "Q" || cardArray[i].rank === "K") {
                  sum += 10;
              } else if (cardArray[i].rank === "A") {
                  sum += 11;
                  aceCount += 1;
              } else if (cardArray[i].rank === doubleking) {
                  sum += dk
              } else {
                  sum += cardArray[i].rank;
              }
          }
          while (aceCount > 0 && sum > 21) {
              sum -= 10;
              aceCount -= 1;
          }
          return sum;
      }

      var deck = {
          deckArray: [],
          initialize: function() {
              var suitArray, rankArray, s, r, n;
              suitArray = ["b", "d", "g", "s"];
              rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
              n = 13;
              for (s = 0; s < suitArray.length; s += 1) {
                  for (r = 0; r < rankArray.length; r += 1) {
                      this.deckArray[s * n + r] = {
                          rank: rankArray[r],
                          suit: suitArray[s]
                      };
                  }
              }
          },
          shuffle: function() {
              var temp, i, rnd;
              for (i = 0; i < this.deckArray.length; i += 1) {
                  rnd = Math.floor(Math.random() * this.deckArray.length);
                  temp = this.deckArray[i];
                  this.deckArray[i] = this.deckArray[rnd];
                  this.deckArray[rnd] = temp;
              }
          }
      };

      deck.initialize();
      deck.shuffle();

      async function bet(outcome) {
        if (outcome === "win") {
        await economy.addCoins(guildId, userId, money)
        }
        if (outcome === "lose") {
        await economy.rmv(guildId, userId, money)
        }
    }

      function resetGame() {
          numCardsPulled = 0;
          player.cards = [];
          dealer.cards = [];
          player.score = 0;
          dealer.score = 0;
          deck.initialize();
      }

      function endMsg(title, msg, dealerC) {
          let cardsMsg = "";
          player.cards.forEach(function(card) {
              cardsMsg += "[`" + card.rank.toString();
              if (card.suit == "d1") cardsMsg += "♥"
              if (card.suit == "d2") cardsMsg += "♦"
              if (card.suit == "d3") cardsMsg += "♠"
              if (card.suit == "d4") cardsMsg += "♣"
              cardsMsg += "`](https://example.com) "
          });
          cardsMsg += " --> " + player.score.toString()

          let dealerMsg = "";
          if (!dealerC) {
              dealerMsg = "[`" + dealer.cards[0].rank.toString();
              if (dealer.cards[0].suit == "d1") dealerMsg += "♥"
              if (dealer.cards[0].suit == "d2") dealerMsg += "♦"
              if (dealer.cards[0].suit == "d3") dealerMsg += "♠"
              if (dealer.cards[0].suit == "d4") dealerMsg += "♣"
              dealerMsg += " ? ?`](https://dashcord.tech/)"
          } else {
              dealerMsg = "";
              dealer.cards.forEach(function(card) {
                  dealerMsg += "[`" + card.rank.toString();
                  if (card.suit == "d1") dealerMsg += "♥"
                  if (card.suit == "d2") dealerMsg += "♦"
                  if (card.suit == "d3") dealerMsg += "♠"
                  if (card.suit == "d4") dealerMsg += "♣"
                  dealerMsg += "`](https://dashcord.tech/) "
              });
              dealerMsg += " --> " + dealer.score.toString()
          }

          const gambleEmbed = new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle(`bàn trò chơi của ` + message.author.username + '\n___')
              .addField('Bài của bạn', cardsMsg)
               .addField('Bài của nhà cái', dealerMsg)
              .addField(title, msg)
              .setFooter('Chúc may mắn');

          message.channel.send(gambleEmbed);
      }

      async function endGame() {
          if (player.score === 21) {
              bet('win');
              gameOver = true;
              await endMsg("BẠN THẮNG!", "Bạn 21 điểm! Bạn chiến thắng!", true)
          }
          if (player.score > 21) {
              bet('lose');
              gameOver = true;
              await endMsg("BẠN THUA "," Bạn vượt quá 21 điểm :((", true)
          }
          if (dealer.score === 21) {
              bet('lose');
              gameOver = true;
              await endMsg("BẠN THUA! "," Nhà cái được 21 điểm ", true)
          }
          if (dealer.score > 21) {
              bet('win');
              gameOver = true;
              await endMsg("BẠN THẮNG !!!!", "Nhà cái thua", true)
          }
          if (dealer.score >= 17 && player.score > dealer.score && player.score < 21) {
              bet('win');
              gameOver = true;
              await endMsg("YOU WON !!! "," You defeated dealer", true)
          }
          if (dealer.score >= 17 && player.score < dealer.score && dealer.score < 21) {
              bet('lose');
              gameOver = true;
              await endMsg("YOU LOST "," Dealer won ", true)
          }
          if (dealer.score >= 17 && player.score === dealer.score && dealer.score < 21) {
              gameOver = true;
              await endMsg("FRIEND? "," Humiliating the dealer", true)
          }
      }

      function dealerDraw() {

          dealer.cards.push(deck.deckArray[numCardsPulled]);
          dealer.score = getCardsValue(dealer.cards);
          numCardsPulled += 1;
      }

      function newGame() {
          hit();
          hit();
          dealerDraw();
          endGame();
      }

      function hit() {
          player.cards.push(deck.deckArray[numCardsPulled]);
          player.score = getCardsValue(player.cards);

          numCardsPulled += 1;
          if (numCardsPulled > 2) {
              endGame();
          }
      }

      function stand() {
          while (dealer.score < 17) {
              dealerDraw();
          }
          endGame();
      }
      // END Javascript blackjack game from echohatch1. Modified for Grape. **

      newGame();
      async function loop() {
          if (gameOver) return;
          endMsg("BJ", '**Type ``h`` bốc thêm lá, Type ``s`` dừng bốc, Type ``o`` chịu thua** ', false)

          let filter = m => m.author.id === message.author.id;
          message.channel.awaitMessages(filter, {
              max: 1,
              time: 1200000,
              errors: ['time']
          }).then(message => {
              message = message.first()
              if (message.content === "h") {
                  hit();
                  loop();
                  return
              } else if (message.content === "s") {
                  stand();
                  loop();
                  return
              } else if (message.content === "o") {
                  bet("lose")
                  return
              } else {
                  message.channel.send('Hãy bấm đúng lệnh')
                  loop()
                  return
              }
          }).catch(_ => {
              message.channel.send("**Bạn đã mất sạch tiền**");
              bet("lose");
              return
          })
      }

      await loop()
  }}
