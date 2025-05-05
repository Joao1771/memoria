function ai(){
    alert("AAAAAAAAAAAAAAA")
}
function rodar(){
    const cartas = document.querySelectorAll(".carta")
    function rand(min = 0, max = 255){
        return Math.random() * (max - min) - min
    }
    function pintar(){
        let cores = []
        let cont = 0
        let corEscolhida
        while (cont<cartas.length / 2){ // enquanto for a metade do total das cartas
            corEscolhida = `rgb(${rand()},${rand()},${rand()})`
            cores.push(corEscolhida,corEscolhida) // coloca uma cor em cores
            cont+= 1
        }
        for(let carta of cartas){
            corEscolhida = cores[Math.floor(rand(0,cartas.length / 2))]
            carta.style.background = corEscolhida // coloca a cor no background de cada carta
            // aqui precisa tirar a cor de cores para ela se repetir só duas vezes
        }
    }
    pintar()
}