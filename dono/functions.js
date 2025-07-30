const chalk = require('chalk')
const fs = require('fs')
const cfonts = require('cfonts')
const FormData = require('form-data');
const axios = require('axios');
const { fromBuffer } = require('file-type');
const mimetype = require('mime-types');

async function upload(buffer) {
try {
const { ext } = await fromBuffer(buffer);
const form = new FormData();
form.append("reqtype", "fileupload");
form.append("fileToUpload", buffer, {
filename: `imagem.${ext}`,
contentType: `image/${ext}`,
});
const res = await axios.post("https://catbox.moe/user/api.php", form, {
headers: form.getHeaders(),
 timeout: 10000,
});
if (!res.data.startsWith("https://")) throw new Error(res.data);
return res.data;
} catch (err) {
console.error("❌ Erro no upload:", err.response?.data || err.message);
return "❌ Erro ao enviar imagem!";
}
}


const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == 'admin') admins.push(i.id)
if(i.admin == 'superadmin') admins.push(i.id)
}
return admins
}


const getBuffer = async (url, opcoes) => {
try {
opcoes ? opcoes : {}
const post = await axios({
method: "get",
url,
headers: {
'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...opcoes,
responseType: 'arraybuffer'
})
return post.data
} catch (e) {
console.log(e)
}}

const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})
});


const banner = cfonts.render(('Tony|Bot'), {
font: 'block',
color: 'system',
align: 'center',
gradient: ["red","yellow"],
lineHeight: 2
})

const getExtension = async (type) => {
return await mimetype.extension(type)
}

const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`;
};

module.exports = { banner, getGroupAdmins, upload, getBuffer, fetchJson, getExtension, getRandom}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bold(`\n\n• O arquivo "${__filename}" foi atualizado.\n`));
delete require.cache[file]
require(file)
});


