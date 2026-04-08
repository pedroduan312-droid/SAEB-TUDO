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
  const feedbackResposta = document.getElementById("feedbackResposta");
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

  function obterConfiguracao() {
    const configuracaoModo = CONFIG_MODO[modo];
    if (!configuracaoModo) return null;

    if (configuracaoModo.tipo === "geral") {
      return {
        materia: "geral",
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

    timerLimite = setInterval(() => {
      if (quizFinalizado || !config) {
        clearInterval(timerLimite);
        return;
      }

      const tempoPassado = Math.floor((Date.now() - tempoInicio) / 1000);
      const tempoRestante = Math.max(config.tempoLimiteSegundos - tempoPassado, 0);
      const tempoFormatado = formatarTempoMenu(tempoRestante);

      tempoLimiteMenu.textContent = tempoFormatado;

      if (tempoTopo) {
        tempoTopo.textContent = tempoFormatado;
      }

      if (tempoRestante <= 0) {
        clearInterval(timerLimite);
        finalizarQuiz();
      }
    }, 1000);
  }

  function mostrarCarregamento(texto) {
    statusCarregamento.textContent = texto;
    statusCarregamento.classList.remove("oculto");
    conteudoQuiz.classList.add("oculto");
  }

  function mostrarQuiz() {
    statusCarregamento.classList.add("oculto");
    conteudoQuiz.classList.remove("oculto");
  }

  function embaralharCopia(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  function normalizarDescritor(valor) {
    return String(valor || "").toUpperCase().trim();
  }

  function filtrarPorDescritor(lista, descritorSelecionado) {
    const descritorNormalizado = normalizarDescritor(descritorSelecionado);

    if (!descritorNormalizado) return lista;

    return lista.filter((q) => normalizarDescritor(q.descritor) === descritorNormalizado);
  }

  function gerarTreino(questoes, materiaSelecionada, quantidade, modoSelecionado, descritorSelecionado = "") {
    const configuracaoModo = CONFIG_MODO[modoSelecionado];

    if (!configuracaoModo) {
      throw new Error("Modo de treino inválido.");
    }

    if (configuracaoModo.tipo === "geral") {
      const portugues = questoes.filter((q) => q.materia === "portugues");
      const matematica = questoes.filter((q) => q.materia === "matematica");

      const metade = Math.floor(quantidade / 2);
      const restante = quantidade - metade;

      if (portugues.length < metade) {
        throw new Error(`Não há questões suficientes de Português. Disponíveis: ${portugues.length}. Necessárias: ${metade}.`);
      }

      if (matematica.length < restante) {
        throw new Error(`Não há questões suficientes de Matemática. Disponíveis: ${matematica.length}. Necessárias: ${restante}.`);
      }

      const partePortugues = embaralharCopia(portugues).slice(0, metade);
      const parteMatematica = embaralharCopia(matematica).slice(0, restante);

      return embaralharCopia([...partePortugues, ...parteMatematica]);
    }

    let filtradas = questoes.filter((q) => q.materia === materiaSelecionada);
    filtradas = filtrarPorDescritor(filtradas, descritorSelecionado);

    const nomeBaseMateria = NOMES_MATERIAS[materiaSelecionada] || "matéria";
    const nomeExibicao = descritorSelecionado
      ? `${nomeBaseMateria} (${normalizarDescritor(descritorSelecionado)})`
      : nomeBaseMateria;

    if (filtradas.length < quantidade) {
      throw new Error(
        `Não há questões suficientes de ${nomeExibicao}. Disponíveis: ${filtradas.length}. Necessárias: ${quantidade}.`
      );
    }

    return embaralharCopia(filtradas).slice(0, quantidade);
  }

  function obterMensagemResposta(acertou) {
    const mensagensCorretas = [
      "Mandou bem!",
      "Boa!",
      "Resposta certa!",
      "Você acertou!",
      "Excelente!"
    ];

    const mensagensErradas = [
      "Quase lá!",
      "Não foi dessa vez!",
      "Errou, mas segue o jogo!",
      "Vamos para a próxima!",
      "Foco na próxima!"
    ];

    const lista = acertou ? mensagensCorretas : mensagensErradas;
    return lista[Math.floor(Math.random() * lista.length)];
  }

  function mostrarFeedback(acertou) {
    if (!feedbackResposta || !footerBox) return;

    feedbackResposta.textContent = obterMensagemResposta(acertou);
    feedbackResposta.classList.remove("oculto", "correto", "errado", "mostrar");
    feedbackResposta.classList.add(acertou ? "correto" : "errado");

    void feedbackResposta.offsetWidth;
    feedbackResposta.classList.add("mostrar");

    btnAcao.classList.remove("subindo");
    feedbackResposta.classList.remove("subindo");

    void btnAcao.offsetWidth;
    void feedbackResposta.offsetWidth;

    btnAcao.classList.add("subindo");
    feedbackResposta.classList.add("subindo");

    setTimeout(() => {
      btnAcao.classList.remove("subindo");
      feedbackResposta.classList.remove("subindo");
    }, 300);
  }

  function esconderFeedback() {
    if (!feedbackResposta) return;
    feedbackResposta.classList.add("oculto");
    feedbackResposta.classList.remove("mostrar", "correto", "errado");
    feedbackResposta.textContent = "";
  }

  function mostrarMensagemConquista(texto) {
    const div = document.createElement("div");
    div.className = "mensagem-conquista";
    div.textContent = texto;

    document.body.appendChild(div);

    requestAnimationFrame(() => {
      div.classList.add("mostrar");
    });

    setTimeout(() => {
      div.remove();
    }, 2200);
  }

  function verificarMarcosDeConquista() {
    if (treino.length < 10) return;

    const marcos = [5, 10, 15, 20, 25, 30];

    marcos.forEach((marco) => {
      if (acertos === marco && !marcosConquistaMostrados.includes(marco)) {
        marcosConquistaMostrados.push(marco);
        mostrarMensagemConquista(`${marco} acertos! Continue assim!`);
        tocarSom(somConquista);
      }
    });
  }

  function criarAlternativa(letra, texto) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "alternativa";

    card.innerHTML = `
      <div class="conteudo-alternativa">
        <div class="letra ${CORES_ALTERNATIVAS[letra] || ""}">${letra}</div>
        <div class="texto">${texto}</div>
      </div>
    `;

    card.addEventListener("click", () => selecionarAlternativa(card, letra));
    return card;
  }

  function atualizarCabecalho() {
    contador.textContent = `${indiceAtual + 1}/${treino.length}`;
    progresso.style.width = `${((indiceAtual + 1) / treino.length) * 100}%`;
  }

  function mostrarTextoApoio(questao) {
    const texto = questao.textoApoio || questao.apoio || "";

    if (!textoApoio) return;

    if (texto) {
      textoApoio.textContent = texto;
      textoApoio.classList.remove("oculto");
    } else {
      textoApoio.textContent = "";
      textoApoio.classList.add("oculto");
    }
  }

  function mostrarQuestao() {
    const questao = treino[indiceAtual];
    if (!questao || quizFinalizado) return;

    alternativaSelecionada = null;
    respostaConfirmada = false;

    esconderFeedback();
    atualizarCabecalho();
    mostrarTextoApoio(questao);

    enunciado.textContent = questao.enunciado || "";

    if (questao.imagem) {
      imagemQuestao.src = questao.imagem;
      imagemQuestao.classList.remove("oculto");
    } else {
      imagemQuestao.removeAttribute("src");
      imagemQuestao.classList.add("oculto");
    }

    alternativas.innerHTML = "";

    Object.entries(questao.alternativas).forEach(([letra, texto]) => {
      alternativas.appendChild(criarAlternativa(letra, texto));
    });

    btnAcao.disabled = true;
    btnAcao.textContent = "confirmar";
  }

  function selecionarAlternativa(card, letra) {
    if (respostaConfirmada || quizFinalizado) return;

    document.querySelectorAll(".alternativa").forEach((item) => {
      item.classList.remove("selecionada");
    });

    card.classList.add("selecionada");
    alternativaSelecionada = letra;
    btnAcao.disabled = false;
  }

  function confirmarResposta() {
    if (!alternativaSelecionada || quizFinalizado) return;

    const questao = treino[indiceAtual];
    const cards = document.querySelectorAll(".alternativa");
    const acertou = alternativaSelecionada === questao.correta;

    cards.forEach((card) => {
      const letra = card.querySelector(".letra").textContent;
      card.classList.remove("selecionada");

      if (letra === questao.correta) {
        card.classList.add("correta");
      }

      if (letra === alternativaSelecionada && letra !== questao.correta) {
        card.classList.add("errada");
      }

      card.disabled = true;
    });

    if (acertou) {
      acertos++;
      tocarSom(somAcerto);
    } else {
      tocarSom(somErro);
    }

    respostasRegistradas.push({
      materia: questao.materia,
      descritor: normalizarDescritor(questao.descritor),
      correta: acertou
    });

    verificarMarcosDeConquista();
    mostrarFeedback(acertou);

    respostaConfirmada = true;
    btnAcao.textContent = indiceAtual === treino.length - 1 ? "finalizar" : "próxima";
    btnAcao.disabled = false;
  }

  function obterResultadoFinal(porcentagem) {
    if (porcentagem >= 90) {
      return {
        titulo: "Excelente!",
        subtitulo: "Seu desempenho foi incrível. Continue assim!",
        nivel: "excelente",
        classe: "resultado-excelente"
      };
    }

    if (porcentagem >= 70) {
      return {
        titulo: "Mandou bem!",
        subtitulo: "Você teve um ótimo resultado e está no caminho certo.",
        nivel: "bom",
        classe: "resultado-bom"
      };
    }

    if (porcentagem >= 50) {
      return {
        titulo: "Bom trabalho!",
        subtitulo: "Você foi bem, mas ainda pode evoluir mais com prática.",
        nivel: "medio",
        classe: "resultado-medio"
      };
    }

    if (porcentagem >= 30) {
      return {
        titulo: "Pode melhorar!",
        subtitulo: "Você já começou. Agora é continuar treinando.",
        nivel: "atencao",
        classe: "resultado-atencao"
      };
    }

    return {
      titulo: "Vamos praticar mais!",
      subtitulo: "Não desanime. Cada tentativa ajuda você a melhorar.",
      nivel: "baixo",
      classe: "resultado-baixo"
    };
  }

  function limparClassesResultado() {
    if (!telaFinal) return;

    telaFinal.classList.remove(
      "resultado-excelente",
      "resultado-bom",
      "resultado-medio",
      "resultado-atencao",
      "resultado-baixo"
    );
  }

  function animarContador(inicio, fim, duracao, callback) {
    const inicioTempo = performance.now();

    function atualizar(agora) {
      const progressoAnimacao = Math.min((agora - inicioTempo) / duracao, 1);
      const valorAtual = inicio + (fim - inicio) * progressoAnimacao;
      callback(valorAtual);

      if (progressoAnimacao < 1) {
        requestAnimationFrame(atualizar);
      }
    }

    requestAnimationFrame(atualizar);
  }

  function animarResultados(acertosTotais, totalQuestoes, tempoTotalSegundos, porcentagem) {
    acertosFinal.textContent = `0/${totalQuestoes}`;
    tempoNumero.textContent = `0:00min`;
    porcentagemFinal.textContent = `0%`;
    graficoPizza.style.setProperty("--percent", 0);

    animarContador(0, acertosTotais, 1400, (valor) => {
      acertosFinal.textContent = `${Math.round(valor)}/${totalQuestoes}`;
    });

    animarContador(0, tempoTotalSegundos, 1600, (valor) => {
      tempoNumero.textContent = formatarTempo(Math.round(valor));
    });

    animarContador(0, porcentagem, 1700, (valor) => {
      const valorInteiro = Math.round(valor);
      porcentagemFinal.textContent = `${valorInteiro}%`;
      graficoPizza.style.setProperty("--percent", valorInteiro);
    });
  }

  function obterStatsPadrao() {
    return {
      quizzes: 0,
      questoes: 0,
      acertos: 0,
      portugues: 0,
      matematica: 0,
      descritores: {}
    };
  }

  function garantirEstruturaStats(stats) {
    if (!stats || typeof stats !== "object") {
      return obterStatsPadrao();
    }

    if (typeof stats.quizzes !== "number") stats.quizzes = 0;
    if (typeof stats.questoes !== "number") stats.questoes = 0;
    if (typeof stats.acertos !== "number") stats.acertos = 0;
    if (typeof stats.portugues !== "number") stats.portugues = 0;
    if (typeof stats.matematica !== "number") stats.matematica = 0;
    if (!stats.descritores || typeof stats.descritores !== "object") {
      stats.descritores = {};
    }

    return stats;
  }

  function obterInicioDaSemana(data = new Date()) {
    const copia = new Date(data);
    const dia = copia.getDay();
    const ajuste = dia === 0 ? -6 : 1 - dia;
    copia.setDate(copia.getDate() + ajuste);
    copia.setHours(0, 0, 0, 0);
    return copia;
  }

  function formatarDataISO(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  function obterHistoricoPadrao() {
    return {
      ultimaAtualizacaoSemana: formatarDataISO(obterInicioDaSemana()),
      questoesSemana: 0,
      quizzes: []
    };
  }

  function garantirEstruturaHistorico(historico) {
    if (!historico || typeof historico !== "object") {
      return obterHistoricoPadrao();
    }

    if (!historico.ultimaAtualizacaoSemana) {
      historico.ultimaAtualizacaoSemana = formatarDataISO(obterInicioDaSemana());
    }

    if (typeof historico.questoesSemana !== "number") {
      historico.questoesSemana = 0;
    }

    if (!Array.isArray(historico.quizzes)) {
      historico.quizzes = [];
    }

    return historico;
  }

  function obterConquistasPadrao() {
    return {
      desbloqueadas: []
    };
  }

  function garantirEstruturaConquistas(conquistas) {
    if (!conquistas || typeof conquistas !== "object") {
      return obterConquistasPadrao();
    }

    if (!Array.isArray(conquistas.desbloqueadas)) {
      conquistas.desbloqueadas = [];
    }

    return conquistas;
  }

  function salvarEstatisticasQuiz() {
    const chaveStats = "saebTudoEstatisticas";

    let stats = obterStatsPadrao();
    const statsSalvas = localStorage.getItem(chaveStats);

    if (statsSalvas) {
      try {
        stats = garantirEstruturaStats(JSON.parse(statsSalvas));
      } catch (erro) {
        console.warn("Erro ao ler estatísticas salvas. Reiniciando.", erro);
        stats = obterStatsPadrao();
      }
    }

    stats.quizzes += 1;
    stats.questoes += treino.length;
    stats.acertos += acertos;

    respostasRegistradas.forEach((resposta) => {
      if (resposta.materia === "portugues" && resposta.correta) {
        stats.portugues += 1;
      }

      if (resposta.materia === "matematica" && resposta.correta) {
        stats.matematica += 1;
      }

      const descritorResposta = normalizarDescritor(resposta.descritor);

      if (descritorResposta) {
        const chaveDescritor = `${resposta.materia}_${descritorResposta}`;

        if (!stats.descritores[chaveDescritor]) {
          stats.descritores[chaveDescritor] = {
            total: 0,
            acertos: 0,
            erros: 0
          };
        }

        stats.descritores[chaveDescritor].total += 1;

        if (resposta.correta) {
          stats.descritores[chaveDescritor].acertos += 1;
        } else {
          stats.descritores[chaveDescritor].erros += 1;
        }
      }
    });

    localStorage.setItem(chaveStats, JSON.stringify(stats));
  }

  function salvarHistoricoQuiz(porcentagem, tempoTotal) {
    const chaveHistorico = "saebTudoHistorico";

    let historico = obterHistoricoPadrao();
    const historicoSalvo = localStorage.getItem(chaveHistorico);

    if (historicoSalvo) {
      try {
        historico = garantirEstruturaHistorico(JSON.parse(historicoSalvo));
      } catch (erro) {
        console.warn("Erro ao ler histórico salvo. Reiniciando.", erro);
        historico = obterHistoricoPadrao();
      }
    }

    const semanaAtual = formatarDataISO(obterInicioDaSemana());

    if (historico.ultimaAtualizacaoSemana !== semanaAtual) {
      historico.ultimaAtualizacaoSemana = semanaAtual;
      historico.questoesSemana = 0;
    }

    historico.questoesSemana += treino.length;

    historico.quizzes.push({
      data: new Date().toISOString(),
      porcentagem,
      acertos,
      total: treino.length,
      tempo: tempoTotal,
      materia: config?.materia || "geral",
      modo: config?.modo || "",
      label: `quiz ${historico.quizzes.length + 1}`
    });

    if (historico.quizzes.length > 20) {
      historico.quizzes = historico.quizzes.slice(-20);
    }

    localStorage.setItem(chaveHistorico, JSON.stringify(historico));
  }

  function salvarConquistasQuiz(porcentagem) {
    const chaveConquistas = "saebTudoConquistas";

    let conquistas = obterConquistasPadrao();
    const conquistasSalvas = localStorage.getItem(chaveConquistas);

    if (conquistasSalvas) {
      try {
        conquistas = garantirEstruturaConquistas(JSON.parse(conquistasSalvas));
      } catch (erro) {
        console.warn("Erro ao ler conquistas salvas. Reiniciando.", erro);
        conquistas = obterConquistasPadrao();
      }
    }

    const desbloqueadas = new Set(conquistas.desbloqueadas);

    if (treino.length > 0) desbloqueadas.add("primeiro_quiz");
    if (acertos >= 5) desbloqueadas.add("cinco_acertos_quiz");
    if (acertos >= 10) desbloqueadas.add("dez_acertos_quiz");
    if (porcentagem >= 70) desbloqueadas.add("acertou_70");

    const materiasRespondidas = new Set(respostasRegistradas.map((r) => r.materia));
    if (materiasRespondidas.has("matematica")) desbloqueadas.add("primeiro_quiz_matematica");
    if (materiasRespondidas.has("portugues")) desbloqueadas.add("primeiro_quiz_portugues");

    if ((config?.materia === "portugues" || materiasRespondidas.has("portugues")) && treino.length > 0) {
      desbloqueadas.add("primeiro_quiz_portugues");
    }

    if ((config?.materia === "matematica" || materiasRespondidas.has("matematica")) && treino.length > 0) {
      desbloqueadas.add("primeiro_quiz_matematica");
    }

    conquistas.desbloqueadas = [...desbloqueadas];
    localStorage.setItem(chaveConquistas, JSON.stringify(conquistas));
  }

  function validarQuestoesMatematica(questoes) {
    const semDescritor = questoes.filter(
      (q) => q.materia === "matematica" && !normalizarDescritor(q.descritor)
    );

    if (semDescritor.length > 0) {
      console.warn("Há questões de matemática sem descritor:", semDescritor);
    }
  }

  function mostrarTelaFinal() {
    if (quizFinalizado || !config) return;

    quizFinalizado = true;
    clearInterval(timerLimite);

    const tempoTotal = Math.min(
      Math.floor((Date.now() - tempoInicio) / 1000),
      config.tempoLimiteSegundos
    );

    const totalQuestoes = treino.length;
    const porcentagem = totalQuestoes > 0
      ? Math.round((acertos / totalQuestoes) * 100)
      : 0;

    const resultadoFinal = obterResultadoFinal(porcentagem);

    salvarEstatisticasQuiz();
    salvarHistoricoQuiz(porcentagem, tempoTotal);
    salvarConquistasQuiz(porcentagem);

    tituloFinal.textContent = resultadoFinal.titulo;

    if (subtituloFinal) {
      subtituloFinal.textContent = resultadoFinal.subtitulo;
    }

    limparClassesResultado();
    telaFinal.classList.add(resultadoFinal.classe);
    telaFinal.dataset.nivel = resultadoFinal.nivel;

    telaFinal.classList.remove("oculto");

    animarResultados(acertos, totalQuestoes, tempoTotal, porcentagem);
  }

  function mostrarTransicaoFinal(callback) {
    if (!transicaoFinal || !transicaoBarraInterna) {
      if (typeof callback === "function") callback();
      return;
    }

    transicaoFinal.classList.remove("oculto");
    transicaoBarraInterna.style.width = "0%";

    void transicaoBarraInterna.offsetWidth;

    setTimeout(() => {
      transicaoBarraInterna.style.width = "100%";
    }, 120);

    tocarSom(somFinal);

    setTimeout(() => {
      transicaoFinal.classList.add("oculto");
      if (typeof callback === "function") callback();
    }, 1900);
  }

  function finalizarQuiz() {
    esconderFeedback();

    mostrarTransicaoFinal(() => {
      mostrarTelaFinal();
    });
  }

  function avancar() {
    if (quizFinalizado) return;

    if (indiceAtual < treino.length - 1) {
      indiceAtual++;
      mostrarQuestao();
      return;
    }

    finalizarQuiz();
  }

  abrirMenu?.addEventListener("click", abrirMenuLateral);
  overlay?.addEventListener("click", fecharMenuLateral);

  btnVerQuestoes?.addEventListener("click", () => {
    fecharMenuLateral();
    alert(`Questão ${indiceAtual + 1} de ${treino.length}`);
  });

  btnSom?.addEventListener("click", () => {
    sonsAtivados = !sonsAtivados;
    atualizarTextoBotaoSom();
  });

  btnSairDesafio?.addEventListener("click", voltarPaginaSegura);
  btnVoltarHome?.addEventListener("click", voltarPaginaSegura);

  btnRefazer?.addEventListener("click", () => {
    window.location.reload();
  });

  btnAcao?.addEventListener("click", () => {
    if (quizFinalizado) return;

    if (!respostaConfirmada) {
      confirmarResposta();
    } else {
      avancar();
    }
  });

  async function carregarQuestoes() {
    if (!config) {
      mostrarCarregamento("Parâmetros inválidos. Abra esta página pelos cards do app.");
      btnAcao.disabled = true;
      return;
    }

    atualizarMenuInfo();
    mostrarCarregamento("Carregando questões...");

    try {
      const resposta = await fetch("dados/questoes.json", { cache: "no-store" });

      if (!resposta.ok) {
        throw new Error(`HTTP ${resposta.status}`);
      }

      const data = await resposta.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Banco de questões vazio ou inválido.");
      }

      bancoQuestoes = data;
      validarQuestoesMatematica(bancoQuestoes);

      treino = gerarTreino(
        bancoQuestoes,
        config.materia,
        config.quantidade,
        config.modo,
        config.descritor
      );

      respostasRegistradas = [];
      indiceAtual = 0;
      acertos = 0;
      quizFinalizado = false;
      marcosConquistaMostrados = [];
    } catch (erro) {
      console.error("Erro ao carregar quiz:", erro);
      mostrarCarregamento(
        `Não foi possível iniciar este treino.\n${erro.message}\n\nVerifique se o JSON tem questões suficientes e se você está usando o Live Server.`
      );
      return;
    }

    tempoInicio = Date.now();
    mostrarQuiz();
    mostrarQuestao();
    iniciarTimerLimite();
  }

  iniciarSplash();
  atualizarTextoBotaoSom();
  carregarQuestoes();
})();