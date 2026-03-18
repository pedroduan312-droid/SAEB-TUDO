document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", function(e){
        e.preventDefault();
        
const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const confirmar = document.getElementById("confirmar").value.trim();

       if(nome === "" || email === "" || senha === "" || confirmar === ""){
    alert("Preencha todos os campos!");
    return;
}

if(nome.length < 3){
    alert("Digite um nome válido!");
    return;
}

        if(!email.includes("@") || !email.includes(".")){
            alert("Digite um email válido!");
            return;
        }

        if(senha.length < 6){
            alert("A senha precisa ter no mínimo 6 caracteres!");
            return;
        }

        if(senha !== confirmar){
            alert("As senhas não coincidem!");
            return;
        }

        alert("Conta criada com sucesso!");

        // Redireciona para login
        window.location.href = "home.html";
    });

});