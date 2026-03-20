(() => {
  const telaPerfil = document.getElementById("telaPerfil");
  const telaEditar = document.getElementById("telaEditar");

  const btnVoltarPerfil = document.getElementById("btnVoltarPerfil");
  const btnVoltarEditar = document.getElementById("btnVoltarEditar");
  const btnEditarPerfil = document.getElementById("btnEditarPerfil");
  const btnSairConta = document.getElementById("btnSairConta");
  const btnSalvarAlteracoes = document.getElementById("btnSalvarAlteracoes");
  const btnMostrarSenha = document.getElementById("btnMostrarSenha");

  const nomePerfil = document.getElementById("nomePerfil");
  const emailPerfil = document.getElementById("emailPerfil");
  const nomeEditarTitulo = document.getElementById("nomeEditarTitulo");
  const emailEditarTitulo = document.getElementById("emailEditarTitulo");

  const inputNome = document.getElementById("inputNome");
  const inputEmail = document.getElementById("inputEmail");
  const inputSenha = document.getElementById("inputSenha");

  const fotoPerfil = document.getElementById("fotoPerfil");
  const fotoEditar = document.getElementById("fotoEditar");

  const statQuizzes = document.getElementById("statQuizzes");
  const statQuestoes = document.getElementById("statQuestoes");
  const statAcertos = document.getElementById("statAcertos");
  const porcentagemPortugues = document.getElementById("porcentagemPortugues");
  const porcentagemMatematica = document.getElementById("porcentagemMatematica");
  const graficoDonut = document.getElementById("graficoDonut");

  const STORAGE_USUARIO = "saebTudoUsuario";
  const STORAGE_STATS = "saebTudoEstatisticas";

  function voltarSeguro() {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "home.html";
    }
  }

  function obterUsuario() {
    const usuarioSalvo = localStorage.getItem(STORAGE_USUARIO);

    if (usuarioSalvo) {
      try {
        const usuario = JSON.parse(usuarioSalvo);
        return {
          nome: usuario.nome || "Aluno",
          email: usuario.email || "aluno@gmail.com",
          senha: usuario.senha || "12345678",
          foto: usuario.foto || "imagens/user.png"
        };
      } catch {
        return {
          nome: "Aluno",
          email: "aluno@gmail.com",
          senha: "12345678",
          foto: "imagens/user.png"
        };
      }
    }

    return {
      nome: "Aluno",
      email: "aluno@gmail.com",
      senha: "12345678",
      foto: "imagens/user.png"
    };
  }

  function salvarUsuario(usuario) {
    localStorage.setItem(STORAGE_USUARIO, JSON.stringify(usuario));
  }

  function obterEstatisticas() {
    const statsSalvas = localStorage.getItem(STORAGE_STATS);

    if (statsSalvas) {
      try {
        const stats = JSON.parse(statsSalvas);
        return {
          quizzes: Number(stats.quizzes) || 0,
          questoes: Number(stats.questoes) || 0,
          acertos: Number(stats.acertos) || 0,
          portugues: Number(stats.portugues) || 0,
          matematica: Number(stats.matematica) || 0
        };
      } catch {
        return {
          quizzes: 0,
          questoes: 0,
          acertos: 0,
          portugues: 0,
          matematica: 0
        };
      }
    }

    return {
      quizzes: 0,
      questoes: 0,
      acertos: 0,
      portugues: 0,
      matematica: 0
    };
  }

  function animarNumero(elemento, inicio, fim, duracao, formatador) {
  const inicioAnimacao = performance.now();

  function atualizar(agora) {
    const progresso = Math.min((agora - inicioAnimacao) / duracao, 1);
    const valor = inicio + (fim - inicio) * progresso;

    elemento.textContent = formatador(Math.round(valor));

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    } else {
      elemento.textContent = formatador(fim);
    }
  }

  requestAnimationFrame(atualizar);
}

  function calcularPercentuais(stats) {
    const total = stats.portugues + stats.matematica;

    if (total <= 0) {
      return {
        portugues: 0,
        matematica: 0
      };
    }

    const percentualPortugues = Math.round((stats.portugues / total) * 100);
    const percentualMatematica = 100 - percentualPortugues;

    return {
      portugues: percentualPortugues,
      matematica: percentualMatematica
    };
  }

  function atualizarGrafico(percentualPortugues) {
    graficoDonut.style.setProperty("--portugues", percentualPortugues);
  }

  function animarGrafico(percentualFinal) {
    const inicioAnimacao = performance.now();

    function atualizar(agora) {
      const progresso = Math.min((agora - inicioAnimacao) / 1000, 1);
      const valor = Math.round(percentualFinal * progresso);
      atualizarGrafico(valor);

      if (progresso < 1) {
        requestAnimationFrame(atualizar);
      }
    }

    requestAnimationFrame(atualizar);
  }

  function preencherPerfil() {
    const usuario = obterUsuario();
    const stats = obterEstatisticas();
    const percentuais = calcularPercentuais(stats);

    nomePerfil.textContent = usuario.nome;
    emailPerfil.textContent = usuario.email;

    nomeEditarTitulo.textContent = usuario.nome;
    emailEditarTitulo.textContent = usuario.email;

    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;
    inputSenha.value = usuario.senha;

    fotoPerfil.src = usuario.foto;
    fotoEditar.src = usuario.foto;

    animarNumero(statQuizzes, 0, stats.quizzes, 900, (v) => v);
    animarNumero(statQuestoes, 0, stats.questoes, 1100, (v) => v);
    animarNumero(statAcertos, 0, stats.acertos, 1300, (v) => v);

    animarNumero(porcentagemPortugues, 0, percentuais.portugues, 1000, (v) => `${v}%`);
    animarNumero(porcentagemMatematica, 0, percentuais.matematica, 1000, (v) => `${v}%`);

    atualizarGrafico(0);
    animarGrafico(percentuais.portugues);
  }

  function abrirEditarPerfil() {
    telaPerfil.classList.remove("ativa");
    telaEditar.classList.add("ativa");
  }

  function voltarParaPerfil() {
    telaEditar.classList.remove("ativa");
    telaPerfil.classList.add("ativa");
  }

  function habilitarEdicao(idCampo) {
    const campo = document.getElementById(idCampo);
    campo.disabled = false;
    campo.focus();
    campo.setSelectionRange(campo.value.length, campo.value.length);
  }

  function salvarAlteracoes() {
    const usuarioAtual = obterUsuario();
    const novoNome = inputNome.value.trim();
    const novaSenha = inputSenha.value.trim();

    if (!novoNome) {
      alert("Digite um nome válido.");
      return;
    }

    if (!novaSenha || novaSenha.length < 4) {
      alert("A senha precisa ter pelo menos 4 caracteres.");
      return;
    }

    const usuarioAtualizado = {
      ...usuarioAtual,
      nome: novoNome,
      senha: novaSenha,
      email: usuarioAtual.email,
      foto: usuarioAtual.foto
    };

    salvarUsuario(usuarioAtualizado);

    inputNome.disabled = true;
    inputSenha.disabled = true;

    preencherPerfil();
    voltarParaPerfil();

    alert("Alterações salvas com sucesso!");
  }

  function sairDaConta() {
    localStorage.removeItem(STORAGE_USUARIO);
    window.location.href = "index.html";
  }

  btnVoltarPerfil.addEventListener("click", voltarSeguro);
  btnVoltarEditar.addEventListener("click", voltarParaPerfil);
  btnEditarPerfil.addEventListener("click", abrirEditarPerfil);
  btnSalvarAlteracoes.addEventListener("click", salvarAlteracoes);
  btnSairConta.addEventListener("click", sairDaConta);

  document.querySelectorAll(".btn-lapis").forEach((botao) => {
    botao.addEventListener("click", () => {
      habilitarEdicao(botao.dataset.target);
    });
  });

  btnMostrarSenha.addEventListener("click", () => {
    inputSenha.type = inputSenha.type === "password" ? "text" : "password";
  });

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;

      if (page === "home") {
        window.location.href = "home.html";
      }

      if (page === "simulados") {
        window.location.href = "simulados.html";
      }

      if (page === "perfil") {
        window.location.href = "perfil.html";
      }
    });
  });

  preencherPerfil();
})();