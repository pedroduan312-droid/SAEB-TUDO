(() => {
  const container = document.getElementById("container");
  const overlay = document.getElementById("overlay");
  const abrirMenu = document.getElementById("abrirMenu");
  const btnVerQuestoes = document.getElementById("btnVerQuestoes");
  const btnSairDesafio = document.getElementById("btnSairDesafio");

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
        tipo: "geral"
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
      tipo: "materia"
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

    tituloMenuMateria.textContent = config.nomeMateria;
    tituloTopo.textContent = config.nomeMateria;
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

  function gerarTreino(questoes, materiaSelecionada, quantidade, modoSelecionado) {
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

    const filtradas = questoes.filter((q) => q.materia === materiaSelecionada);

    if (filtradas.length < quantidade) {
      throw new Error(
        `Não há questões suficientes de ${NOMES_MATERIAS[materiaSelecionada]}. Disponíveis: ${filtradas.length}. Necessárias: ${quantidade}.`
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
    }

    respostasRegistradas.push({
      materia: questao.materia,
      correta: acertou
    });

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

  function salvarEstatisticasQuiz() {
    const chaveStats = "saebTudoEstatisticas";

    let stats = {
      quizzes: 0,
      questoes: 0,
      acertos: 0,
      portugues: 0,
      matematica: 0
    };

    const statsSalvas = localStorage.getItem(chaveStats);

    if (statsSalvas) {
      try {
        stats = JSON.parse(statsSalvas);
      } catch (erro) {
        console.warn("Erro ao ler estatísticas salvas. Reiniciando.", erro);
      }
    }

    stats.quizzes += 1;
    stats.questoes += treino.length;
    stats.acertos += acertos;

    respostasRegistradas.forEach((resposta) => {
      if (!resposta.correta) return;

      if (resposta.materia === "portugues") {
        stats.portugues += 1;
      }

      if (resposta.materia === "matematica") {
        stats.matematica += 1;
      }
    });

    localStorage.setItem(chaveStats, JSON.stringify(stats));
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

  function finalizarQuiz() {
    esconderFeedback();
    mostrarTelaFinal();
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
      treino = gerarTreino(bancoQuestoes, config.materia, config.quantidade, config.modo);

      respostasRegistradas = [];
      indiceAtual = 0;
      acertos = 0;
      quizFinalizado = false;
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
  carregarQuestoes();
})();