(() => {
  const container = document.getElementById("container");
  const overlay = document.getElementById("overlay");
  const abrirMenu = document.getElementById("abrirMenu");
  const btnVerQuestoes = document.getElementById("btnVerQuestoes");
  const btnSairDesafio = document.getElementById("btnSairDesafio");
  const btnSom = document.getElementById("btnSom");

  const contador = document.getElementById("contador");
  const progresso = document.getElementById("progresso");
  const enunciado = document.getElementById("enunciado");
  const imagemQuestao = document.getElementById("imagemQuestao");
  const alternativas = document.getElementById("alternativas");
  const btnAcao = document.getElementById("btnAcao");
  const statusCarregamento = document.getElementById("statusCarregamento");
  const conteudoQuiz = document.getElementById("conteudoQuiz");
  const textoApoio = document.getElementById("textoApoio");
  const footerBox = document.querySelector(".footer-box");

  const splash = document.getElementById("splash");

  const transicaoFinal = document.getElementById("transicaoFinal");
  const transicaoBarraInterna = document.getElementById("transicaoBarraInterna");

  const telaFinal = document.getElementById("telaFinal");
  const tituloFinal = document.getElementById("tituloFinal");
  const subtituloFinal = document.getElementById("subtituloFinal");
  const porcentagemFinal = document.getElementById("porcentagemFinal");
  const acertosFinal = document.getElementById("acertosFinal");
  const tempoNumero = document.getElementById("tempoNumero");
  const graficoPizza = document.getElementById("graficoPizza");
  const btnRefazer = document.getElementById("btnRefazer");
  const btnVoltarHome = document.getElementById("btnVoltarHome");

  const tempoLimiteMenu = document.getElementById("tempoLimiteMenu");
  const quantidadeQuestoesMenu = document.getElementById("quantidadeQuestoesMenu");
  const tituloMenuMateria = document.getElementById("tituloMenuMateria");
  const tituloTopo = document.getElementById("tituloTopo");
  const modoMenu = document.getElementById("modoMenu");
  const modoBadge = document.getElementById("modoBadge");
  const tempoTopo = document.getElementById("tempoTopo");

  const params = new URLSearchParams(window.location.search);
  const materia = (params.get("materia") || "").toLowerCase();
  const modo = (params.get("modo") || "").toLowerCase();
  const descritor = (params.get("descritor") || "").toUpperCase().trim();

  const CONFIG_MODO = {
    rapido: { nome: "Teste Rápido", quantidade: 5, tempoMinutos: 5, tipo: "materia" },
    mini: { nome: "Mini Simulado", quantidade: 10, tempoMinutos: 15, tipo: "materia" },
    completo: { nome: "Simulado Completo", quantidade: 20, tempoMinutos: 30, tipo: "materia" },
    desafio: { nome: "Desafio", quantidade: 8, tempoMinutos: 10, tipo: "materia" },
    geral_rapido: { nome: "Teste rápido geral", quantidade: 5, tempoMinutos: 5, tipo: "geral" },
    geral_mini: { nome: "Mini simulado geral", quantidade: 10, tempoMinutos: 12, tipo: "geral" },
    simulado_geral: { nome: "Simulado geral", quantidade: 20, tempoMinutos: 25, tipo: "geral" },
    tudao: { nome: "Tudão SAEB", quantidade: 30, tempoMinutos: 40, tipo: "geral" }
  };

  const NOMES_MATERIAS = {
    portugues: "Língua Portuguesa",
    matematica: "Matemática"
  };

  const CORES_ALTERNATIVAS = {
    A: "A",
    B: "B",
    C: "C",
    D: "D"
  };

  let bancoQuestoes = [];
  let treino = [];
  let indiceAtual = 0;
  let acertos = 0;
  let alternativaSelecionada = null;
  let respostaConfirmada = false;
  let tempoInicio = Date.now();
  let timerLimite = null;
  let quizFinalizado = false;
  let respostasRegistradas = [];
  let sonsAtivados = true;
  let marcosConquistaMostrados = [];

  const somAcerto = new Audio("sons/acerto.mp3");
  const somErro = new Audio("sons/erro.mp3");
  const somFinal = new Audio("sons/final.mp3");
  const somConquista = new Audio("sons/conquista.mp3");

  somAcerto.volume = 0.5;
  somErro.volume = 0.5;
  somFinal.volume = 0.6;
  somConquista.volume = 0.65;

        nomeMateria: "Desafio do Dia!",
        modo,
        nomeModo: configuracaoModo.nome,
        quantidade: configuracaoModo.quantidade,
        tempoLimiteSegundos: configuracaoModo.tempoMinutos * 60,
        tipo: "geral",
        descritor: ""
      };
    }

    const nomeMateria = NOMES_MATERIAS[materia];
    if (!nomeMateria) return null;

    return {
      materia,
      nomeMateria,
      modo,
      nomeModo: configuracaoModo.nome,
      quantidade: configuracaoModo.quantidade,
      tempoLimiteSegundos: configuracaoModo.tempoMinutos * 60,
      tipo: "materia",
      descritor
    };
  }

  const config = obterConfiguracao();

  function iniciarSplash() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        splash?.classList.add("hide");
      }, 1600);
    });
  }

  function atualizarTextoBotaoSom() {
    if (!btnSom) return;
    btnSom.textContent = sonsAtivados ? "🔊 Som ligado" : "🔇 Som desligado";
  }

  function tocarSom(audio) {
    if (!sonsAtivados || !audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  function abrirMenuLateral() {
    container?.classList.add("menu-aberto");
  }

  function fecharMenuLateral() {
    container?.classList.remove("menu-aberto");
  }

  function voltarPaginaSegura() {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "home.html";
    }
  }

  function formatarTempo(segundosTotais) {
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = Math.floor(segundosTotais % 60);
    return `${minutos}:${String(segundos).padStart(2, "0")}min`;
  }

  function formatarTempoMenu(segundosTotais) {
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = Math.floor(segundosTotais % 60);
    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
  }

  function atualizarMenuInfo() {
    if (!config) return;

    let tituloMateria = config.nomeMateria;

    if (config.tipo === "materia" && config.descritor) {
      tituloMateria += ` - ${config.descritor}`;
    }

    tituloMenuMateria.textContent = tituloMateria;
    tituloTopo.textContent = tituloMateria;
    modoMenu.textContent = config.nomeModo;
    quantidadeQuestoesMenu.textContent = String(config.quantidade);
    tempoLimiteMenu.textContent = formatarTempoMenu(config.tempoLimiteSegundos);

    if (modoBadge) {
      modoBadge.textContent = config.nomeModo;
    }

    if (tempoTopo) {
      tempoTopo.textContent = formatarTempoMenu(config.tempoLimiteSegundos);
    }
  }

  function iniciarTimerLimite() {
    clearInterval(timerLimite);