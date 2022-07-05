module.exports = {
  nombre: "aver",
  alias: [],
  cooldown: 0,
  descripcion: "",
  categoria: "",
  run: async (MessageEmbed, client, message, args) => {
    console.log(message.guild.commands.fetch())
  }
}