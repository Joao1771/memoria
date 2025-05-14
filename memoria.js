function rodar(){
    const mesa = document.querySelector(".mesa")
    const versos = document.querySelectorAll(".verso")
    const cartas = Array.from(document.querySelectorAll(".carta"))
    let fundos = []
    let cont = 0
    let removidas = 0
    let espera = false
    let n = 0
    let cor = ""
    let pontos = 0

    function rand(min = 0, max = 255){
        return Math.random() * (max - min) - min
    }

    function voltarAnimacao(){
        const body = document.querySelector("body")
        body.classList.remove("no-animation")
    }

    function voltarCartas(elemento){
        espera = true
        setTimeout(()=>elemento.classList.remove("girar"),600)
        setTimeout(()=>espera = false,650)
    }

    function ganhou(){
        alert("parabens!")
    }

    function pontuacao(){
        const Ppontos = document.querySelector(".pontos")
        const p = document.createElement("p")
        p.innerText = "+1"
        p.classList.add("pts-flutuante")
        pontos++
        Ppontos.innerHTML = pontos
        Ppontos.append(p)
        setTimeout(()=>Ppontos.removeChild(p))
    }
    setTimeout(voltarAnimacao,500)

    // função responsável por colocar background, randomizar e salvar no array "fundos" as cores 
    // escolhidas
    function pintar(){
        let cores = []
        let corEscolhida
        while (cont<versos.length / 2){ // enquanto for a metade do total das cartas
            corEscolhida = `rgb(${Math.floor(rand())},${Math.floor(rand())},${Math.floor(rand())})`
            cores.push(corEscolhida,corEscolhida) // coloca uma cor em cores
            cont++
        }
        cont = 0
        for(let carta of versos){
            corEscolhida = Math.floor(rand(0,cores.length)) //escolhe um número entre 0 e cartas.length
            carta.style.background = cores[corEscolhida] // coloca a cor no background de cada carta
            fundos.push(cores[corEscolhida])
            cores.splice(cores.indexOf(cores[corEscolhida]), 1)
        }
    }
    pintar()

    // "remove" os pares de cartas iguais (igual no jogo de memória mesmo)
    function removerCartas(){
        for(carta of document.querySelectorAll(".girar")){
            carta.classList.add("removida")
        }
        pontuacao()
        removidas++
        if(removidas == cartas.length / 2) ganhou()
    }

    //gira a carta escolhida, não gira se for a mesma e limita em duas para voltarem como estavam
    function girar(elemento){
        let cartaEscolhida = elemento.querySelector(".verso")

        if(!elemento.classList.contains("girar")){
            elemento.classList.add("girar")
            n++
        }else return
        if(n < 2){
             cor = cartaEscolhida.style.background
        }else{
            if(cartaEscolhida.style.background == cor) removerCartas()
        }
        for(let carta of cartas){
            if(n >= 2 && carta.classList.contains("girar")){
                voltarCartas(carta)
            }
        }
        if(n >= 2) n = 0
    }

    mesa.addEventListener("click", function(e){
        const cartaClick = e.target.closest(".carta")

        if(cartaClick && cartas.includes(cartaClick) && !espera){
            girar(cartaClick)
        }
    })
}