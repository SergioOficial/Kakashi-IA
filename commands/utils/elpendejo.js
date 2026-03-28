export default {
  command: ['pendejo', 'elpendejo', 'tonto'],
  category: 'utils',
  run: async (client, m) => {

    if (!m.isGroup) return m.reply('Este comando es solo para grupos.')

    const metadata = await client.groupMetadata(m.chat)
    const participants = metadata.participants
    const randomUser = participants[Math.floor(Math.random() * participants.length)].id

    // Mensaje inicial
    const enviado = await client.sendMessage(
      m.chat,
      { text: "10." },
      { quoted: m }
    )

    const esperar = ms => new Promise(res => setTimeout(res, ms))

    await esperar(500)
    await client.sendMessage(m.chat, {
      edit: enviado.key,
      text: "50.."
    })

    await esperar(500)
    await client.sendMessage(m.chat, {
      edit: enviado.key,
      text: "90..."
    })

    await esperar(500)
    await client.sendMessage(m.chat, {
      edit: enviado.key,
      text: "100% ✯"
    })

    await esperar(700)
    await client.sendMessage(m.chat, {
      edit: enviado.key,
      text:
`*🔍 Búsqueda completada...*

❖ *El pendejo oficial del grupo es:*
> ⸙ @${randomUser.split("@")[0]}

✐ Deja de ser tan pendejo por favor.`,
      mentions: [randomUser]
    })

  }
}
