const { SlashCommandBuilder } = require('discord.js')
const ms = require('ms')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutea a un miembro')
    .addUserOption(option =>
      option
        .setName('miembro')
        .setDescription('Miembro que deseas mutear')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('tiempo')
        .setDescription('Tiempo que lo deseas mutear')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('razon')
        .setDescription('La razón porque quieres mutear al miembro')
        .setRequired(true)
    ),

  run: async (EmbedBuilder, client, interaction) => {
    const miembro = await interaction.guild.members.fetch(interaction.options.getUser('miembro'))
    const razon = interaction.options.getString('razon')
    const tiempo = interaction.options.getString('tiempo')
    const embed = new EmbedBuilder()
      .setColor(0x000001)
    function mensajerror() {
      interaction.reply({ embeds: [embed], ephemeral: true })
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
        const embed2 = new EmbedBuilder() // Log
          .setDescription(`**${miembro.user.tag} muteado**\nRazón - ${razon}\nMuteado por - <@${interaction.member.user.id}>`)
          .setColor(0x000001)
        //client.channels.cache.get("849456580562780190").send({ embeds: [embed2] })
      }).catch(e => {
        console.error(e)
        interaction.reply("Hubo un error")
      })
      /*
      setTimeout(() => {
        miembro.timeout(null, `Terminó el tiempo de mute por - ${razon}`).then(() => {
          const embed2 = new EmbedBuilder()
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