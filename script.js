let risco = 0

function detectarDevTools() {

setInterval(() => {

const widthThreshold =
window.outerWidth - window.innerWidth > 160

const heightThreshold =
window.outerHeight - window.innerHeight > 160

if (widthThreshold || heightThreshold) {

risco += 25
}

}, 1000)
}

function detectarAmbienteSuspeito() {

const ua =
navigator.userAgent.toLowerCase()

if (ua.includes("headless")) {

risco += 40
}

if (!navigator.cookieEnabled) {

risco += 10
}

if (!navigator.onLine) {

risco += 15
}
}

async function analisarRede() {

const inicio = performance.now()

try {

await fetch(
"https://api.ipify.org?format=json"
)

const fim = performance.now()

const tempo = fim - inicio

if (tempo > 1000) {

risco += 20
}

} catch {

risco += 15
}
}

async function startScan() {

const logs =
document.getElementById("logs")

logs.innerHTML = ""

risco = 0

const horario =
new Date().toLocaleString()

const atividades = [

"[+] INICIANDO SCANNER...",

"[+] VERIFICANDO REDE...",

"[+] ANALISANDO CONEXÃO...",

"[+] ANALISANDO LATÊNCIA...",

"[+] VERIFICANDO POSSÍVEL VPN...",

"[+] ANALISANDO NAVEGADOR...",

"[+] VERIFICANDO INTEGRIDADE...",

"[+] GERANDO RELATÓRIO..."
]

detectarAmbienteSuspeito()

await analisarRede()

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

const conexao =
navigator.onLine
? "ONLINE"
: "OFFLINE"

const navegador =
navigator.userAgent

let status = "BAIXO"

if (risco >= 30) {

status = "MÉDIO"
}

if (risco >= 60) {

status = "ALTO"
}

const relatorio = `

OLHO DO CAPETA IOS

Criado por @andersonnzk46

STATUS:
${status}

RISCO:
${risco}/100

HORÁRIO:
${horario}

REDE:
${conexao}

IP:
${ip}

NAVEGADOR:
${navegador}

ANÁLISE:
- Ambiente monitorado
- Rede analisada
- Navegador verificado
- Sessão ativa

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

`

return
}

logs.innerHTML +=
`<p>${atividades[i]}</p>`

i++

}, 1200)
}

detectarDevTools()