
export default {
  command: ['creadores', 'creators', 'owners', 'owner', 'creador'],
  category: 'info',
  run: async (client, m) => {
    // ============================================
    // LISTA DE CREADORES
    // ============================================
    const owners = [
      {
        name: 'Sergio Gómez Gort',
        number: '5358090650'
      }
    ]

    // ============================================
    // CONSTRUIR vCARD
    // ============================================
    const buildVCard = (name, number) => {
      const cleanNumber = String(number).replace(/[^\d]/g, '')
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        'ORG:Sergio Bot;',
        `TEL;type=CELL;type=VOICE;waid=${cleanNumber}:+${cleanNumber}`,
        'END:VCARD'
      ].join('\n')
    }

    const contacts = owners.map(o => ({
      vcard: buildVCard(o.name, o.number)
    }))

    // ============================================
    // MENSAJE DE ESPERA
    // ============================================
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const botName = global.db?.data?.settings?.[botId]?.namebot || 'Sergio Bot'

    const sent = await client.sendMessage(
      m.chat,
      {
        text: '`❏ Buscando mi creador`' + `\n> *${botName}*`
      },
      { quoted: m }
    )

    // ============================================
    // ENVIAR CONTACTO (vCard)
    // ============================================
    try {
      await client.sendMessage(
        m.chat,
        {
          contacts: {
            displayName: owners.length > 1 ? `${owners.length} Creadores` : owners[0].name,
            contacts
          }
        },
        { quoted: m }
      )

      // Mensaje adicional con la info del creador
      await client.sendMessage(
        m.chat,
        {
          text: `👨🏻‍🍼 *Información de mi creador*\n\n` +
                `👤 *Nombre:* Sergio Gómez Gort\n` +
                `🏕️ *País:* Cuba\n` +
                `#️⃣ *Número:* wa.me/5358090650\n` +
                `💌 *Bio:* Hola soy *Sergio*, desarrollador de bots, páginas y estudiante. Tengo 16 años y vivo en Cuba.\n\n` +
                `> Y déjame, quiero dormir 😪`,
          edit: sent.key
        },
        { quoted: m }
      )

    } catch (err) {
      console.error('[Creadores] Error:', err.message)

      // ============================================
      // FALLBACK (solo texto)
      // ============================================
      const fallback = owners
        .map(o => `👑 *${o.name}* — wa.me/${String(o.number).replace(/[^\d]/g, '')}`)
        .join('\n')

      await client.sendMessage(
        m.chat,
        {
          text: `👑 *CREADORES DEL BOT*\n\n${fallback}\n\n` +
                `👨🏻‍🍼 *Información del creador*\n` +
                `👤 *Nombre:* Sergio Gómez Gort\n` +
                `🏕️ *País:* Cuba\n` +
                `#️⃣ *Número:* wa.me/5358090650\n` +
                `💌 *Bio:* Desarrollador de bots y páginas. Tengo 16 años y vivo en Cuba.\n\n` +
                `> Y déjame, quiero dormir 😪`,
          edit: sent.key
        },
        { quoted: m }
      )
    }
  }
        }
