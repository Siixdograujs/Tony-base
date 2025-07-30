const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, downloadContentFromMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const Jimp = require('jimp')
const { color } = require('./arquivos/color');
const { getBuffer, fetchJson, fetchText, generateMessageID, getGroupAdmins, getMembros, getRandom, temporizador, recognize, bgcolor, isFiltered, addFilter, chyt, getExtension, convertSticker, nit, getpc, supre, FormData, runtime, adicionarLink, upload} = require("./dono/functions.js");

const { ftmenu, DLT_FL } = require("./exports.js")
const settings = JSON.parse(fs.readFileSync('./dono/settings.json'));
const nescessario = JSON.parse(fs.readFileSync('./dono/settings/nescessario.json'));
const { ApiSett2, prefix, NomeDoDono, NomeDoBot, NumeroDono} = require("./dono/settings.json")
const { menu } = require("./dono/settings/menus/menus.js")
const { visualizarmsg } = require("./dono/settings/nescessario.json")
module.exports = client = async (client, mek, chatUpdate, store) => {
try {
const info = chatUpdate.messages[0]

if (!info.key.participant) info.key.participant = info.key.remoteJid
info.key.participant = info.key.participant.replace(/:[0-9]+/gi, "")
if (!info.message) return
const baileys = require('@whiskeysockets/baileys');
const fromMe = info.key.fromMe
const content = JSON.stringify(info.message)
const from = info.key.remoteJid
const type = baileys.getContentType(info.message);

var body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || (info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ? JSON.parse(info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson)?.id : null) || info?.text || "";

var Procurar_String = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || ""

var budy = (type === 'conversation') ? info.message?.conversation : (type === 'extendedTextMessage') ? info.message?.extendedTextMessage?.text : '';
var budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
var isCmd = body.trim().startsWith(settings.prefix);
const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
const args = body.trim().split(/ +/).slice(1);
const argss = body.split(/ +/g)
const pushname = info.pushName || "Sem nome"
const botNumber = await client.decodeJid(client.user.id)
const itsMe = info.sender == botNumber ? true : false
const text = q = args.join(" ").trim()
const fatkuns = (info.quoted)
const quoted = info.quoted ? info.quoted : info;
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const isGroup = from.endsWith("@g.us")
const groupMetadata = isGroup ? await client.groupMetadata(from): ""
const groupName = isGroup ? groupMetadata.subject : ''
const sender = isGroup ? info.key.participant: info.key.remoteJid
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const isUsers = isGroup ? groupMembers.includes(sender) : false
const isBot = info.key.fromMe ? true : false
const isBotGroupAdmins = isBotAdmins
const User = isUsers
const isGroupAdmins = isAdmins
const nmrdn = settings.NumeroDono.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
const isOwner = sender.includes(nmrdn)
const menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant
const menc_jid = args.join(" ").replace("@", "") + "@s.whatsapp.net"
const marc_tds = q.includes("@") ? menc_jid : q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : menc_prt 
const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid
const menc_os2 = q.includes("@") ? menc_jid : menc_prt 

const adivinha = info.key.id.length > 21 ? 'Android ツ' : info.key.id.substring(0, 2) == '3A' ? 'IPhone ｯ' : 'WhatsApp web シ';
const reSize = async(buffer, ukur1, ukur2) => {
return new Promise(async(resolve, reject) => {
var baper = await Jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
resolve(ab)
})
}
const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}
const sleep = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms));
};


const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isVisu = type == 'viewOnceMessageV2'
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") 
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"

const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

try { 
var pppusr = await client.profilePictureUrl(sender, 'image') 
} catch { 
var pppusr = 'https://telegra.ph/file/265c672094dfa87caea19.jpg' 
}
const buufferrr = await reSize(pppusr, 200, 200) 

const date = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const hora = moment.tz('America/Sao_Paulo').format('HH:mm:ss');
const dataa = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const timestamp = speed()
const latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
uptime = process.uptime()

const selo = {key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 9999999,status: 200, thumbnail: buufferrr, surface: 200, message: `♻️ C〄M么NDO : ${prefix}${command}\n♻️ H〄R么 :  ${hora}`, orderTitle: 'xeon', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}

const reply = (texto) => {
client.sendMessage(from, { text: texto, contextInfo: {
forwardingScore: 100000, 
isForwarded: true, 
forwardedNewsletterMessageInfo: {
newsletterJid: "120363421067820274@newsletter",
newsletterName: '『𝑻𝑶𝑵𝒀 𝑩𝑶𝑻』'
 }
}, 
mentions: [menc_os2],
mentions: [sender]
});
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? client.sendMessage(from, {text: teks.trim(), mentions: memberr},{quoted: info}) : client.sendMessage(from, {text: teks.trim(), mentions: memberr},{quoted: info})
}

//////////////////////////////////////////////////////////


client.readMessages([info.key])

const line = color('┃','gray')

if (!isGroup && isCmd) console.log(
`${line} ╭───〔 💠 COMANDO NO PRIVADO 💠 〕───╮
${line} │ ⚡ Velocidade : ${color(latensi.toFixed(4), 'green')}
${line} │ 📱 Número    : ${color(sender.split('@')[0], 'yellow')}
${line} │ 🧑 Nome      : ${color(pushname, 'blue')}
${line} │ 💬 Comando   : ${color(command, 'red')}
${line} │ 🕐 Horário   : ${color(time, 'orange')}
${line} ╰───────────────────────────────╯\n`
)

if (!isGroup && !isCmd) console.log(
`${line} ╭───〔 ❄️ MENSAGEM NO PRIVADO ❄️ 〕───╮
${line} │ ⚡ Velocidade : ${color(latensi.toFixed(4), 'green')}
${line} │ 📱 Número    : ${color(sender.split('@')[0], 'yellow')}
${line} │ 🧑 Nome      : ${color(pushname, 'blue')}
${line} │ 💬 Mensagem  : ${color(`${budy}`, 'magenta')}
${line} │ 🕐 Horário   : ${color(time, 'orange')}
${line} ╰────────────────────────────────╯\n`
)

if (isCmd && isGroup) console.log(
`${line} ╭──〔 ❄️ COMANDO EM GRUPO ❄️ 〕──╮
${line} │ 👥 Grupo     : ${color(groupName, 'blue')}
${line} │ ⚡ Velocidade : ${color(latensi.toFixed(4), 'green')}
${line} │ 📱 Número    : ${color(sender.split('@')[0], 'yellow')}
${line} │ 🧑 Nome      : ${color(pushname, 'blue')}
${line} │ 💬 Comando   : ${color(command, 'red')}
${line} │ 🕐 Horário   : ${color(time, 'orange')}
${line} ╰──────────────────────────────╯\n`
)

if (!isCmd && isGroup) console.log(
`${line} ╭──〔 ❄️ MENSAGEM EM GRUPO ❄️ 〕──╮
${line} │ 👥 Grupo     : ${color(groupName, 'blue')}
${line} │ ⚡ Velocidade : ${color(latensi.toFixed(4), 'yellow')}
${line} │ 📱 Número    : ${color(sender.split('@')[0], 'green')}
${line} │ 🧑 Nome      : ${color(pushname, 'blue')}
${line} │ 💬 Mensagem  : ${color(`${budy}`, 'magenta')}
${line} │ 🕐 Horário   : ${color(time, 'orange')}
${line} ╰──────────────────────────────╯\n`
)


//DEFINIÇÕES 

const reagir = async (idgp, emj) => {
await client.sendMessage(idgp, {react: {text: emj, key: info.key}});
}

const nescj = "./dono/settings/nescessario.json";

function setNes(index){
fs.writeFileSync(nescj, JSON.stringify(index, null, 2))}

const isVisualizar = nescessario.visualizarmsg


if(visualizarmsg) {
await client.readMessages([info.key]);
} else {
if(from == "status@broadcast") return;
}

//FIM

switch(command) {

case 'setprefix':
if(!isOwner) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.prefix = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Prefixo alterado para: ${q}`)
break

case 'setnomebot':
if(!isOwner) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.NomeDoBot = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Nome do bot alterado para: ${q}`)
break

case 'setowner':
if(!isOwner) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.NumeroDono = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Numero do dono alterado para: ${q}`)
break

case 'setownername':
if(!isOwner) return reply(`Somente o ${Dono} pode usar esse comando`)
settings.NomeDoDono = q
fs.writeFileSync('./dono/settings.json', JSON.stringify(settings, null, '\t'))
reply(`Nome do dono alterado para: ${q}`)
break

case "fotomenu":
if (!isOwner) return reply("Esse comando e so para o dono do bot.")
if (!isQuotedImage) return reply("Marque uma imagem para a foto do menu.")
try {
if ((isMedia && !info.message.videoMessage || isQuotedImage) && !q.length <= 1) {
    reply(`Calma ae amigo(a), já estou trocando a foto do menu para você..`);
boij = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
const boijzin = await getFileBuffer(boij, "image")
const link = await upload(boijzin)
ftmenu.logo.splice(0, ftmenu.logo.length);
setTimeout(async () => {
ftmenu.logo.push(link);
fs.writeFileSync('./arquivos/docs/logos.json', JSON.stringify(ftmenu, null, 2));
reply(`A foto do menu foi alterada com sucesso para: *${ftmenu.logo}*`);
    }, 1200);
  }
} catch (e) { 
return reply(`Erro no comando! tente novamente mais tarde.\n${e}`)
console.log("Erro:", e)
}
break

case 'visualizarmsg':
if(!isOwner) return reply(resposta.dono)
if(!isVisualizar) {
nescessario.visualizarmsg = true
setNes(nescessario)
reply('Ativou com sucesso o recurso de visualizar todas as mensagens enviada em grupos e privado')
} else if(isVisualizar) {
nescessario.visualizarmsg = false
setNes(nescessario)
reply('Desativou com sucesso o recurso de visualizar todas as mensagens enviada em grupos e privado')
} else {
reply('1 para ativar, 0 para desativar')
}
break

case "imgpralink":
if (!isQuotedImage) return reply("Marque uma imagem para gerar a imagem!")
 if ((isMedia && !info.message.videoMessage || isQuotedImage) && q.length <= 1) {
boij = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
const Buffer = await getFileBuffer(boij, "image")
const UpUrlLink = await upload(Buffer)
reply(UpUrlLink)
} 
else 
if ((isMedia && info.message.videoMessage.seconds < 30 || isQuotedVideo && info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 30) && q.length <= 1) {
const boij = isQuotedVideo? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.videoMessage: info.message.videoMessage;
const owgi = await getFileBuffer(boij, 'video');
 const res = await upload(owgi); 
return reply(res)
} else {
reply("Você deve marcar uma imagem ou um vídeo de até 30 segundos.");
}
break;



case 'play':
if (!q) return reply('🎵 Envie o nome da música.')
reply('🔎 Buscando a música...')
try {
const ytSearch = await fetch(`${ApiSett2}/api/pesquisas/youtube?query=${encodeURIComponent(q)}`)
const ytJson = await ytSearch.json()
const videoUrl = ytJson.resultado.url
const res = await fetch(`https://api.nexfuture.com.br/api/downloads/youtube/mp3/v3?url=${encodeURIComponent(videoUrl)}`)
const json = await res.json()
const audio = json.download.downloadLink
const LEGUL = `
🎶 *Titulo: ${ytJson.resultado.titulo}*
📺 *Canal: ${ytJson.resultado.canal}*
⏱️ *Tempo:${ytJson.resultado.duracao}
*`
await client.sendMessage(from, {image: { url:ytJson.resultado.imagem },caption: LEGUL,})
await client.sendMessage(from, {audio: { url: audio }, mimetype: 'audio/mp4'
})
} catch (e) {
console.error('Erro ao buscar ou baixar música:', e)
reply('❌ Deu erro ao tentar baixar a música.')
  }
  break

case 'igdl':
if(!q) return reply('Cade o link?')
try {
const instavideo = await getBuffer(`${ApiSett2}/downloads/instagram/mp4?url=${q}`)
client.sendMessage(from,{video: instavideo}, {quoted:info})
} catch (e) {
return console.log(`${e}`)
}
break

case 'pinterest':
if(!q) return reply('Cade a palavra?')
reply("*Aguarde um momento...*")
try {
const pinterestz = await getBuffer(`${ApiSett2}/pesquisas/pinterest?query=${q}`)
client.sendMessage(from,{image:pinterestz},{quoted:info})
} catch (e) {
return console.log(`${e}`)
}
break

case 'metadinha':
case 'metadinha2':
case 'metadinha3':
if (!isGroup) return reply(resposta.grupo)
anuu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
random = anuu[Math.floor(Math.random() * anuu.length)]
let buttonssMessssage = {
image: { url: random.male },
caption: ``,
footer: `${NomeDoBot}`,
headerType: 4
}
await client.sendMessage(from, buttonssMessssage, { quoted: selo }).catch(err => {
return ('Error!')
})
let buttonssMesssage = {
image: { url: random.female },
caption: ``,
footer: `${NomeDoBot}`,
headerType: 4
}
await client.sendMessage(from, buttonssMesssage, { quoted: selo }).catch(err => {
return ('Error!')
})
break

case 'figurinhas':
if(!q) return reply(`Digite a quantidade de figurinhas\nExemplo: ${prefix+command} 7`)
if(q >= 100) return reply("Coloque abaixo de 100...")
if(!isGroup) return reply(`As figurinhas estão sendo enviadas em seu pv olha la😁.`)
async function figuss() {
var rnd = Math.floor(Math.random() * 8051)
client.sendMessage(sender, { sticker: { url: `https://raw.githubusercontent.com/badDevelopper/Testfigu/main/fig (${rnd}).webp` } })}
for (i = 0; i < q; i++) {
await sleep(680)
figuss()
}
break


case 's': 
case 'f': 
case 'sgif': 
case 'sticker': {
if (!isQuotedImage && !isQuotedVideo) return reply(`Marque um video ou imagem com o comando ${prefix + command}`)
if(isQuotedImage) {
boij = isQuotedImage ? info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : info.message.imageMessage
imgbuff = await getFileBuffer(boij, 'image')
imgname = getRandom('.'+await getExtension(boij.mimetype))
fs.writeFileSync(imgname, imgbuff)
ran = getRandom('.webp')
exec(`ffmpeg -i ${imgname} -vf scale=512:512 ${ran}`, async function(err, result) {
sti = fs.readFileSync(ran)
await client.sendMessage(from, {sticker: sti, contextInfo:{packname: `Solicitou:\nDono:\nFeito por:`, author: `${pushname}\n${NomeDoDono}\n${NomeDoBot}`}}, {quoted: info})
fs.unlinkSync(imgname)
await fs.unlinkSync(ran)
})
} else if(isQuotedVideo) {
boij = isQuotedVideo ? info.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : info.message.videoMessage
imgbuff = await getFileBuffer(boij, 'video')
imgname = getRandom('.'+await getExtension(boij.mimetype))
fs.writeFileSync(imgname, imgbuff)
ran = getRandom('.webp')
exec(`ffmpeg -i ${imgname} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${ran}`, async function(err){
sti = fs.readFileSync(ran)
await client.sendMessage(from, {sticker: sti}, {quoted: info})
fs.unlinkSync(imgname)
await fs.unlinkSync(ran)
})
}
}
break


case 'glitch':
case 'write':
case 'advancedglow':
case 'typography':
case 'pixelglitch':
case 'neonglitch':
case 'flag':
case 'flag3d':
case 'deleting':
case 'blackpink':
case 'glowing':
case 'underwater':
case 'logomaker':
case 'cartoon':
case 'papercut':
case 'watercolor':
case 'effectclouds':
case 'blackpinklogo':
case 'gradient':
case 'summerbeach':
case 'luxurygold':
case 'multicoloredneon':
case 'sandsummer':
case 'galaxywallpaper':
case '1917':
case 'makingneon':
case 'royal':
case 'freecreate':
case 'galaxy':
case 'darkgreen':
case 'lighteffects': 
case 'dragonball':
case 'neondevil':
case 'frozen':
case 'wooden3d':
case 'metal3d':
case 'ligatures':
case '3druby':
case 'sunset':
case 'cemetery':
case 'halloween':
case 'horror':
case 'blood':
case 'joker':
case 'clouds':
if (!isGroup) return reply("Comando so para grupo!")
textin = args.join(" ") 
if(!textin) return reply("Você precisa acrescentar um texto!")
try {
reply("estou gerando o seu logo com o título informado... ")
let logos = await getBuffer(`${ApiSett2}/api/logos/${command}?texto=${q}`)
await client.sendMessage(from, 
{image: logos}, 
{quoted: selo})
} catch (error) {
console.log(error)
reply(" deu erro na solicitação ")
}
break


case 'menu':
client.sendMessage(from,{image:{url: ftmenu.logo},caption: menu(prefix, NumeroDono, NomeDoDono, pushname, NomeDoBot)},{quoted:info})
break
            
            
default:

if(isCmd) {
reagir(from, "❌️")
error = `
╭═══ ⪩ 𝙀𝙍𝙍𝙊 𝙎𝙄𝙉𝙄𝙎𝙏𝙍𝙊 ⪨ ═══
┃ ✖️ Comando *desconhecido*...
┃ ━━━━━━━━━━━━━━━━━━━
┃ ⚙️ » *${prefix + command}* não foi reconhecido.
┃ 🕷️ » Use *${prefix}menu* para acessar os comandos.
╰═══════════════════════⪨`
reply(error)
}

if (budy.startsWith('>')) {
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
await reply(String(err))
}
}

}
    } catch (err) {
        console.log(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Atualizado= ${__filename}`))
	delete require.cache[file]
	require(file)
})