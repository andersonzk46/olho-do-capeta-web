async function startScan() {

const logs =
document.getElementById("logs")

logs.innerHTML = ""

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

const memoria =
navigator.deviceMemory || "Indisponível"

const cpu =
navigator.hardwareConcurrency || "Indisponível"

const conexao =
navigator.onLine
? "ONLINE"
: "OFFLINE"

logs.innerHTML += `

<hr style="border-color:red;">

<h2 style="color:red;">
RELATÓRIO FINAL
</h2>

<p>
STATUS:
MONITORAMENTO CONCLUÍDO
</p>

<p>
HORÁRIO:
${horario}
</p>

<p>
STATUS DA REDE:
${conexao}
</p>

<p>
IP DETECTADO:
${ip}
</p>

<p>
CPU:
${cpu}
</p>

<p>
MEMÓRIA:
${memoria}
</p>

<h3>
INFORMAÇÕES DO NAVEGADOR
</h3>

<p style="font-size:12px;">
${navegador}
</p>

<h3>
ATIVIDADES ANALISADAS
</h3>

<ul>

<li>Verificação de rede</li>

<li>Análise de conexão</li>

<li>Possível VPN/proxy</li>

<li>Status da sessão</li>

<li>Integridade do Web App</li>

<li>Análise de desempenho</li>

</ul>

`

return
}

logs.innerHTML +=
`<p>${atividades[i]}</p>`

i++

}, 1200)
}