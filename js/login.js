document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const btnGoogle = document.getElementById("btnGoogle");

  const CHAVE_USUARIO = "saebTudoUsuario";
  const CHAVE_SESSAO = "saebTudoSessao";

  const usuarioSalvo = localStorage.getItem(CHAVE_SESSAO);

  if (usuarioSalvo === "true") {
    window.location.href = "home.html";
    return;
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if(email === "" || senha === ""){
      alert("Preencha todos os campos!");
      return;
    }

    if(!email.includes("@") || !email.includes(".")){
      alert("Digite um email válido!");
      return;
    }

    const usuarioBruto = localStorage.getItem(CHAVE_USUARIO);

    if (!usuarioBruto) {
      alert("Nenhuma conta encontrada. Crie uma conta primeiro.");
      return;
    }

    let usuario;

    try {
      usuario = JSON.parse(usuarioBruto);
    } catch {
      alert("Erro ao carregar os dados da conta.");
      return;
    }

    if (email !== usuario.email || senha !== usuario.senha) {
      alert("Email ou senha incorretos!");
      return;
    }

    localStorage.setItem(CHAVE_SESSAO, "true");

    alert("Login realizado com sucesso! 🚀");
    window.location.href = "home.html";
  });

  btnGoogle.addEventListener("click", () => {
    alert("A opção de entrar com Google ainda não está disponível nesta versão.");
  });
});