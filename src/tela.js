//metódos estáticos não podem acessar o 'this'
//Por isso não vamos colocar o util no constructor

const util = Util


const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"
const MENSAGEM = {
    sucesso: {
        texto: 'Combinação correta!',
        classe: 'alert-success'
    },
    erro: {
        texto: 'Combinação incorreta!',
        classe: 'alert-danger'
    }
}
class Tela{
    
    static obterCodigoHtml(item){
        return `
        <br/>
        <div class="col-md-3">
            <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="Icone-heroi">
            </div>
        </div>
        <br/> 
        `
    }
    static configurarBotaoJogarVerificarSelecao(funcaoOnclick){
        window.verificarSelecao = funcaoOnclick
    }
    static alterarConteudoHtml(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }
    //Para cada item da lista, vai executar a funcão obterCodigoHtml
    //ao final, vai concatenar tudo em uma unica string
    //muda de arrary para string 
    static gerarStringPelaImagem(itens){
        return itens.map(Tela.obterCodigoHtml).join('')
    }
    static atualizarImagens(itens){
        const codigoHtml = Tela.gerarStringPelaImagem(itens)
        Tela.alterarConteudoHtml(codigoHtml)
    }
    static configurarBotaoJogar(funcaoOnclick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnclick
    }
    static exibirHerois(nomeDoHeroi, img){
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        //Para cada elemento encontrado na tela, vamos
        //alterar a imagem para imagen inicial dele
        elementosHtml.forEach(item => (item.src = img))
    }
    static async exibirMensagem(sucesso = true){
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso){
            elemento.classList.remove(MENSAGEM.erro.classe)
            elemento.classList.add(MENSAGEM.sucesso.classe)
            elemento.innerText = MENSAGEM.sucesso.texto
        }else{
            elemento.classList.remove(MENSAGEM.sucesso.classe)
            elemento.classList.add(MENSAGEM.erro.classe)   
            elemento.innerText = MENSAGEM.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }    
    static exibirCarregando(mostrar = true){
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }
    static iniciarContador(){
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
        const atualizarTexto = () =>
        (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))

        atualizarTexto()
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }
    static limparContador(idDoIntervalo) {
        clearInterval(idDoIntervalo)

        document.getElementById(ID_CONTADOR).innerHTML = ""
    }
    static configurarBotaoMostrarTudo(funcaoOnclick){
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnclick
    }
}
