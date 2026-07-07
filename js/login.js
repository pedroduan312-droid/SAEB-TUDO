const form = document.getElementById("loginForm");

const senhaInput = document.getElementById("senha");

const toggleSenha = document.getElementById("toggleSenha");

toggleSenha.addEventListener("click", () => {

    if(senhaInput.type === "password"){

        senhaInput.type = "text";

        toggleSenha.src = "imagens/olho.svg";

    }else{

        senhaInput.type = "password";

        toggleSenha.src = "imagens/olho-fechado.svg";

    }

});

form.addEventListener("submit", (e)=>{

    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();

    const senha = senhaInput.value.trim();

    if(usuario === "" || senha === ""){

        alert("Preencha todos os campos.");

        return;

    }

    // Futuramente:
    // autenticação real

    localStorage.setItem("usuarioLogado","true");

    window.location.href = "home.html";

});