const totalQuizzesEl = document.getElementById("totalQuizzes");
const totalQuestoesEl = document.getElementById("totalQuestoes");
const totalAcertosEl = document.getElementById("totalAcertos");

const metaBarraInterna = document.getElementById("metaBarraInterna");
const metaTexto = document.getElementById("metaTexto");

const graficoCircular = document.getElementById("graficoCircular");
const aproveitamentoMedioEl = document.getElementById("aproveitamentoMedio");

const pctPortuguesEl = document.getElementById("pctPortugues");
const pctMatematicaEl = document.getElementById("pctMatematica");

const conteudoRevisar1 = document.getElementById("conteudoRevisar1");
const conteudoRevisar2 = document.getElementById("conteudoRevisar2");

const gridConquistas = document.getElementById("gridConquistas");

const graficoLinha = document.getElementById("graficoLinha");
const graficoArea = document.getElementById("graficoArea");
const graficoPontos = document.getElementById("graficoPontos");
const graficoGuias = document.getElementById("graficoGuias");

const labelQuiz1 = document.getElementById("labelQuiz1");
const labelQuiz2 = document.getElementById("labelQuiz2");
const labelQuiz3 = document.getElementById("labelQuiz3");
const labelQuiz4 = document.getElementById("labelQuiz4");

const META_SEMANAL_TOTAL = 30;

const DESCRITORES_PORTUGUES = {
  D1: "Localizar informações explícitas",
  D2: "Estabelecer relações entre partes do texto",
  D3: "Inferir o sentido de palavra ou expressão",
  D4: "Inferir informação implícita",
  D5: "Interpretar texto com material gráfico",
  D6: "Identificar o tema de um texto",
  D7: "Identificar a tese de um texto",
  D8: "Relacionar tese e argumentos",
  D9: "Diferenciar partes principais e secundárias",
  D10: "Identificar conflito e narrativa",
  D11: "Estabelecer relação causa e consequência",
  D12: "Identificar a finalidade de gêneros textuais",
  D13: "Identificar marcas linguísticas do locutor",
  D14: "Distinguir fato de opinião",
  D15: "Estabelecer relações lógico-discursivas",
  D16: "Identificar efeitos de ironia ou humor",
  D17: "Reconhecer efeitos da pontuação",
  D18: "Reconhecer efeito de palavra ou expressão",
  D19: "Reconhecer efeitos ortográficos e morfossintáticos",
  D20: "Reconhecer diferentes formas de tratar uma informação",
  D21: "Reconhecer posições distintas sobre um fato"
};

const DESCRITORES_MATEMATICA = {
  D1: "Identificar figuras semelhantes",
  D2: "Reconhecer relações métricas no triângulo retângulo",
  D3: "Relacionar sólidos e planificações",
  D4: "Relacionar vértices, faces e arestas",
  D5: "Resolver razões trigonométricas",
  D6: "Identificar pontos no plano cartesiano",
  D7: "Interpretar coeficientes da reta",
  D8: "Identificar equação da reta",
  D9: "Relacionar interseção de retas e sistemas",
  D10: "Reconhecer equações de circunferências",
  D11: "Resolver perímetro de figuras planas",
  D12: "Resolver área de figuras planas",
  D13: "Resolver área total e volume de sólidos",
  D14: "Identificar números reais na reta",
  D15: "Resolver variação proporcional",
  D16: "Resolver porcentagem",
  D17: "Resolver equação do 2º grau",
  D18: "Reconhecer função por tabela",
  D19: "Resolver função do 1º grau",
  D20: "Analisar crescimento e zeros de funções",
  D21: "Identificar gráfico de uma situação",
  D22: "Resolver P.A. e P.G.",
  D23: "Reconhecer gráfico de função do 1º grau",
  D24: "Reconhecer representação algébrica de função",
  D25: "Resolver máximo e mínimo da parábola",
  D26: "Relacionar raízes e fatoração",
  D27: "Identificar função exponencial",
  D28: "Identificar função logarítmica",
  D29: "Resolver função exponencial",
  D30: "Identificar gráficos trigonométricos",
  D31: "Determinar solução de sistema linear por matriz",
  D32: "Resolver problema de contagem",
  D33: "Calcular probabilidade",
  D34: "Resolver dados em tabelas e gráficos",
  D35: "Associar listas/tabelas e gráficos"
};

const CONQUISTAS = [
  { id: "primeiro_quiz", imagem: "imagens/conquista1.png" },
  { id: "cinco_acertos_quiz", imagem: "imagens/conquista2.png" },
  { id: "dez_acertos_quiz", imagem: "imagens/conquista3.png" },
  { id: "tres_quizzes", imagem: "imagens/conquista4.png" },
  { id: "cinco_acertos_seguidos", imagem: "imagens/conquista5.png" },
  { id: "primeiro_quiz_matematica", imagem: "imagens/conquista6.png" },
  { id: "primeiro_quiz_portugues", imagem: "imagens/conquista7.png" },
  { id: "melhorou_media", imagem: "imagens/conquista8.png" },
  { id: "acertou_70", imagem: "imagens/conquista9.png" },
  { id: "sequencia_3_dias", imagem: "imagens/conquista10.png" }
];

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

function obterHistoricoPadrao() {
  return {
    ultimaAtualizacaoSemana: formatarDataISO(obterInicioDaSemana()),
    questoesSemana: 0,
    quizzes: []
  };
}

function obterConquistasPadrao() {
  return {
    desbloqueadas: []
  };
}

function lerLocalStorageJSON(chave, fallback) {
  const valor = localStorage.getItem(chave);

  if (!valor) return fallback;

  try {
    return JSON.parse(valor);
  } catch (erro) {
    console.warn(`Erro ao ler ${chave}:`, erro);
    return fallback;
  }
}

function salvarLocalStorageJSON(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function garantirSemanaAtual() {
  const historico = lerLocalStorageJSON("saebTudoHistorico", obterHistoricoPadrao());
  const semanaAtual = formatarDataISO(obterInicioDaSemana());

  if (historico.ultimaAtualizacaoSemana !== semanaAtual) {
    historico.ultimaAtualizacaoSemana = semanaAtual;
    historico.questoesSemana = 0;
    salvarLocalStorageJSON("saebTudoHistorico", historico);
  }

  return historico;
}

function obterStats() {
  return lerLocalStorageJSON("saebTudoEstatisticas", obterStatsPadrao());
}

function obterHistorico() {
  const historico = garantirSemanaAtual();

  if (!Array.isArray(historico.quizzes)) {
    historico.quizzes = [];
    salvarLocalStorageJSON("saebTudoHistorico", historico);
  }

  return historico;
}

function obterConquistas() {
  const conquistas = lerLocalStorageJSON("saebTudoConquistas", obterConquistasPadrao());

  if (!Array.isArray(conquistas.desbloqueadas)) {
    conquistas.desbloqueadas = [];
    salvarLocalStorageJSON("saebTudoConquistas", conquistas);
  }

  return conquistas;
}

function animarNumero(elemento, fim, duracao = 1000, sufixo = "") {
  const inicio = 0;
  const tempoInicial = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - tempoInicial) / duracao, 1);
    const valorAtual = Math.round(inicio + (fim - inicio) * progresso);
    element.textContent = `${valorAtual}${sufixo}`;

    if (progresso < 1) {
      requestAnimationFrame(passo);
    }
  }

  requestAnimationFrame(passo);
}

function animarBarraMeta(valorAtual, valorMaximo) {
  const percentual = Math.min((valorAtual / valorMaximo) * 100, 100);
  metaTexto.textContent = `${valorAtual}/${valorMaximo}`;

  setTimeout(() => {
    metaBarraInterna.style.width = `${percentual}%`;
  }, 180);
}

function animarGraficoCircular(percentual) {
  let atual = 0;
  const duracao = 1200;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    atual = Math.round(percentual * progresso);

    aproveitamentoMedioEl.textContent = `${atual}%`;
    graficoCircular.style.background = `
      conic-gradient(
        #214be5 0 ${atual * 1}%,
        #1695d4 ${atual * 1}%,
        #1695d4 ${atual * 1}%,
        #f78b26 0 100%
      )
    `;

    if (progresso < 1) {
      requestAnimationFrame(passo);
    }
  }

  requestAnimationFrame(passo);
}

function desenharGraficoLinha(ultimosQuizzes) {
  const dados = ultimosQuizzes.slice(-4);
  const totalPontos = 4;

  while (dados.length < totalPontos) {
    dados.unshift({ porcentagem: 0, label: `quiz ${totalPontos - dados.length}` });
  }

  const larg = 260;
  const alt = 150;
  const baseY = 130;
  const topoY = 15;
  const espacamento = larg / (totalPontos + 1);

  const pontos = dados.map((item, i) => {
    const x = espacamento * (i + 1);
    const y = baseY - ((item.porcentagem || 0) / 100) * (baseY - topoY);
    return { x, y, valor: item.porcentagem || 0 };
  });

  const caminhoLinha = pontos.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const caminhoArea = `
    ${caminhoLinha}
    L ${pontos[pontos.length - 1].x} ${baseY}
    L ${pontos[0].x} ${baseY}
    Z
  `;

  graficoLinha.setAttribute("d", caminhoLinha);
  graficoArea.setAttribute("d", caminhoArea);

  graficoPontos.innerHTML = "";
  graficoGuias.innerHTML = "";

  pontos.forEach((p) => {
    const guia = document.createElementNS("http://www.w3.org/2000/svg", "line");
    guia.setAttribute("x1", p.x);
    guia.setAttribute("y1", p.y);
    guia.setAttribute("x2", p.x);
    guia.setAttribute("y2", baseY);
    guia.setAttribute("stroke", "#b9c6d9");
    guia.setAttribute("stroke-dasharray", "4 4");
    guia.setAttribute("stroke-width", "1.5");
    graficoGuias.appendChild(guia);

    const circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circulo.setAttribute("cx", p.x);
    circulo.setAttribute("cy", p.y);
    circulo.setAttribute("r", "6");
    circulo.setAttribute("fill", "#fff");
    circulo.setAttribute("stroke", "#f4a321");
    circulo.setAttribute("stroke-width", "4");
    graficoPontos.appendChild(circulo);
  });

  labelQuiz1.textContent = "quiz 1";
  labelQuiz2.textContent = "quiz 2";
  labelQuiz3.textContent = "quiz 3";
  labelQuiz4.textContent = "quiz 4";
}

function calcularAproveitamentoMedio(stats) {
  if (!stats.questoes) return 0;
  return Math.round((stats.acertos / stats.questoes) * 100);
}

function calcularPctMateria(valorAcertosMateria, totalAcertos) {
  if (!totalAcertos) return 0;
  return Math.round((valorAcertosMateria / totalAcertos) * 100);
}

function obterNomeDescritor(codigo, materia) {
  if (materia === "portugues") {
    return DESCRITORES_PORTUGUES[codigo] || codigo;
  }

  if (materia === "matematica") {
    return DESCRITORES_MATEMATICA[codigo] || codigo;
  }

  return codigo;
}

function obterConteudosParaRevisar(stats) {
  const lista = [];

  Object.entries(stats.descritores || {}).forEach(([codigoCompleto, dados]) => {
    const partes = codigoCompleto.split("_");
    let materia = "";
    let codigo = codigoCompleto;

    if (partes.length >= 2) {
      materia = partes[0];
      codigo = partes[1];
    }

    const total = dados.total || 0;
    const acertos = dados.acertos || 0;
    const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;

    lista.push({
      codigo,
      materia,
      percentual,
      nome: obterNomeDescritor(codigo, materia)
    });
  });

  lista.sort((a, b) => a.percentual - b.percentual);

  return lista.slice(0, 2);
}

function renderizarConteudosParaRevisar(stats) {
  const piores = obterConteudosParaRevisar(stats);

  if (piores.length === 0) {
    conteudoRevisar1.textContent = "Faça mais quizzes para gerar recomendações";
    conteudoRevisar2.textContent = "-";
    return;
  }

  conteudoRevisar1.textContent = piores[0]?.nome || "Faça mais quizzes para gerar recomendações";
  conteudoRevisar2.textContent = piores[1]?.nome || "-";
}

function renderizarConquistas() {
  const conquistasSalvas = obterConquistas();

  const lista = CONQUISTAS.slice(0, 3); // 🔥 só 3

  gridConquistas.innerHTML = "";

  lista.forEach((conquista) => {
    const desbloqueada = conquistasSalvas.desbloqueadas.includes(conquista.id);

    const div = document.createElement("div");
    div.className = "conquista-item";

    const img = document.createElement("img");
    img.src = desbloqueada ? conquista.imagem : "imagens/cadeado-conquista.png";

    div.appendChild(img);
    gridConquistas.appendChild(div);
  });
}

document.getElementById("btnMaisConquistas").onclick = () => {
  window.location.href = "conquistas.html";
};

function atualizarTela() {
  const stats = obterStats();
  const historico = obterHistorico();

  const totalQuizzes = stats.quizzes || 0;
  const totalQuestoes = stats.questoes || 0;
  const totalAcertos = stats.acertos || 0;

  const aproveitamentoMedio = calcularAproveitamentoMedio(stats);
  const pctPortugues = calcularPctMateria(stats.portugues || 0, totalAcertos);
  const pctMatematica = calcularPctMateria(stats.matematica || 0, totalAcertos);

  animarNumero(totalQuizzesEl, totalQuizzes, 900);
  animarNumero(totalQuestoesEl, totalQuestoes, 1000);
  animarNumero(totalAcertosEl, totalAcertos, 1100);

  animarBarraMeta(historico.questoesSemana || 0, META_SEMANAL_TOTAL);
  animarGraficoCircular(aproveitamentoMedio);

  pctPortuguesEl.textContent = `${pctPortugues}%`;
  pctMatematicaEl.textContent = `${pctMatematica}%`;

  renderizarConteudosParaRevisar(stats);
  renderizarConquistas();
  desenharGraficoLinha(historico.quizzes || []);
}

function configurarNavbar() {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;

      if (page === "home") {
        window.location.href = "home.html";
      }

      if (page === "simulados") {
        window.location.href = "simulados.html";
      }

      if (page === "desempenho") {
        window.location.href = "desempenho.html";
      }

      if (page === "perfil") {
        window.location.href = "perfil.html";
      }
    });
  });
}

function inicializarChavesSeNecessario() {
  const historico = lerLocalStorageJSON("saebTudoHistorico", null);
  if (!historico) {
    salvarLocalStorageJSON("saebTudoHistorico", obterHistoricoPadrao());
  }

  const conquistas = lerLocalStorageJSON("saebTudoConquistas", null);
  if (!conquistas) {
    salvarLocalStorageJSON("saebTudoConquistas", obterConquistasPadrao());
  }
}

inicializarChavesSeNecessario();
configurarNavbar();
atualizarTela();