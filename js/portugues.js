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

  const splash = document.getElementById("splash");

  const telaFinal = document.getElementById("telaFinal");
  const tituloFinal = document.getElementById("tituloFinal");
  const porcentagemFinal = document.getElementById("porcentagemFinal");
  const acertosFinal = document.getElementById("acertosFinal");
  const tempoNumero = document.getElementById("tempoNumero");
  const graficoPizza = document.getElementById("graficoPizza");
  const btnRefazer = document.getElementById("btnRefazer");
  const btnVoltarHome = document.getElementById("btnVoltarHome");

  const TOTAL_QUESTOES = 20;

  let bancoQuestoes = [];
  let treino = [];
  let indiceAtual = 0;
  let acertos = 0;
  let alternativaSelecionada = null;
  let respostaConfirmada = false;
  let tempoInicio = Date.now();

  const TITULOS_FINAIS = [
    "Parabens!",
    "Mandou bem!",
    "Muito bom!",
    "Excelente!",
    "Você arrasou!"
  ];

  const QUESTOES_FALLBACK = [
    {
      id: 1,
      materia: "portugues",
      enunciado: "Qual é o plural de 'pão'?",
      alternativas: { A: "pãos", B: "pões", C: "pães", D: "paes" },
      correta: "C"
    },
    {
      id: 2,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um verbo?",
      alternativas: { A: "andar", B: "mesa", C: "janela", D: "porta" },
      correta: "A"
    },
    {
      id: 3,
      materia: "portugues",
      enunciado: "Qual palavra está escrita corretamente?",
      alternativas: { A: "Excessão", B: "Exceção", C: "Exceçao", D: "Exessão" },
      correta: "B"
    },
    {
      id: 4,
      materia: "portugues",
      enunciado: "Qual dessas palavras tem acento?",
      alternativas: { A: "cafe", B: "sofa", C: "lápis", D: "mesa" },
      correta: "C"
    },
    {
      id: 5,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um substantivo?",
      alternativas: { A: "correr", B: "feliz", C: "cidade", D: "rápido" },
      correta: "C"
    },
    {
      id: 6,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um adjetivo?",
      alternativas: { A: "bonito", B: "escola", C: "andar", D: "cidade" },
      correta: "A"
    },
    {
      id: 7,
      materia: "portugues",
      enunciado: "Qual é o plural de 'animal'?",
      alternativas: { A: "animales", B: "animais", C: "animals", D: "animalis" },
      correta: "B"
    },
    {
      id: 8,
      materia: "portugues",
      enunciado: "Qual dessas palavras começa com vogal?",
      alternativas: { A: "bola", B: "gato", C: "elefante", D: "tigre" },
      correta: "C"
    },
    {
      id: 9,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um verbo?",
      alternativas: { A: "cantar", B: "livro", C: "mesa", D: "porta" },
      correta: "A"
    },
    {
      id: 10,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um substantivo?",
      alternativas: { A: "felicidade", B: "rápido", C: "andar", D: "bonito" },
      correta: "A"
    },
    {
      id: 11,
      materia: "portugues",
      enunciado: "Qual palavra está escrita corretamente?",
      alternativas: { A: "caza", B: "cassa", C: "casa", D: "kasa" },
      correta: "C"
    },
    {
      id: 12,
      materia: "portugues",
      enunciado: "Qual é o plural de 'papel'?",
      alternativas: { A: "papeis", B: "papéis", C: "papels", D: "papeus" },
      correta: "B"
    },
    {
      id: 13,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um adjetivo?",
      alternativas: { A: "alto", B: "livro", C: "cidade", D: "escola" },
      correta: "A"
    },
    {
      id: 14,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um verbo?",
      alternativas: { A: "beber", B: "janela", C: "cidade", D: "mesa" },
      correta: "A"
    },
    {
      id: 15,
      materia: "portugues",
      enunciado: "Qual dessas palavras tem acento?",
      alternativas: { A: "café", B: "porta", C: "livro", D: "mesa" },
      correta: "A"
    },
    {
      id: 16,
      materia: "portugues",
      enunciado: "Qual é o plural de 'flor'?",
      alternativas: { A: "flors", B: "flores", C: "flore", D: "floris" },
      correta: "B"
    },
    {
      id: 17,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um verbo?",
      alternativas: { A: "andar", B: "casa", C: "cidade", D: "livro" },
      correta: "A"
    },
    {
      id: 18,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um substantivo?",
      alternativas: { A: "feliz", B: "rápido", C: "escola", D: "andar" },
      correta: "C"
    },
    {
      id: 19,
      materia: "portugues",
      enunciado: "Qual palavra está escrita corretamente?",
      alternativas: { A: "exceção", B: "excessão", C: "exseção", D: "exessão" },
      correta: "A"
    },
    {
      id: 20,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um adjetivo?",
      alternativas: { A: "rápido", B: "cidade", C: "mesa", D: "livro" },
      correta: "A"
    }
  ];

  function iniciarSplash() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        splash.classList.add("hide");
      }, 1800);
    });
  }

  function abrirMenuLateral() {
    container.classList.add("menu-aberto");
  }

  function fecharMenuLateral() {
    container.classList.remove("menu-aberto");
  }

  abrirMenu.addEventListener("click", abrirMenuLateral);
  overlay.addEventListener("click", fecharMenuLateral);

  btnVerQuestoes.addEventListener("click", () => {
    fecharMenuLateral();
    alert(`Questão ${indiceAtual + 1} de ${treino.length}`);
  });

  btnSairDesafio.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  btnRefazer.addEventListener("click", () => {
    window.location.reload();
  });

  btnVoltarHome.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  function embaralharCopia(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function gerarTreinoPortugues(questoes, quantidade = 20) {
    const portugues = questoes.filter((q) => q.materia === "portugues");

    if (portugues.length < quantidade) {
      throw new Error("Não há questões suficientes de Língua Portuguesa.");
    }

    return embaralharCopia(portugues).slice(0, quantidade);
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

  function criarAlternativa(letra, texto) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "alternativa";

    card.innerHTML = `
      <div class="letra ${letra}">${letra}</div>
      <div class="texto">${texto}</div>
    `;

    card.addEventListener("click", () => selecionarAlternativa(card, letra));
    return card;
  }

  function atualizarCabecalho() {
    contador.textContent = `${indiceAtual + 1}/${treino.length}`;
    progresso.style.width = `${((indiceAtual + 1) / treino.length) * 100}%`;
  }

  function mostrarQuestao() {
    const questao = treino[indiceAtual];
    if (!questao) return;

    alternativaSelecionada = null;
    respostaConfirmada = false;

    atualizarCabecalho();
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
    if (respostaConfirmada) return;

    document.querySelectorAll(".alternativa").forEach((item) => {
      item.classList.remove("selecionada");
    });

    card.classList.add("selecionada");
    alternativaSelecionada = letra;
    btnAcao.disabled = false;
  }

  function confirmarResposta() {
    if (!alternativaSelecionada) return;

    const questao = treino[indiceAtual];
    const cards = document.querySelectorAll(".alternativa");

    cards.forEach((card) => {
      const letra = card.querySelector(".letra").textContent;
      card.classList.remove("selecionada");

      if (letra === questao.correta) {
        card.classList.add("correta");
      }

      if (letra === alternativaSelecionada && letra !== questao.correta) {
        card.classList.add("errada");
      }
    });

    if (alternativaSelecionada === questao.correta) {
      acertos++;
    }

    respostaConfirmada = true;
    btnAcao.textContent = indiceAtual === treino.length - 1 ? "finalizar" : "próxima";
    btnAcao.disabled = false;
  }

  function formatarTempo(segundosTotais) {
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = Math.floor(segundosTotais % 60);
    const segundosFormatados = String(segundos).padStart(2, "0");
    return `${minutos}:${segundosFormatados}min`;
  }

  function escolherTituloFinal(porcentagem) {
    if (porcentagem === 100) return "Você arrasou!";
    if (porcentagem >= 80) return "Excelente!";
    if (porcentagem >= 60) return "Mandou bem!";
    if (porcentagem >= 40) return "Muito bom!";
    return TITULOS_FINAIS[Math.floor(Math.random() * TITULOS_FINAIS.length)];
  }

  function mostrarTelaFinal() {
    const tempoTotal = (Date.now() - tempoInicio) / 1000;
    const porcentagem = Math.round((acertos / treino.length) * 100);

    tituloFinal.textContent = escolherTituloFinal(porcentagem);
    acertosFinal.textContent = `${acertos}/${treino.length}`;
    tempoNumero.textContent = formatarTempo(tempoTotal);
    porcentagemFinal.textContent = `${porcentagem}%`;
    graficoPizza.style.setProperty("--percent", porcentagem);

    telaFinal.classList.remove("oculto");
  }

  function finalizarQuiz() {
    mostrarTelaFinal();
  }

  function avancar() {
    if (indiceAtual < treino.length - 1) {
      indiceAtual++;
      mostrarQuestao();
      return;
    }
    finalizarQuiz();
  }

  btnAcao.addEventListener("click", () => {
    if (!respostaConfirmada) {
      confirmarResposta();
    } else {
      avancar();
    }
  });

  async function carregarQuestoes() {
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
    } catch (erro) {
      console.warn("Falha ao carregar JSON. Usando banco interno.", erro);
      bancoQuestoes = QUESTOES_FALLBACK;
    }

    try {
      treino = gerarTreinoPortugues(bancoQuestoes, TOTAL_QUESTOES);
    } catch (erro) {
      console.warn("Falha ao montar treino com banco principal. Usando fallback.", erro);
      treino = gerarTreinoPortugues(QUESTOES_FALLBACK, TOTAL_QUESTOES);
    }

    if (treino.length === 0) {
      mostrarCarregamento("Não foi possível carregar as questões.");
      return;
    }

    tempoInicio = Date.now();
    mostrarQuiz();
    mostrarQuestao();
  }

  iniciarSplash();
  carregarQuestoes();
})();
