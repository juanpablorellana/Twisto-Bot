module.exports = {
  name: 'ayuda',
  description: 'Te muestra como usar el Bot. Agregando el nombre de un comando o de una categoría, te informará más.',
  run: async (MessageEmbed, client, interaction) => {
    interaction.reply('Veamos')
  }
}