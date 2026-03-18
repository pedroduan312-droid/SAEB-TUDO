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

  let bancoQuestoes = [];
  let desafio = [];
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
      materia: "matematica",
      enunciado: "Quanto é 8 × 7?",
      alternativas: { A: "54", B: "56", C: "64", D: "48" },
      correta: "B"
    },
    {
      id: 5,
      materia: "matematica",
      enunciado: "Um triângulo possui quantos lados?",
      alternativas: { A: "2", B: "3", C: "4", D: "5" },
      correta: "B"
    },
    {
      id: 6,
      materia: "portugues",
      enunciado: "Qual dessas palavras tem acento?",
      alternativas: { A: "cafe", B: "sofa", C: "lápis", D: "mesa" },
      correta: "C"
    },
    {
      id: 7,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um substantivo?",
      alternativas: { A: "correr", B: "feliz", C: "cidade", D: "rápido" },
      correta: "C"
    },
    {
      id: 8,
      materia: "matematica",
      enunciado: "Quanto é 36 ÷ 6?",
      alternativas: { A: "5", B: "6", C: "7", D: "8" },
      correta: "B"
    },
    {
      id: 9,
      materia: "portugues",
      enunciado: "Qual dessas palavras é um adjetivo?",
      alternativas: { A: "bonito", B: "escola", C: "andar", D: "cidade" },
      correta: "A"
    },
    {
      id: 10,
      materia: "matematica",
      enunciado: "Quanto é 15 + 27?",
      alternativas: { A: "40", B: "41", C: "42", D: "43" },
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
    alert(`Questão ${indiceAtual + 1} de ${desafio.length}`);
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

  function gerarDesafioDiario(questoes, quantidadePortugues = 3, quantidadeMatematica = 2) {
    const portugues = questoes.filter((q) => q.materia === "portugues");
    const matematica = questoes.filter((q) => q.materia === "matematica");

    if (portugues.length < quantidadePortugues || matematica.length < quantidadeMatematica) {
      throw new Error("Não há questões suficientes no banco para montar o desafio diário.");
    }

    const sorteadasPortugues = embaralharCopia(portugues).slice(0, quantidadePortugues);
    const sorteadasMatematica = embaralharCopia(matematica).slice(0, quantidadeMatematica);

    return embaralharCopia([...sorteadasPortugues, ...sorteadasMatematica]);
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
    contador.textContent = `${indiceAtual + 1}/${desafio.length}`;
    progresso.style.width = `${((indiceAtual + 1) / desafio.length) * 100}%`;
  }

  function mostrarQuestao() {
    const questao = desafio[indiceAtual];
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

    const questao = desafio[indiceAtual];
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
    btnAcao.textContent = indiceAtual === desafio.length - 1 ? "finalizar" : "próxima";
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
    const porcentagem = Math.round((acertos / desafio.length) * 100);

    tituloFinal.textContent = escolherTituloFinal(porcentagem);
    acertosFinal.textContent = `${acertos}/${desafio.length}`;
    tempoNumero.textContent = formatarTempo(tempoTotal);
    porcentagemFinal.textContent = `${porcentagem}%`;
    graficoPizza.style.setProperty("--percent", porcentagem);

    telaFinal.classList.remove("oculto");
  }

  function finalizarQuiz() {
    mostrarTelaFinal();
  }

  function avancar() {
    if (indiceAtual < desafio.length - 1) {
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
      desafio = gerarDesafioDiario(bancoQuestoes, 3, 2);
    } catch (erro) {
      console.warn("Falha ao montar desafio com banco principal. Usando fallback.", erro);
      desafio = gerarDesafioDiario(QUESTOES_FALLBACK, 3, 2);
    }

    if (desafio.length === 0) {
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
