let risco = 0

function detectarDevTools() {

setInterval(() => {

const widthThreshold =
window.outerWidth - window.innerWidth > 160

const heightThreshold =
window.outerHeight - window.innerHeight > 160

if (widthThreshold || heightThreshold) {

console.log("DEVTOOLS DETECTADO")

risco += 15
}

}, 1000)
}

function exportarRelatorio(texto) {

const blob =
new Blob([texto], {type:"text/plain"})

const link =
document.createElement("a")

link.href =
URL.createObjectURL(blob)

link.download =
"relatorio_olho_do_capeta.txt"

link.click()
}

async function startScan() {

const logs =
document.getElementById("logs")

if (!logs) {

alert("ERRO NO SISTEMA")

return
}

logs.innerHTML = ""

risco = 0

const horario =
new Date().toLocaleString()

const atividades = [

"[+] INICIANDO SCANNER...",

"[+] VERIFICANDO REDE...",

"[+] ANALISANDO CONEXÃO...",

"[+] VERIFICANDO POSSÍVEL VPN...",

"[+] ANALISANDO SESSÃO...",

"[+] VERIFICANDO INTEGRIDADE...",

"[+] ANALISANDO DESEMPENHO...",

"[+] GERANDO RELATÓRIO..."
]

let i = 0

const interval = setInterval(async () => {

if (i >= atividades.length) {

clearInterval(interval)

let ip = "Não identificado"

try {

const resposta =
await fetch(
"https://api.ipify.org?format=json"
)

const data =
await resposta.json()

ip = data.ip

} catch {

ip = "Erro ao obter IP"
}

const navegador =
navigator.userAgent

const conexao =
navigator.onLine
? "ONLINE"
: "OFFLINE"

const relatorio = `

OLHO DO CAPETA IOS

Criado por @andersonnzk46

STATUS:
MONITORAMENTO CONCLUÍDO

HORÁRIO:
${horario}

REDE:
${conexao}

IP:
${ip}

RISCO:
${risco}/100

NAVEGADOR:
${navegador}

`

logs.innerHTML += `

<hr style="border-color:red;">

<h2 style="color:red;">
RELATÓRIO FINAL
</h2>

<pre style="
color:red;
white-space:pre-wrap;
font-size:14px;
">

${relatorio}

</pre>

<button onclick="exportarRelatorio(\`${relatorio}\`)">

EXPORTAR RELATÓRIO

</button>

`

return
}

logs.innerHTML +=
`<p>${atividades[i]}</p>`

i++

}, 1200)
}

detectarDevTools()