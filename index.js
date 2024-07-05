require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: 32767,
  partials: ['CHANNEL'],
  allowedMentions: { repliedUser: false }
})

///// HANDLERS /////
let { readdirSync } = require("fs")

for (var archivo of readdirSync('./Eventos/')) {
  let nombre = archivo.substring(0, archivo.length - 3)
  let evento = require(`./Eventos/${archivo}`)
  client.on(nombre, evento.bind(null, client))
}
client.comandos = new Discord.Collection()
for (var archivo of readdirSync('./Comandos')) {
  let comando = require(`./Comandos/${archivo}`)
  client.comandos.set(comando.nombre, comando)
}
client.slashCommands = new Discord.Collection()
for (var archivo of readdirSync('./Slash')) {
  let comando = require(`./Slash/${archivo}`)
  client.slashCommands.set(comando.name, comando)
}

//

process.on('unhandledRejection', e => console.error(e))

client.login(process.env.nekot).catch(e => console.log(e))