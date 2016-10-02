var Discord = require('discord.js')
var client = new Discord.Client()
var conf = require('./conf/conf.json')
var debug = require('debug')('aymiebot:bot')
var con = require('./lib/constants')
var util = require('./lib/util')

client.on('ready', () => {
})

client.on('message', msg => {
  var channel = msg.member.voiceChannel

  if (msg.author.username === 'Ebisu') {
    util.randomInt(0, con.ebiInsults.length, function (result) {
      msg.reply(con.ebiInsults[result])
    })
  }

  // Set the prefix
  var prefix = '!ab'

  // Stop if prefix isn't there
  if (!msg.content.startsWith(prefix)) return

  // Split msg into array
  try {
    var msgArray = msg.content.split(' ')
  } catch (err) {
    debug(err)
  }

  if (msgArray[1] === 'messy') {
    msg.channel.sendMessage('is slow!')
    msg.channel.sendMessage(':stuck_out_tongue:')
  }

  if (msgArray[1] === 'rem') {
    msg.channel.sendMessage('is in charge!')
  }

  if (msgArray[1] === 'capt') {
    msg.channel.sendMessage('is delusional!')
  }

  if (msgArray[1] === 'ping') {
    msg.channel.sendMessage('wong!')
  }

  if (msgArray[1] === 'dragon') {
    msg.channel.sendMessage('SHHH, It\'s sleeping over there')
  }

  if (msgArray[1] === 'say') {
    // Join Voice Channel
    channel.join()
      .then(function (connection) {
        // Initialize empty array to store voice string
        var textToConvert = []
        for (var i = 0; i < msgArray.length; i++) {
          if (i > 1) {
            textToConvert.push(msgArray[i])
          }
          if (i === msgArray.length - 1) {
            var textToConvertString = textToConvert.join(' ')
            debug(textToConvertString)

            util.genVoice(textToConvertString, function (vStream) {
              // Start playing returned voice stream
              var intent = connection.playStream(vStream, {volume: 0.5})

              // Debug to print when voice file is playing
              intent.on('start', function () {
                debug('Playing Voice File')
              })

              intent.on('end', function () {
                debug('Finished Playing Voice File')
              })
            })
          }
        }
      })
  }

  if (msgArray[1] === 'summon') {
    channel.join()
      .then(connection => {
        // TODO Fix this section
      })
  }

  if (msgArray[1] === 'play') {
    // Debug Voice Channel ID tied to message
    // debug(msg.author.username + "\'s voice channel id is " + msg.member.voiceChannelID);
    // TODO check to see if bot is already in channel

  }

  if (msgArray[1] === 'test') {
    // TODO does not work, fix it
    var connection = client.connection
    debug('Connected to ' + connection.channel)
  }
})

client.login(conf.discord.bot.token)
