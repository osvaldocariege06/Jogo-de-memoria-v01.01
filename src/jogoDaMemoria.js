
class JogoDaMemoria{
    // se mandar um obj = {tela. 1, idade: 2, etc: 3}
    //vai ignoraro resto  das propriedades e pegar apenas a propriedade
    //tela
    constructor({tela, util}){
        this.tela = tela
        this.util = util

        // caminho sempre relativo ao index.html
        this.heroisIniciais = [
            {img: '../assets/img/batman.png', nome: 'batman'},
            {img: '../assets/img/spider-men.png', nome: 'spider-men'},
            {img: '../assets/img/harlequina.png', nome: 'harlequina'},
            {img: '../assets/img/deadpool.png', nome: 'deadpool'} 

        ]
        this.iconePadrao = '../assets/img/padrao.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
    // Para usar o this, não precisamos do static
    inicializar(){
        //Vai pegar todas as funcões da classe tela
        //Coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        //Força a tela a usar  o THIS de jogo da memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoJogarVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }
    async embaralhar(){
        const copias = this.heroisIniciais
        //Duplicar os itens 
        .concat(this.heroisIniciais)
        //Entrar em cada id e criar um id aleatorio
        .map(item =>{
            return Object.assign({}, item, {id: Math.random() / 0.5})
        })
        //Ordenar aleatoriamente
        .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()
        //Vamos esperar 1 segundo para  atualizar a tela 
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        
    }
    esconderHerois(herois){
        //Vamos trocar todas as imagens de todos os herois existentes
        //pelo icone padrao
        //Como fizemos no constructor, vamos extrair
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        //Atualizamos a tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)


        //Guardamos os herois para trabalhar com eles depois 
        this.heroisEscondidos = heroisOcultos
    }
    exibirHerois(nomeDoHeroi){
        //Procurar o nome do heroi 
        // e obter apenas a imagem do heroi
        const {img} = this.heroisIniciais.find(({nome})=> nomeDoHeroi === nome)
        //Vamos criar uma funcão para mostrar o heroi selecionado
        this.tela.exibirHerois(nomeDoHeroi, img)
    }
    verificarSelecao(id, nome){
        const item = {id, nome}
        //Vamos verificar a quantidade de  herois  selecionados 
        // e tomar ação se escolher certo ou errado
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados){
            case 0: 
            //Adiciona a escolha  na lista, esperando pela proxima clicada
            this.heroisSelecionados.push(item)
                break;
            case 1:
                const [opcao1] = this.heroisSelecionados
                //Zerar item para não selecionar mais de 2
                this.heroisSelecionados = []
                //Conferimos se os nomes e ids batem conforme
                //o esperado
                if(opcao1.nome === item.nome && opcao1.id !== item.id){
                    //alert('Combinação correta! ' + item.nome)
                    this.exibirHerois(item.nome)
                    //como o padrão é true, não precisa passar nada
                    this.tela.exibirMensagem()
                    //Pará a execução
                    return;
                }
                this.tela.exibirMensagem(false)
                //Fim do case
                break

        }
    }
    mostrarHeroisEscondidos(){
        const heroisEscondidos = this.heroisEscondidos
        for (const herois of heroisEscondidos) {
            const {img} = this.heroisIniciais.find(item => item.nome == herois.nome)
            herois.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }
    jogar(){
        this.embaralhar() 
    }
    

}



  
