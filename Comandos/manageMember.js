const Discord = require('discord.js')
module.exports = {
  nombre: "managemember",
  alias: ['mm'],
  cooldown: 20000,
  descripcion: "Un comando con todas las opciones de moderación",
  categoria: "mod",
  run: async (EmbedBuilder, client, message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) return
    
    const miembro = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args.join(' ')) || await client.users.fetch(args[0]).catch(() => {})

    if (!miembro) return message.reply('No')

    const embed = new EmbedBuilder()
      .setAuthor(miembro.user.tag + ' | ' + miembro.user.id, miembro.user.displayAvatarURL())
      .addField('Se unió con la cuenta creada hace', `${Math.floor((miembro.joinedTimestamp - miembro.user.createdTimestamp)/86400000)} días`)
      .addField('ModLogs', 'Algo')
      .addField('Notas', 'Algo')
      .addField('Tiempo Total Muteado', 'Algo')
      .addField('Alt', 'Algo')
      .setColor(0x000001)
    
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setLabel('Banear')
        .setCustomId('ban')
        .setStyle('PRIMARY')
      ,
      new Discord.MessageButton()
      .setLabel('Kickear')
      .setCustomId('kick')        
      .setStyle('PRIMARY')
      ,
      new Discord.MessageButton()
      .setLabel('Mutear')
      .setCustomId('mute')        
      .setStyle('PRIMARY')
      ,
      new Discord.MessageButton()
      .setLabel('Encarcelar')
      .setCustomId('jail')        
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