export default {
  command: ['owner', 'creador'],
  category: 'info',
  run: async (client, m) => {
    const start = Date.now()
    const sent = await client.sendMessage(m.chat, { text: '`❏ Buscando mi creador`' + `\n> *${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot}*`}, { quoted: m })
    await client.sendMessage(m.chat, { text: `👨🏻‍🍼Información de mi creador\n *👤Nombre:*: Sergio Gómez Gort\n *🏕️País:*: Cuba\n *#️⃣№:*: wa.me/5358090650\n💌 *Bio:*: Hola soy *Sergio* Desarrollador de bot páginas y estudiante *tengo* 15 años y vivo en *cuba*\n> Y déjame quiero dormir 😪`, edit: sent.key }, { quoted: m })
  },
};
