(() => {

    const STORAGE_USUARIO = "saebTudoUsuario";
    const STORAGE_STATS = "saebTudoEstatisticas";

    /* ==========================
       ELEMENTOS
    ========================== */

    const nomePerfil = document.getElementById("nomePerfil");
    const fotoPerfil = document.getElementById("fotoPerfil");

    const statQuizzes = document.getElementById("statQuizzes");
    const statQuestoes = document.getElementById("statQuestoes");
    const statAcertos = document.getElementById("statAcertos");

    const btnEditarPerfil = document.getElementById("btnEditarPerfil");
    const btnAjuda = document.getElementById("btnAjuda");
    const btnSairConta = document.getElementById("btnSairConta");

    const modalEditar = document.getElementById("modalEditar");
    const fecharModal = document.getElementById("fecharModal");

    const modalSair = document.getElementById("modalSair");
    const cancelarSair = document.getElementById("cancelarSair");
    const confirmarSair = document.getElementById("confirmarSair");

    const inputNome = document.getElementById("inputNome");
    const inputEmail = document.getElementById("inputEmail");
    const inputSenha = document.getElementById("inputSenha");

    const fotoEditar = document.getElementById("fotoEditar");
    const inputFoto = document.getElementById("inputFoto");

    const btnTrocarFoto = document.getElementById("btnTrocarFoto");
    const btnRemoverFoto = document.getElementById("btnRemoverFoto");
    const btnSalvarAlteracoes = document.getElementById("btnSalvarAlteracoes");

    const btnMostrarSenha = document.getElementById("btnMostrarSenha");

    /* ==========================
       USUÁRIO
    ========================== */

    function obterUsuario(){

        const usuarioSalvo = localStorage.getItem(STORAGE_USUARIO);

        if(usuarioSalvo){

            try{
                return JSON.parse(usuarioSalvo);
            }

            catch(e){}

        }

        return{

            nome:"Aluno",
            email:"aluno@email.com",
            senha:"123456",
            foto:"imagens/perfil-padrao.png"

        };

    }

    function salvarUsuario(usuario){

        localStorage.setItem(
            STORAGE_USUARIO,
            JSON.stringify(usuario)
        );

    }

    /* ==========================
       ESTATÍSTICAS
    ========================== */

    function obterStats(){

        const statsSalvas =
            localStorage.getItem(STORAGE_STATS);

        if(statsSalvas){

            try{
                return JSON.parse(statsSalvas);
            }

            catch(e){}

        }

        return{

            quizzes:0,
            questoes:0,
            acertos:0

        };

    }

    /* ==========================
       ANIMAÇÃO DOS NÚMEROS
    ========================== */

    function animarNumero(
        elemento,
        inicio,
        fim,
        duracao
    ){

        const inicioAnimacao = performance.now();

        function atualizar(agora){

            const progresso =
                Math.min(
                    (agora - inicioAnimacao) / duracao,
                    1
                );

            const valor =
                Math.floor(
                    inicio + ((fim - inicio) * progresso)
                );

            elemento.textContent = valor;

            if(progresso < 1){
                requestAnimationFrame(atualizar);
            }

        }

        requestAnimationFrame(atualizar);

    }

    /* ==========================
       CARREGAR PERFIL
    ========================== */

    function carregarPerfil(){

        const usuario = obterUsuario();
        const stats = obterStats();

        nomePerfil.textContent = usuario.nome;

        fotoPerfil.src = usuario.foto;
        fotoEditar.src = usuario.foto;

        inputNome.value = usuario.nome;
        inputEmail.value = usuario.email;
        inputSenha.value = usuario.senha;

        animarNumero(
            statQuizzes,
            0,
            stats.quizzes || 0,
            800
        );

        animarNumero(
            statQuestoes,
            0,
            stats.questoes || 0,
            1000
        );

        animarNumero(
            statAcertos,
            0,
            stats.acertos || 0,
            1200
        );

    }

    /* ==========================
       MODAL EDITAR
    ========================== */

    btnEditarPerfil.onclick = () => {

        modalEditar.classList.add("show");

    };

    fecharModal.onclick = () => {

        modalEditar.classList.remove("show");

    };

    window.addEventListener("click",(e)=>{

        if(e.target === modalEditar){
            modalEditar.classList.remove("show");
        }

        if(e.target === modalSair){
            modalSair.classList.remove("show");
        }

    });

    /* ==========================
       ALTERAR FOTO
    ========================== */

    btnTrocarFoto.onclick = () => {

        inputFoto.click();

    };

    inputFoto.addEventListener(
        "change",
        function(){

            const arquivo = this.files[0];

            if(!arquivo) return;

            const leitor = new FileReader();

            leitor.onload = function(e){

                fotoEditar.src = e.target.result;

            };

            leitor.readAsDataURL(arquivo);

        }
    );

    btnRemoverFoto.onclick = () => {

        fotoEditar.src =
            "imagens/perfil-padrao.png";

    };

    /* ==========================
       MOSTRAR SENHA
    ========================== */

    btnMostrarSenha.onclick = () => {

        if(inputSenha.type === "password"){

            inputSenha.type = "text";

        }

        else{

            inputSenha.type = "password";

        }

    };

    /* ==========================
       SALVAR ALTERAÇÕES
    ========================== */

    btnSalvarAlteracoes.onclick = () => {

        const usuario = {

            nome:inputNome.value.trim(),
            email:inputEmail.value.trim(),
            senha:inputSenha.value.trim(),
            foto:fotoEditar.src

        };

        if(usuario.nome.length < 2){

            alert("Digite um nome válido.");
            return;

        }

        if(usuario.email.length < 5){

            alert("Digite um e-mail válido.");
            return;

        }

        if(usuario.senha.length < 4){

            alert(
                "A senha deve possuir pelo menos 4 caracteres."
            );

            return;

        }

        salvarUsuario(usuario);

        carregarPerfil();

        modalEditar.classList.remove("show");

        alert(
            "Perfil atualizado com sucesso!"
        );

    };

    /* ==========================
       AJUDA
    ========================== */

    btnAjuda.onclick = () => {

        alert(
            "Central de ajuda em breve."
        );

    };

    /* ==========================
       SAIR
    ========================== */

    btnSairConta.onclick = () => {

        modalSair.classList.add("show");

    };

    cancelarSair.onclick = () => {

        modalSair.classList.remove("show");

    };

    confirmarSair.onclick = () => {

        localStorage.removeItem(
            STORAGE_USUARIO
        );

        window.location.href =
            "index.html";

    };

    /* ==========================
       INICIAR
    ========================== */

    carregarPerfil();

})();