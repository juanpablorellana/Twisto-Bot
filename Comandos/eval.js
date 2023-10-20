module.exports = {
  nombre: "eval",
  alias: [],
  cooldown: 0,
  descripcion: "",
  categoria: "privada",
  run: async (MessageEmbed, client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Eval")
      .setColor(0x000001)
    try {
      let code = args.join(" ")
      let evaluado = await eval(code)
      let tipo = typeof evaluado || "No encontrado"
      if (typeof evaluado !== "string") {
        evaluado = require("util").inspect(evaluado, { depth: 1 })
      }
      embed.addField("Salida", '```js\n' + evaluado.replace(client.token, "No").slice(0, 1014) + '\n```', true)
      embed.addField("Tipo", '```js\n' + tipo[0].toUpperCase() + tipo.slice(1) + '\n```', true)
      if (evaluado.length > 1014) {
        embed.addField("\u200b", '```js\n' + evaluado.replace(client.token, "No").slice(1014, 2028) + '\n```')
      }
      message.channel.send({ embeds: [embed] })
    } catch (e) {
      embed.addField("Error", '```js\n' + e + '\n```', true)
      embed.addField("Tipo", '```js\nError\n```', true)
      message.channel.send({ embeds: [embed] })
    }
  }
}