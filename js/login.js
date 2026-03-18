const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if(email === "" || senha === ""){
        alert("Preencha todos os campos!");
        return;
    }

    if(!email.includes("@")){
        alert("Digite um email válido!");
        return;
    }

    // Simulação de login correto
    alert("Login realizado com sucesso! 🚀");

    // REDIRECIONA PARA OUTRA PÁGINA
    window.location.href = "home.html";
});