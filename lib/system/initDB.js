let isNumber = (x) => typeof x === 'number' && !isNaN(x)

function initDB(m, client) {
  const jid = client.user.id.split(':')[0] + '@s.whatsapp.net'

  const settings = global.db.data.settings[jid] ||= {}
  settings.self ??= false
  settings.prefix ??= ['/', '!', '.', '#']
  settings.commandsejecut ??= isNumber(settings.commandsejecut) ? settings.commandsejecut : 0
  settings.id ??= '120363404861393174@newsletter'
  settings.nameid ??= "'⍪≆𝐌𝐨𝐦𝐨 𝐀𝐲𝐚𝐬𝐞' •≏ 𝐎𝐟𝐢𝐜𝐢𝐚𝐥 𝐜𝐡𝐚𝐧𝐧𝐞𝐥⎚"
  settings.type ??= 'Owner'
  settings.link ??= 'https://api.nightlight.qzz.io'
  settings.banner ??= 'https://i.postimg.cc/WbfrNq61/343746d0a25167f3d6a90383b4fcbf76.jpg'
  settings.icon ??= 'https://i.postimg.cc/jSXpnK2D/7f0d2fa4fbc821bce66533a02d2441a6.jpg'
  settings.currency ??= '𝐑𝐲ō'
  settings.namebot ??= '𝐀𝐲𝐚𝐬𝐞'
  settings.botname ??= '𝐌𝐨𝐦𝐨 𝐀𝐲𝐚𝐬𝐞'
  settings.owner ??= 'ˢᵉʳᵍⁱᵒ༻『𝐷𝑒𝑣 𝐀𝐲𝐚𝐬𝐞』ᵒᶠⁱᶜⁱᵃˡ༺'

  const user = global.db.data.users[m.sender] ||= {}
  user.name ??= m.pushName
  user.exp = isNumber(user.exp) ? user.exp : 0
  user.level = isNumber(user.level) ? user.level : 0
  user.usedcommands = isNumber(user.usedcommands) ? user.usedcommands : 0
  user.pasatiempo ??= ''
  user.description ??= ''
  user.marry ??= ''
  user.genre ??= ''
  user.birth ??= ''
  user.metadatos ??= null
  user.metadatos2 ??= null

  const chat = global.db.data.chats[m.chat] ||= {}
  chat.users ||= {}
  chat.isBanned ??= false
  chat.welcome ??= false
  chat.goodbye ??= false
  chat.sWelcome ??= ''
  chat.sGoodbye ??= ''
  chat.nsfw ??= false
  chat.alerts ??= true
  chat.gacha ??= true
  chat.economy ??= true
  chat.adminonly ??= false
  chat.primaryBot ??= null
  chat.antilinks ??= true

  chat.users[m.sender] ||= {}
  chat.users[m.sender].stats ||= {}
  chat.users[m.sender].usedTime ??= null
  chat.users[m.sender].lastCmd = isNumber(chat.users[m.sender].lastCmd) ? chat.users[m.sender].lastCmd : 0
  chat.users[m.sender].coins = isNumber(chat.users[m.sender].coins) ? chat.users[m.sender].coins : 0
  chat.users[m.sender].bank = isNumber(chat.users[m.sender].bank) ? chat.users[m.sender].bank : 0
  chat.users[m.sender].afk = isNumber(chat.users[m.sender].afk) ? chat.users[m.sender].afk : -1
  chat.users[m.sender].afkReason ??= ''
  chat.users[m.sender].characters = Array.isArray(chat.users[m.sender].characters) ? chat.users[m.sender].characters : []
}

export default initDB;
