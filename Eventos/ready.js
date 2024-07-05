const Discord = require('discord.js')
//const mongoose = require("mongoose")
module.exports = async (client) => {
  
  client.invites = {}
  for (guild of client.guilds.cache.values()) {
    client.invites[guild.id] = await guild.invites.fetch()
  }
 
  function estado() {
    let estados = [{
      name: '.ayuda',
      type: 'PLAYING'
    }, {
      name: `${client.guilds.cache.size.toLocaleString()} Servers!`,
      type: 'WATCHING'
    }]
    client.user.setPresence({
      status: "online",
      activities: [estados[Math.floor(estados.length * Math.random())]]
    })
  }
  setInterval(estado, 300000)

  /*
  mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log("DB Conectada")).catch(e => console.log(e))
  */
  
  console.log(`${client.user.username} Conectado!`)
}