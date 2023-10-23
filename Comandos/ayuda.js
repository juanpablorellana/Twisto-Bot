module.exports = {
  nombre: "ayuda",
  alias: ["help", "h", "a"],
  cooldown: 5000,
  descripcion: "Te muestra como usar el Bot. Agregando el nombre de un comando o de una categoría, te informará más.",
  uso: "(comando / categoría)",
  categoria: "general",
  run: async (MessageEmbed, client, message, args) => {
    const embed = new MessageEmbed().setColor('000001')
    
    if (!args[0]) {
      function field(cat) {
        return `> \`${client.comandos.filter(c => c.categoria == cat).map(c => c.nombre).join('`, `')}\``
      }
      let footer = ['Puedes confesarte en el MD del bot!', 'Usa .ayuda (comando / categoría) para saber más!']
      embed.setTitle("**hola**")
      embed.setDescription("Bot creado por <@!753600264740536330>\nCentrado en la utilidad, pero también tiene comandos de entretención.\nSugieran cosas para el bot en <#849456636950216714>\nEl prefix es `.` o mencionar al bot\n\n__**Comandos**__\n")
      // embed.addField("**jajaj**", field('jajaj'))
      embed.addField("**General**", field('general'))
      embed.setThumbnail(message.guild.iconURL({ dynamic: true }))
      embed.setFooter(footer[Math.floor(Math.random() * footer.length)])
      if (message.member.roles.cache.has('849456513646067742')) {
        embed.addField("**Sorteos**", field('sorteos'))
      }
      if (message.member.permissions.has('BAN_MEMBERS')) {
        embed.addField("**Mod**", field('mod'))
      }
      if (message.author.id === '753600264740536330') {
        embed.addField("**Privada**", field('privada'))
      }
      message.channel.send({ embeds: [embed] })
    } else {
      let arg = args[0].toLowerCase()
      let categoria = client.comandos.map(c => c.categoria).some(c => c === arg)
      let comando = client.comandos.get(arg) || client.comandos.find(c => c.alias && c.alias.includes(arg))
      if (!comando && !categoria) {
        embed.setDescription("No encontré esa categoría o comando, usa .ayuda para ver todos los disponibles!")
        message.channel.send({ embeds: [embed] })
      } else if (comando) {
        if (comando.categoria === 'mod' && !message.member.permissions.has('BAN_MEMBERS')) return message.react("<:non:843389719895080981>")
        if (comando.categoria === 'privada' && message.author.id !== "753600264740536330") return message.react("<:non:843389719895080981>")
        /*if (comando.categoria === 'sorteos' && message.member.permissions.has('BAN_MEMBERS') || message.member.roles.cache.has('849456513646067742')) { let a } else { return message.react("<:non:843389719895080981>") }*/

        let aliases = comando.alias.join("`, `") || "Ninguno"
        embed.setDescription(`${comando.descripcion}\n\n**» Comando** - \`.${comando.nombre}${!comando.uso ? '' : ' ' + comando.uso}\`\n**» Aliases** - \`${aliases}\`\n**» Cooldown** - \`${!comando.cooldown ? 'No tiene' : comando.cooldown / 1000 + "s"}\``)
        if (comando.uso) embed.setFooter("() Opcional  [] Obligatorio")
        message.channel.send({ embeds: [embed] })
      } else if (categoria) {
        if (arg === 'mod' && !message.member.permissions.has('BAN_MEMBERS')) return message.react("<:non:843389719895080981>")
        if (arg === 'privada' && message.author.id !== "753600264740536330") return message.react("<:non:843389719895080981>")
        /*if (arg === 'sorteos' && message.member.permissions.has('BAN_MEMBERS') && message.member.roles.cache.has('849456513646067742')) { let a } else { return message.react("<:non:843389719895080981>") }*/

        embed.setTitle(`**Categoría ${args[0][0].toUpperCase() + args[0].slice(1).toLowerCase()}**`)
        embed.setDescription(`${client.comandos.filter(c => c.categoria === arg).map(c => `> \`.${c.nombre}${!c.uso ? '' : ' ' + c.uso}\` - ${c.descripcion}`).join('\n')}`)
        embed.setFooter("() Opcional  [] Obligatorio")
        message.channel.send({ embeds: [embed] })
      }
    }
  }
}