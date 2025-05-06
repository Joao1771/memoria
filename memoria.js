function ai(){
    alert("AAAAAAAAAAAAAAA")
}
function rodar(){
    const cartas = document.querySelectorAll(".verso")
    let fundos = []
    let cont = 0
    function rand(min = 0, max = 255){
        return Math.random() * (max - min) - min
    }
    function voltarAnimacao(){
        const body = document.querySelector("body")
        body.classList.remove("no-animation")
    }
    setTimeout(voltarAnimacao,500)
    // função responsável por colocar background, randomizar e salvar no array "fundos" as cores 
    // escolhidas
    function pintar(){
        let cores = []
        let corEscolhida
        while (cont<cartas.length / 2){ // enquanto for a metade do total das cartas
            corEscolhida = `rgb(${Math.floor(rand())},${Math.floor(rand())},${Math.floor(rand())})`
            cores.push(corEscolhida,corEscolhida) // coloca uma cor em cores
            cont+= 1
        }
        cont = 0
        for(let carta of cartas){
            corEscolhida = Math.floor(rand(0,cores.length)) //escolhe um número entre 0 e cartas.length
            carta.style.background = cores[corEscolhida] // coloca a cor no background de cada carta
            fundos.push(cores[corEscolhida])
            cores.splice(cores.indexOf(cores[corEscolhida]), 1)
        }
    }
    pintar()
}