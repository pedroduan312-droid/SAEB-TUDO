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
      materia: "matematica",
      enunciado: "Quanto é 8 × 7?",
      alternativas: { A: "54", B: "56", C: "64", D: "48" },
      correta: "B"
    },
    {
      id: 2,
      materia: "matematica",
      enunciado: "Quanto é 36 ÷ 6?",
      alternativas: { A: "5", B: "6", C: "7", D: "8" },
      correta: "B"
    },
    {
      id: 3,
      materia: "matematica",
      enunciado: "Quanto é 15 + 27?",
      alternativas: { A: "40", B: "41", C: "42", D: "43" },
      correta: "C"
    },
    {
      id: 4,
      materia: "matematica",
      enunciado: "Um triângulo possui quantos lados?",
      alternativas: { A: "2", B: "3", C: "4", D: "5" },
      correta: "B"
    },
    {
      id: 5,
      materia: "matematica",
      enunciado: "Quanto é 50 − 18?",
      alternativas: { A: "30", B: "31", C: "32", D: "33" },
      correta: "C"
    },
    {
      id: 6,
      materia: "matematica",
      enunciado: "Quanto é 9 × 6?",
      alternativas: { A: "54", B: "56", C: "48", D: "64" },
      correta: "A"
    },
    {
      id: 7,
      materia: "matematica",
      enunciado: "Quanto é 72 ÷ 9?",
      alternativas: { A: "6", B: "7", C: "8", D: "9" },
      correta: "C"
    },
    {
      id: 8,
      materia: "matematica",
      enunciado: "Quanto é 14 + 19?",
      alternativas: { A: "31", B: "32", C: "33", D: "34" },
      correta: "C"
    },
    {
      id: 9,
      materia: "matematica",
      enunciado: "Quantos lados tem um quadrado?",
      alternativas: { A: "3", B: "4", C: "5", D: "6" },
      correta: "B"
    },
    {
      id: 10,
      materia: "matematica",
      enunciado: "Quanto é metade de 20?",
      alternativas: { A: "5", B: "10", C: "15", D: "20" },
      correta: "B"
    },
    {
      id: 11,
      materia: "matematica",
      enunciado: "Quanto é o dobro de 9?",
      alternativas: { A: "16", B: "17", C: "18", D: "19" },
      correta: "C"
    },
    {
      id: 12,
      materia: "matematica",
      enunciado: "Quanto é 7 × 12?",
      alternativas: { A: "72", B: "84", C: "96", D: "74" },
      correta: "B"
    },
    {
      id: 13,
      materia: "matematica",
      enunciado: "Quanto é 64 ÷ 8?",
      alternativas: { A: "6", B: "7", C: "8", D: "9" },
      correta: "C"
    },
    {
      id: 14,
      materia: "matematica",
      enunciado: "Quanto é 11 × 11?",
      alternativas: { A: "111", B: "121", C: "101", D: "131" },
      correta: "B"
    },
    {
      id: 15,
      materia: "matematica",
      enunciado: "Quanto é 90 ÷ 9?",
      alternativas: { A: "10", B: "11", C: "9", D: "8" },
      correta: "A"
    },
    {
      id: 16,
      materia: "matematica",
      enunciado: "Quanto é 45 − 18?",
      alternativas: { A: "27", B: "26", C: "28", D: "29" },
      correta: "A"
    },
    {
      id: 17,
      materia: "matematica",
      enunciado: "Quanto é 25 + 37?",
      alternativas: { A: "62", B: "60", C: "61", D: "63" },
      correta: "A"
    },
    {
      id: 18,
      materia: "matematica",
      enunciado: "Quanto é 100 − 45?",
      alternativas: { A: "65", B: "55", C: "50", D: "45" },
      correta: "B"
    },
    {
      id: 19,
      materia: "matematica",
      enunciado: "Quantos minutos tem uma hora?",
      alternativas: { A: "30", B: "50", C: "60", D: "70" },
      correta: "C"
    },
    {
      id: 20,
      materia: "matematica",
      enunciado: "Quanto é 4 × 15?",
      alternativas: { A: "50", B: "55", C: "60", D: "65" },
      correta: "C"
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

  function gerarTreinoMatematica(questoes, quantidade = 20) {
    const matematica = questoes.filter((q) => q.materia === "matematica");

    if (matematica.length < quantidade) {
      throw new Error("Não há questões suficientes de Matemática.");
    }

    return embaralharCopia(matematica).slice(0, quantidade);
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
      treino = gerarTreinoMatematica(bancoQuestoes, TOTAL_QUESTOES);
    } catch (erro) {
      console.warn("Falha ao montar treino com banco principal. Usando fallback.", erro);
      treino = gerarTreinoMatematica(QUESTOES_FALLBACK, TOTAL_QUESTOES);
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
