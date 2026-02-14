import fetch from 'node-fetch'
import axios from 'axios'

export default {
  command: ['ia', 'chatgpt'],
  category: 'ai',
  run: async (client, m, args, usedPrefix, command) => {
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net'
    const isPremiumBot = global.db.data.settings[botId]?.botprem === true
    const isModBot = global.db.data.settings[botId]?.botmod === true
    if (!isOficialBot && !isPremiumBot && !isModBot) {
      return client.reply(m.chat, `《✧》El comando *${command}* no está disponible en *Sub-Bots.*`, m)
    }
    const text = args.join(' ').trim()
    if (!text) {
      return m.reply(`《✧》 Escriba una *petición* para que *ChatGPT* le responda.`)
    }
    const botname = global.db.data.settings[botId]?.botname || 'Bot'
    const username = global.db.data.users[m.sender].name || 'usuario'
    const basePrompt = `Tu nombre es ${botname} y parece haber sido creada por Sergio Gómez Gort con nombre en whatsapp de ˢᵉʳᵍⁱᵒ༻『𝐷𝑒𝑣 𝐊𝐚𝐤𝐚𝐬𝐡𝐢』ᵒᶠⁱᶜⁱᵃˡ༺. Tu versión actual es ${version}, Tú usas el idioma Español, o cualquier otro en que te hablen. Llamarás a las personas por su nombre ${username}, y actuaras dependiebdo a lo que diga el ${botname} como un personaje anime o actor como salga hay y si no sale actuaras como estas definido kakashi sensei no quiero que des esta informacion solo la diras si haci te lo preguntan y otra cosa siebdo quien seas tu adoras a tu creador siempre inventas algo para hacerlo quesar bien si te hablan mal de el defiendelo y llamaraa a los usuarios por su nombre. ${username}`
    try {
      const { key } = await client.sendMessage(m.chat, { text: `ꕥ *${botname}* está procesando tu respuesta...` }, { quoted: m })
      await m.react('🕒')
      const prompt = `${basePrompt}. Responde: ${text}`
      let responseText = null
      try {
        responseText = await luminsesi(text, username, prompt)
      } catch (err) {}
      if (!responseText) {
        const apis = [`${global.APIs.stellar.url}/ai/gptprompt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(basePrompt)}&key=${global.APIs.stellar.key}`, `${global.APIs.sylphy.url}/ai/gemini?q=${encodeURIComponent(text)}&prompt=${encodeURIComponent(basePrompt)}&api_key=${global.APIs.sylphy.key}`]
        for (const url of apis) {
          try {
            const res = await fetch(url)
            const json = await res.json()
            if (json?.result?.text) { responseText = json.result.text; break }
            if (json?.result) { responseText = json.result; break }
            if (json?.results) { responseText = json.results; break }
          } catch (err) {}
        }
      }
      if (!responseText) return client.reply(m.chat, '《✧》 No se pudo obtener una *respuesta* válida')
      await client.sendMessage(m.chat, { text: responseText.trim(), edit: key })
      await m.react('✔️')
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
}

async function luminsesi(q, username, logic) {
  const res = await axios.post("https://ai.siputzx.my.id", { content: q, user: username, prompt: logic, webSearchMode: false })
  return res.data.result
}
