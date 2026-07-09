/* ==========================
   NAVBAR ATIVA
========================== */

const paginaAtual =
window.location.pathname
.split("/")
.pop();

document
.querySelectorAll(".nav-item")
.forEach(item => {

    const link =
    item.getAttribute("href");

    if(link === paginaAtual){

        item.classList.add("active");

    }

});


/* ==========================
   ANIMAÇÃO DOS BOTÕES
========================== */

document
.querySelectorAll(
    ".btn-card, .btn-mini"
)
.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            botao.style.transform =
            "scale(.96)";

            setTimeout(() => {

                botao.style.transform =
                "";

            },150);

        }
    );

});


/* ==========================
   PREPARAÇÃO PARA FUTUROS
   FILTROS E ESTATÍSTICAS
========================== */

console.log(
    "Página de Simulados carregada!"
);