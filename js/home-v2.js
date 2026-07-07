/* ==========================
   SAUDAÇÃO DINÂMICA
========================== */

const saudacao = document.getElementById("saudacao");
const fraseMotivacional = document.getElementById("fraseMotivacional");

const hora = new Date().getHours();

let periodo = "Bom dia";

if (hora >= 12 && hora < 18) {
    periodo = "Boa tarde";
} else if (hora >= 18) {
    periodo = "Boa noite";
}

/* ==========================
   PEGAR NOME DO USUÁRIO
========================== */

function obterNomeUsuario() {

    const usuarioSalvo =
        localStorage.getItem("saebTudoUsuario");

    if (!usuarioSalvo) {
        return "Aluno";
    }

    try {

        const usuario =
            JSON.parse(usuarioSalvo);

        return usuario.nome &&
               usuario.nome.trim() !== ""
            ? usuario.nome
            : "Aluno";

    } catch {

        return "Aluno";

    }

}

const nomeUsuario =
    obterNomeUsuario();

saudacao.textContent =
`${periodo}, ${nomeUsuario}!`;

/* ==========================
   FRASES MOTIVACIONAIS
========================== */

const frases = [

    "Continue sua jornada e conquiste grandes resultados.",

    "Cada questão resolvida te deixa mais preparado.",

    "A prática leva à evolução.",

    "Você está mais perto dos seus objetivos.",

    "Pequenos avanços geram grandes conquistas.",

    "Não pare agora, continue aprendendo.",

    "Hoje é um ótimo dia para praticar.",

    "Seu esforço de hoje será seu resultado amanhã.",

    "Bora encarar mais alguns desafios?",

    "Você consegue ir ainda mais longe.",

    "Treinar um pouco por dia faz toda diferença.",

    "O conhecimento é construído passo a passo.",

    "Continue firme na sua jornada.",

    "Resolver questões é a melhor forma de aprender.",

    "Seu futuro agradece seu esforço de hoje."

];

const fraseAleatoria =
frases[Math.floor(Math.random() * frases.length)];

fraseMotivacional.textContent =
fraseAleatoria;

/* ==========================
   DESAFIO DO DIA
========================== */

const btnDesafio =
document.getElementById("btnDesafio");

if(btnDesafio){

    btnDesafio.addEventListener(
        "click",
        () => {

            window.location.href =
            "quiz.html?modo=geral_rapido";

        }
    );

}

/* ==========================
   META DA SEMANA
========================== */

const btnMeta =
document.querySelector(".btn-meta");

if(btnMeta){

    btnMeta.addEventListener(
        "click",
        () => {

            window.location.href =
            "quiz.html?modo=geral_rapido";

        }
    );

}

/* ==========================
   MATÉRIAS
========================== */

document
.querySelectorAll(".materia-card")
.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const materia =
            card.dataset.materia;

            window.location.href =
            `quiz.html?materia=${materia}&modo=completo`;

        }
    );

});

/* ==========================
   VER MAIS CONQUISTAS
========================== */

const verMais =
document.querySelector(".ver-mais");

if(verMais){

    verMais.addEventListener(
        "click",
        () => {

            alert(
                "Sistema de conquistas em desenvolvimento 🚀"
            );

        }
    );

}

/* ==========================
   NAVBAR
========================== */

document
.querySelectorAll(".nav-item")
.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            const pagina =
            botao.dataset.page;

            switch(pagina){

                case "home":
                    window.location.href =
                    "home-v2.html";
                break;

                case "simulados":
                    window.location.href =
                    "simulados.html";
                break;

                case "desempenho":
                    window.location.href =
                    "desempenho.html";
                break;

                case "perfil":
                    window.location.href =
                    "perfil.html";
                break;

            }

        }
    );

});

/* ==========================
   ANIMAÇÃO DE ENTRADA
========================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

/* ==========================
   FUTURO
========================== */

/*

- Sistema de conquistas
- Meta semanal real
- Continue de onde parou
- Ranking
- Notificações
- XP e níveis

*/