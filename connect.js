const { 
default:
makeWASocket, AnyMessageContent, BinaryInfo, delay, DisconnectReason, encodeWAM, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, jidDecode, PHONENUMBER_MCC, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } = require('@whiskeysockets/baileys')
const { makeInMemoryStore } = require('@whiskeysockets/baileys/lib/Store')
const { Boom }  = require("@hapi/boom");
const axios = require("axios");
const crypto = require("crypto");
const util = require("util");
const NodeCache = require("node-cache");
const readline = require('readline')
const linkfy = require("linkifyjs");
const chalk = require('chalk');
const request = require("request");
const ms = require("ms");
const FileType = require('file-type');
const ffmpeg = require("fluent-ffmpeg");
const { exec, spawn, execSync } = require("child_process");
const moment = require("moment-timezone");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./arquivos/exif')
const time = moment.tz("America/Sao_Paulo").format("HH:mm:ss");
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss");
const date = moment.tz("America/Sao_Paulo").format("DD/MM/YY");
const P = require('pino')
const MAIN_LOGGER = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` })
const fs = require('fs')
const pino = require('pino')
const cfonts = require('cfonts')
const useMobile = process.argv.includes('--mobile')
const logger = MAIN_LOGGER.child({})
logger.level = 'trace'
const { banner } = require("./dono/functions.js")
const { prefix } = require("./dono/settings.json")

const msgRetryCounterCache = new NodeCache();
const usePairingCode = process.argv.includes("--use-pairing-code")
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

async function startTony() {
const { state, saveCreds } = await useMultiFileAuthState('./Tony-qr')
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(banner.string)
const client = makeWASocket({
version: [2, 3000, 1023223821],
logger: pino({level: "silent"}),
printQRInTerminal: !usePairingCode,
mobile: useMobile,
auth: state,
msgRetryCounterCache,
patchMessageBeforeSending: (message) => {
const requiresPatch = !!(
message?.interactiveMessage
);
if (requiresPatch) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
},
...message,
},
},
};
}
return message;
}
})


if (usePairingCode && !client.authState.creds.registered) {
let phoneNumber = await question(`\nDigite seu número do WhatsApp:\nEx: ${chalk.green("+55 33 9999-9999")}\n${chalk.yellow("➜")} `);
phoneNumber = phoneNumber.replace(/\D/g, '');
const code = await client.requestPairingCode(phoneNumber);
console.log(`Seu código de conexão é: ${chalk.red(code)}\n`);
console.log(`Abra seu WhatsApp, vá em ${chalk.yellow("Aparelhos Conectados > Conectar um novo Aparelho > Conectar usando Número.")}`)
}
		

client.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!client.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
if (mek.key.id.startsWith('FatihArridho_')) return
require("./index.js")(client, mek, chatUpdate, store)
} catch (err) {
console.log(err)
}
});
    

async function getMessage(key){
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id)
return msg?.message
}
return {
conversation: "Tony-base conectado com sucesso!"
}
}
client.ev.on('messages.update', async chatUpdate => {
for(const { key, update } of chatUpdate) {
if(update.pollUpdates && key.fromMe) {
const pollCreation = await getMessage(key)
if(pollCreation) {
const pollUpdate = await getAggregateVotesInPollMessage({
message: pollCreation,
pollUpdates: update.pollUpdates,
})
var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
if (toCmd == undefined) return
var prefCmd = prefix+toCmd
client.appenTextMessage(prefCmd, chatUpdate)
}
}
}
})
    
client.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}
    
client.ev.on('contacts.update', update => {
for (let contact of update) {
let id = client.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})
client.public = true
    
client.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update;
const shouldReconnect = new Boom(lastDisconnect?.error)?.output.statusCode
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { 
console.log(`Arquivo de sessão inválido, exclua a sessão e verifique novamente ${chalk.red(`${reason}|${lastDisconnect?.error}`)}`); client.logout(); }
else 
if (reason === DisconnectReason.connectionClosed) {
console.log("Conexão encerrada, reconectando...."); startTony(); 
}
else 
if (reason === DisconnectReason.connectionLost) { 
console.log("Conexão perdida do servidor, reconectando..."); 
startTony(); 
}
else 
if (reason === DisconnectReason.connectionReplaced) { 
console.log("Conexão substituída, outra nova sessão aberta, feche a sessão atual primeiro"); 
client.logout();
}
else 
if (reason === DisconnectReason.loggedOut) { 
console.log(`Dispositivo desconectado, verifique novamente e execute.`); 
client.logout(); 
}
else 
if (reason === DisconnectReason.restartRequired) { console.log("Nessesario reiniciar, reiniciando..."); 
startTony();
 }
else 
if (reason === DisconnectReason.timedOut) { 
console.log("Nessesario reiniciar, reiniciando..."); startTony(); 
}
else
if (reason === DisconnectReason.Multidevicemismatch) { 
console.log("Erro escaneie novamente"); 
client.logout();
}
else 
client.end(`Motivo Desconectado Desconhecido: ${reason}|${connection}`)
} 
if (update.connection == "open" || update.receivedPendingNotifications == "true") {
console.log(`${chalk.red("➜")} ${chalk.yellow("Tony-base conectado com sucesso!")}`);
}
});
  
client.ev.on("creds.update", saveCreds);
client.downloadAndSaveMediaMessage = async (message, filename, 
attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}
client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await client.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
rl.close()
return client;
}
startTony()