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

"[+] GERANDO RELATÓRIO..."
]

let i = 0

const interval = setInterval(async () => {

if (i >= atividades.length) {

clearInterval(interval)

let ip = "Não identificado"

try {

const resposta =
await fetch("https://api.ipify.org?format=json")

const data =
await resposta.json()

ip = data.ip

} catch {

ip = "Erro ao obter IP"
}

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
IP DETECTADO:
${ip}
</p>

<p>
REDE ANALISADA:
</p>

<ul>

<li>Conexão ativa</li>

<li>Possível uso de proxy/VPN</li>

<li>Status da sessão</li>

<li>Integridade do navegador</li>

</ul>

`

return
}

logs.innerHTML +=
`<p>${atividades[i]}</p>`

i++

}, 1200)
}