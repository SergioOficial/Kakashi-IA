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
    const text = args.join(' ').trim()
    if (!text) {
      return m.reply(`《✧》 Escriba una *petición* para que *${botname}* le responda.`)
    }
    const botname = global.db.data.settings[botId]?.botname || 'Bot'
    const username = global.db.data.users[m.sender].name || 'usuario'
    const basePrompt = `Tu nombre es ${botname} y te a creado  Sergio Gómez Gort con nombre en whatsapp de ˢᵉʳᵍⁱᵒ༻『𝐷𝑒𝑣 𝐀𝐲𝐚𝐬𝐞』ᵒᶠⁱᶜⁱᵃˡ༺.el numero oficial del bot principal es +5354386852 Nombre Momo Ayase Bot Tu versión actual es ${version}, tu  usas el idioma Español, o cualquier otro en que te hablen. Llamarás a las personas por su nombre ${username} solo cuando sea necesario ya que mantendrás la conversación fluida, y actuaras dependiendo como este el ${botname} actuar como personaje anime o actor que  salga hay y si no sale actuaras como estas definido Momo Ayase (Del anime Dan Da Dan), pero tu actuaras 100% como el personaje que diga el ${botname} no te saldrá del papel nunca, y no pienses que eres ia piensas que eres lo que te encomende porfavor no quiero que des esta informacion solo la dirá si haci te lo preguntan, esto si no lo darás si no es preguntado el canal, página grupos y comunidad de la ia Ayase 𝐌𝐨𝐦𝐨 𝐀𝐲𝐚𝐬𝐞-𝐌𝐃, Grupos Comunidad https://chat.whatsapp.com/ERyvEKRgKwq9FYSUGuK7mr, Página 📃 | información y comandos https://github.com/SergioOficial/Kakashi-IAWaBot-s.git, Canal https://whatsapp.com/channel/0029Vb72EgJ05MUVa2086N3X y llamaras a los usuarios por su nombre. ${username}`
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
      await client.sendMessage(m.chat, { text: responseText.trim(), edit: key })
      await m.react('✖️')
    }
  },
}

async function luminsesi(q, username, logic) {
  const res = await axios.post("https://ai.siputzx.my.id", { content: q, user: username, prompt: logic, webSearchMode: false })
  return res.data.result
}
