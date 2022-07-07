const ms = require('ms')
module.exports = {
  name: 'mute',
  description: 'mutea',
  options: [{
    type: 6,
    name: 'miembro',
    description: 'Al miembro que quieras mutear',
    required: true
  }, {
    type: 3,
    name: 'tiempo',
    description: 'El tiempo que quieras mutear al miembro',
    required: true
  }, {
    type: 3,
    name: 'razon',
    description: 'La razón porque quieres mutear al miembro',
    required: true
  }],
  run: async (MessageEmbed, client, interaction) => {
    const miembro = await interaction.guild.members.fetch(interaction.options.getUser('miembro'))
    const razon = interaction.options.getString('razon')
    const tiempo = interaction.options.getString('tiempo')
    const embed = new MessageEmbed()
      .setColor(0x000001)
    function mensajerror() {
      interaction.reply({ embeds: [embed] , ephemeral: true })
    }
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.react("<:non:843389719895080981>")
    } else if (!miembro.moderatable) {
      embed.setDescription("No puedes mutear a este usuario")
      return mensajerror()
    } else {
      embed.setDescription(`**${miembro.user.tag} muteado por ${tiempo}** || Razón - ${razon}`)
      miembro.timeout(ms(tiempo), razon).then(() => {
        interaction.reply({ embeds: [embed] })
        const embed2 = new MessageEmbed() // Log
          .setDescription(`**${miembro.user.tag} muteado**\nRazón - ${razon}\nMuteado por - <@${interaction.member.user.id}>`)
          .setColor(0x000001)
        client.channels.cache.get("849456580562780190").send({ embeds: [embed2] })
      }).catch(e => {
        console.log(e)
        interaction.reply("Hubo un error")
      })
      /*
      setTimeout(() => {
        miembro.timeout(null, `Terminó el tiempo de mute por - ${razon}`).then(() => {
          const embed2 = new MessageEmbed()
            .setDescription(`**${miembro.user.tag} desmuteado**\nRazón - Terminó el tiempo de mute por - ${razon}\nDesmuteado por - <@${interaction.member.user.id}>`)
            .setColor(0x000001)
          client.channels.cache.get("849456580562780190").send({ embeds: [embed2] })
        }).catch(e => {
          console.log(e)
          interaction.reply("Hubo un error")
        })
      }, ms(args[1]))
      */
    }
  }
}