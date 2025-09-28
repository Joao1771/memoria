function rodar(){
    const mesa = document.querySelector(".mesa")
    const versos = document.querySelectorAll(".verso")
    const cartas = Array.from(document.querySelectorAll(".carta"))

    let removidas = 0
    let espera = false
    let n = 0
    let cor = ""
    let pontos = 0
    let calma
    let segundos = 0
    let animais = 
        ["media/cartas/arara.jpg","media/cartas/bemtevi.jpg","media/cartas/leao.jpg",
        "media/cartas/hipopotamo.jpg","media/cartas/cavalo.jpg","media/cartas/touro.jpg",
        "media/cartas/onca.jpg","media/cartas/tigre.jpg","media/cartas/gato.jpg",
        "media/cartas/picapau.jpg","media/cartas/flamingo.jpg","media/cartas/guepardo.jpg",
        "media/cartas/cachorro.jpg","media/cartas/elefante.jpg","media/cartas/escorpiao.jpg",
        "media/cartas/arara.jpg","media/cartas/bemtevi.jpg","media/cartas/leao.jpg",
        "media/cartas/hipopotamo.jpg","media/cartas/cavalo.jpg","media/cartas/touro.jpg",
        "media/cartas/onca.jpg","media/cartas/tigre.jpg","media/cartas/gato.jpg",
        "media/cartas/picapau.jpg","media/cartas/flamingo.jpg","media/cartas/guepardo.jpg",
        "media/cartas/cachorro.jpg","media/cartas/elefante.jpg","media/cartas/escorpiao.jpg"]

    function rand(min = 0, max = 30){
        return Math.floor(Math.random() * (max - min) - min)
    }

    //função só para não trigar o css antes de carregar
    function voltarAnimacao(){
        const body = document.querySelector("body")
        body.classList.remove("no-animation")
    }
    setTimeout(voltarAnimacao,500)

    //função responsável por voltar as cartas em 6s após duas serem escolhidas
    function voltarCartas(elemento){
        espera = true
        setTimeout(()=>elemento.classList.remove("girar"),600)
        setTimeout(()=>espera = false,650)
    }

    //função que expõe a div win e diz os segundos que demorou para acabar o jogo
    function ganhou(){
        const win = document.querySelector("#win")
        const p = win.querySelector("p")
        const fundo = document.querySelector("#fundo")
        win.classList.add("win")
        fundo.classList.add("fundo")
        p.innerHTML = "Você ganhou! Tempo: " + tempoSegundos() + " segundos. <br> Jogo feito por João Flávio"
    }

    //função que só retorna o tempo em segundos quando é ativada
    function tempoSegundos(){
        setInterval(()=> segundos++,1000)
        return segundos
    }
    tempoSegundos()
    
    //função que cria e aumenta uma pontuação. Também cria um +1 e põe classe que sobe
    function pontuacao(){
        const pPontos = document.querySelector(".pontos")
        const pFlutuante = document.querySelector("#p")
        const TempoAnimacao = 2000
        if(calma){
            setTimeout(maisum,TempoAnimacao)
            return
        }
        calma = true
        maisum()
        function maisum(){
            pFlutuante.innerText = "+1"
            pFlutuante.classList.add("pts-flutuante")
            pontos++
            pPontos.innerHTML = pontos
            console.log("rodei")

            setTimeout(() => {
            pFlutuante.classList.remove("pts-flutuante")
            pFlutuante.innerText = ""
            calma = false
            },TempoAnimacao)
        }
    }

    // função responsável por colocar background e randomizar os fundos das cartas
    function colocarFundos(){ // co
        for(let carta of versos){
            animalEscolhido = animais[rand(0,animais.length)] //escolhe um elemento de indice rand(0 ate tamanho de animais)
            carta.style.backgroundImage = `url(${animalEscolhido})` // poe o fundo
            animais.splice(animais.indexOf(animalEscolhido), 1) // tira o elemento de animais
        }
    }
    colocarFundos()

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
             cor = cartaEscolhida.style.backgroundImage
        }else{
            if(cartaEscolhida.style.backgroundImage == cor) removerCartas()
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