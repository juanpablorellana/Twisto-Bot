const Discord = require('discord.js')
module.exports = {
  nombre: "managemember",
  alias: ['mm'],
  cooldown: 20000,
  descripcion: "",
  categoria: "mod",
  run: async (MessageEmbed, client, message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) return
    
    const miembro = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args.join(' ')) || await client.users.fetch(args[0]).catch(() => {})

    if (!miembro) return message.reply('pene')

    const embed = new MessageEmbed()
      .setAuthor(miembro.user.tag + ' | ' + miembro.user.id, miembro.user.displayAvatarURL())
      .addField('Se unió con la cuenta creada hace', `${Math.floor((miembro.joinedTimestamp - miembro.user.createdTimestamp)/86400000)} días`)
      .addField('ModLogs', 'blabla')
      .addField('Notas', 'blabla')
      .addField('Tiempo Total Muteado', 'blabla')
      .addField('Alt', 'blabla')
      .setColor(0x000001)
    
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel('Banear')
        .setCustomId('si')
        .setStyle('PRIMARY')
      ,
      new Discord.MessageButton()
      .setLabel('Kickear')
      .setCustomId('peeeene')        
      .setStyle('PRIMARY')
      ,
      new Discord.MessageButton()
      .setLabel('Mutear')
      .setCustomId('vw')        
      .setStyle('PRIMARY')
      ,
      new Discord.MessageButton()
      .setLabel('Encarcelar')
      .setCustomId('pewvewvweeene')        
      .setStyle('PRIMARY')
    )

    message.reply({ embeds:[embed] , components:[row] }).then(m => {
      let collector = m.createMessageComponentCollector({ time: 60000 })
      collector.on('collect', collect => {
        interaction.reply('hola')
      })
    })
  }
}