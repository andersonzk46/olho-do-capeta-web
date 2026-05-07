function startScan() {

const logs =
document.getElementById("logs")

logs.innerHTML = ""

const horario =
new Date().toLocaleString()

const atividades = [

"[+] INICIANDO SCAN...",
"[+] VERIFICANDO SISTEMA...",
"[+] ANALISANDO INTEGRIDADE...",
"[+] VERIFICANDO CONFIGURAÇÕES...",
"[+] VERIFICANDO ARQUIVOS SUSPEITOS...",
"[+] GERANDO RELATÓRIO..."
]

let i = 0

const interval = setInterval(() => {

if (i >= atividades.length) {

clearInterval(interval)

logs.innerHTML += `

<hr>

<h3>RELATÓRIO FINAL</h3>

<p>
STATUS: SISTEMA PROTEGIDO
</p>

<p>
HORÁRIO: ${horario}
</p>

<p>
ATIVIDADES ANALISADAS:
</p>

<ul>

<li>Integridade do sistema</li>

<li>Arquivos suspeitos</li>

<li>Configurações do navegador</li>

<li>Sessão ativa</li>

</ul>

`

return
}

logs.innerHTML +=
`<p>${atividades[i]}</p>`

i++

}, 1200)
}