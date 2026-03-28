export default {
  command: ['ytinfo', 'infoyt'],
  category: 'utils',
  run: async (client, m) => {

    const texto =
`📺 *Canal Oficial del Creador*\n\n👤 *Nombre:* Sergio Gómez Gort\n🔗 *Canal:* https://youtube.com/@sergiogomezgort\n\n> 💬 *Contenido:* Bots, desarrollo y más cosas que probablemente te rompan el cerebro si no sabes lo que haces.`

    await client.sendMessage(
      m.chat,
      {
        text: texto,
        contextInfo: {
          externalAdReply: {
            title: "Canal de Sergio Gómez Gort",
            body: "Haz clic para ver el canal",
            sourceUrl: "https://youtube.com/@sergiogomezgort",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )

  }
}
