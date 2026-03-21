document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroForm");

  const CHAVE_USUARIO = "saebTudoUsuario";
  const CHAVE_SESSAO = "saebTudoSessao";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();

    if (nome === "" || email === "" || senha === "" || confirmar === "") {
      alert("Preencha todos os campos!");
      return;
    }

    if (nome.length < 3) {
      alert("Digite um nome válido!");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Digite um email válido!");
      return;
    }

    if (senha.length < 6) {
      alert("A senha precisa ter no mínimo 6 caracteres!");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    const usuarioExistente = localStorage.getItem(CHAVE_USUARIO);

    if (usuarioExistente) {
      try {
        const usuarioSalvo = JSON.parse(usuarioExistente);

        if (usuarioSalvo.email === email) {
          alert("Já existe uma conta com esse email!");
          return;
        }
      } catch (erro) {
        console.warn("Erro ao ler usuário salvo.", erro);
      }
    }

    const novoUsuario = {
      nome,
      email,
      senha,
      foto: "imagens/user.png"
    };

    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(novoUsuario));

    localStorage.setItem(
      CHAVE_SESSAO,
      JSON.stringify({
        logado: true,
        email
      })
    );

    alert("Conta criada com sucesso!");
    window.location.href = "home.html";
  });
});