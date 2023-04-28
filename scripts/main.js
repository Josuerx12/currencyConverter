const urlMoedas = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=200&$skip=0&$format=json&$select=simbolo,nomeFormatado,tipoMoeda'

//variaveis globais do documento
const moedasSelect = document.querySelectorAll('select')
const btn = document.querySelector('.btn')
const display = document.getElementById('resultado')

async function listDeMoedas() {
    await axios.get(urlMoedas)
        .then((response) => {   
            //variaveis globais da função
            const values = response.data.value
            console.log(values)
            //event
            document.addEventListener('load', showValues())
        
            function showValues() {
                values.map((valores) => {
                    const newHtml = `
                        <option value="${valores.simbolo}">${valores.simbolo} - ${valores.nomeFormatado}</option>
                    `
                    moedasSelect[0].innerHTML += newHtml
                    moedasSelect[1].innerHTML += newHtml
                })
            }
    })
        .catch(error => console.error('Api não carregou!'))
}
listDeMoedas()

btn.addEventListener('click', function calculator() {
    const moedaOrigem = document.getElementById('moeda1')
    const moedaDestino = document.getElementById('moeda2')
    const input = document.getElementById('valoraserconvertido')
    //axios create
    let moedaOrigemValue = moedaOrigem.value
    let moedaDestinoValue = moedaDestino.value
    let inputValue = input.value.replace(',','.')

    console.log(inputValue)

    const api = axios.create ({
        baseURL: 'https://api.apilayer.com/exchangerates_data/',
        headers: {'apikey': 'ukcHwJLTgc9KXOTt77cGXWMTTeDUHp2G'},
    })
        async function ValuesCurrency() {
            await api.get(`convert?to=${moedaDestinoValue}&from=${moedaOrigemValue}&amount=${inputValue}`)
            .then((response) => {
                const resultadoAPI = response.data.result
                const resultado = resultadoAPI.toFixed(2)
                console.log(resultado)
                display.value = resultado
            })
            .catch(error => console.error(`Falhou carregamento dos valores das moedas`))
        }
    ValuesCurrency()
})