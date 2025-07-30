const fs = require('fs')
const chalk = require('chalk')

const ftmenu = JSON.parse(fs.readFileSync("./arquivos/docs/logos.json"))


function DLT_FL(file) {
try { 
fs.unlinkSync(file) 
} catch (error) {
}}


module.exports = { ftmenu, DLT_FL }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Atualizado= ${__filename}`))
delete require.cache[file]
require(file)
})