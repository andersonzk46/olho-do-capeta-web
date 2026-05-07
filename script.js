function startScan() {

const logs =
document.getElementById("logs")

logs.innerHTML = ""

const mensagens = [

"INICIANDO SCANNER...",

"VERIFICANDO SISTEMA...",

"ANALISANDO INTEGRIDADE...",

"PROCURANDO MODIFICAÇÕES...",

"SISTEMA PROTEGIDO."
]

let i = 0

const interval = setInterval(() => {

if (i >= mensagens.length) {

clearInterval(interval)

return
}

logs.innerHTML +=
`<p>${mensagens[i]}</p>`

i++

}, 1200)
}