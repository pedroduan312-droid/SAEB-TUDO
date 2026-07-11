/* ==========================
   USUÁRIO
========================== */

const usuario = JSON.parse(
    localStorage.getItem("saebTudoUsuario")
) || {};

/* ==========================
   SAUDAÇÃO
========================== */

const tituloSaudacao =
    document.getElementById(
        "tituloSaudacao"
    );

const hora =
    new Date().getHours();

let saudacao = "Bom dia";

if(hora >= 12 && hora < 18){
    saudacao = "Boa tarde";
}

if(hora >= 18){
    saudacao = "Boa noite";
}

tituloSaudacao.textContent =
`${saudacao}, ${usuario.nome || "Aluno"}!`;

/* ==========================
   FOTO PERFIL
========================== */

const fotoPerfilHome =
    document.getElementById(
        "fotoPerfil"
    );

if(usuario.foto){
    fotoPerfilHome.src =
        usuario.foto;
}

/* ==========================
   CARROSSEL
========================== */

const track =
    document.querySelector(".carousel-track");

const dots =
    document.querySelectorAll(".dot");

const totalSlides =
    document.querySelectorAll(".banner").length;

let slideAtual = 0;

function atualizarCarousel(){

    track.style.transform =
        `translateX(-${slideAtual * 100}%)`;

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    dots[slideAtual]
        .classList.add("active");
}

function proximoSlide(){

    slideAtual++;

    if(slideAtual >= totalSlides){
        slideAtual = 0;
    }

    atualizarCarousel();
}

setInterval(proximoSlide,8000);


/* ==========================
   SWIPE
========================== */

let startX = 0;
let endX = 0;

track.addEventListener(
    "touchstart",
    e=>{

        startX =
            e.touches[0].clientX;

    }
);

track.addEventListener(
    "touchend",
    e=>{

        endX =
            e.changedTouches[0].clientX;

        if(startX - endX > 50){

            slideAtual++;

            if(slideAtual >= totalSlides){
                slideAtual = 0;
            }

            atualizarCarousel();
        }

        if(endX - startX > 50){

            slideAtual--;

            if(slideAtual < 0){
                slideAtual =
                    totalSlides - 1;
            }

            atualizarCarousel();
        }

    }
);


/* ==========================
   SEQUÊNCIA
========================== */

const calendario =
    document.getElementById(
        "calendarioSequencia"
    );

const diasSequencia =
    Number(
        localStorage.getItem(
            "diasSequencia"
        )
    ) || 13;

document.getElementById(
    "diasSequencia"
).textContent =
`${diasSequencia} Dias`;

const diasMes =
    new Date(
        new Date().getFullYear(),
        new Date().getMonth()+1,
        0
    ).getDate();

for(let i=1;i<=diasMes;i++){

    const ponto =
        document.createElement("div");

    if(i <= diasSequencia){
        ponto.classList.add("ativo");
    }

    calendario.appendChild(ponto);
}


/* ==========================
   NAVBAR
========================== */

const paginaAtual =
window.location.pathname
.split("/")
.pop();

document
.querySelectorAll(".nav-item")
.forEach(item=>{

    const link =
        item.getAttribute("href");

    if(link === paginaAtual){

        item.classList.add(
            "active"
        );

    }

});