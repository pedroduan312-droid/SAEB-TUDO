const form = document.getElementById("cadastroForm");

const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const toggleSenha = document.getElementById("toggleSenha");
const toggleConfirmar = document.getElementById("toggleConfirmar");

/* MOSTRAR SENHA */

toggleSenha.addEventListener("click",()=>{

    senha.type =
        senha.type === "password"
        ? "text"
        : "password";

    toggleSenha.src =
        senha.type === "password"
        ? "imagens/olho-fechado.svg"
        : "imagens/olho.svg";

});

toggleConfirmar.addEventListener("click",()=>{

    confirmarSenha.type =
        confirmarSenha.type === "password"
        ? "text"
        : "password";

    toggleConfirmar.src =
        confirmarSenha.type === "password"
        ? "imagens/olho-fechado.svg"
        : "imagens/olho.svg";

});

/* CADASTRO */

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const usuario =
        document.getElementById("usuario").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const termos =
        document.getElementById("termos").checked;

    if(!usuario){

        alert("Informe um usuário.");
        return;

    }

    if(!email.includes("@")){

        alert("Informe um e-mail válido.");
        return;

    }

    if(senha.value.length < 6){

        alert("A senha deve possuir pelo menos 6 caracteres.");
        return;

    }

    if(senha.value !== confirmarSenha.value){

        alert("As senhas não coincidem.");
        return;

    }

    if(!termos){

        alert("Aceite os termos para continuar.");
        return;

    }

const dadosUsuario = {

    nome: usuario,
    email: email,
    senha: senha.value,
    foto: "imagens/perfil-padrao.png"

};

localStorage.setItem(
    "saebTudoUsuario",
    JSON.stringify(dadosUsuario)
);

localStorage.setItem(
    "usuarioLogado",
    "true"
);

window.location.href = "home.html";

});