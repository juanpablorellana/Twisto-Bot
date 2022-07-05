const { MessageEmbed } = require('discord.js')
const cooldown = new Set()

module.exports = async (client, message) => {

  if (message.author.bot) return

  ///// COMANDOS /////

  const prefixes = [",", '<@!811400730141392896>', '<@811400730141392896>']
  let prefix
  for (const pfx of prefixes) {
    if (message.content.startsWith(pfx.toString())) prefix = pfx
  }
  if (!prefix) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  let comando = client.comandos.get(command) || client.comandos.find(c => c.alias && c.alias.includes(command))
  if (!comando) return

  if (comando.categoria === 'privada' && message.author.id !== "753600264740536330") return message.react("<:non:843389719895080981>")

  if (cooldown.has(message.channel.id && comando.nombre)) return message.react("⌛")
  cooldown.add(message.channel.id)
  cooldown.add(comando.nombre)
  setTimeout(() => {
    cooldown.delete(message.channel.id)
    cooldown.delete(comando.nombre)
  }, comando.cooldown)
  
  comando.run(MessageEmbed, client, message, args)
}