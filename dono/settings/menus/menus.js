const fs = require('fs')
const chalk = require('chalk')

const menu = (prefix, NumeroDono, NomeDoDono, pushname, NomeDoBot) => {

return `​​​
╭━━〔  ${NomeDoBot} 〕━━━╮
┃ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢:
┃ ├─  Nome: ${pushname}
┃ ├─  Dono: ${NomeDoDono}
┃ └─  Número: wa.me/${NumeroDono}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭─〔  𝗖𝗢𝗡𝗙𝗜𝗚𝗨𝗥𝗔𝗖̧𝗢̃𝗘𝗦 𝗗𝗢𝗡𝗢 〕
┃ ${prefix}fotomenu
┃ ${prefix}visualizarmsg
┃ ${prefix}setprefix
┃ ${prefix}setnomebot
┃ ${prefix}setowner
┃ ${prefix}setownername
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭─〔 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 〕
┃ ${prefix}s
┃ ${prefix}sgif
┃ ${prefix}f
┃ ${prefix}sticker
┃ ${prefix}figurinhas
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭─〔 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗦 〕
┃ ${prefix}igdl
┃ ${prefix}pinterest
┃ ${prefix}play
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭─〔 𝗠𝗘𝗠𝗕𝗥𝗢𝗦 〕
┃ ${prefix}videopralink 
┃ ${prefix}imgpralink
┃ ${prefix}metadinha
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭─〔 𝗘𝗗𝗜𝗧𝗢𝗥𝗦 𝗗𝗘 𝗧𝗘𝗫𝗧𝗢𝗦 〕
┃ ${prefix}angelwing
┃ ${prefix}efeitoneon
┃ ${prefix}cemiterio
┃ ${prefix}metalgold
┃ ${prefix}naruto
┃ ${prefix}romantic
┃ ${prefix}smoke
┃ ${prefix}papel
┃ ${prefix}lovemsg
┃ ${prefix}lovemsg2
┃ ${prefix}lovemsg3
┃ ${prefix}coffecup
┃ ${prefix}coffecup2
┃ ${prefix}cup
┃ ${prefix}florwooden
┃ ${prefix}neon2
┃ ${prefix}lobometal
┃ ${prefix}harryp
┃ ${prefix}txtborboleta
┃ ${prefix}blackpink
┃ ${prefix}girlmascote
┃ ${prefix}logogame
┃ ${prefix}equipemascote
┃ ${prefix}fpsmascote
┃ ${prefix}hackneon
┃ ${prefix}ffavatar
┃ ${prefix}mascotegame
┃ ${prefix}wingeffect
┃ ${prefix}angelglx
┃ ${prefix}gizquadro
┃ ${prefix}txtquadrinhos
┃ ${prefix}starballons
┃ ${prefix}frozen
┃ ${prefix}3dsilver
┃ ${prefix}goldtext
╰━━━━━━━━━━━━━━━━━━━━━━╯

*${NomeDoBot}* sempre pronto para te ajudar!
 ​​`

}


module.exports = { menu }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Atualizado= ${__filename}`))
	delete require.cache[file]
	require(file)
})