/* ==========================
   USUÁRIO
========================== */

const nomeUsuario =
    localStorage.getItem("nomeUsuario") || "Aluno";

const fotoUsuario =
    localStorage.getItem("fotoUsuario") || "imagens/user.png";

document.getElementById("userPhoto").src = fotoUsuario;


/* ==========================
   SAUDAÇÃO
========================== */

const greetingElement =
    document.getElementById("greeting");

const hora = new Date().getHours();

let saudacao = "";

if(hora >= 5 && hora < 12){
    saudacao = "Bom dia";
}
else if(hora >= 12 && hora < 18){
    saudacao = "Boa tarde";
}
else{
    saudacao = "Boa noite";
}

greetingElement.textContent =
    `${saudacao}, ${nomeUsuario}!`;


/* ==========================
   FRASES MOTIVACIONAIS
========================== */

const frases = [

    "Continue sua jornada e conquiste grandes resultados.",

    "Cada questão respondida aproxima você do objetivo.",

    "Seu futuro está sendo construído agora.",

    "Pequenos avanços geram grandes resultados.",

    "Hoje é um ótimo dia para aprender algo novo.",

    "Consistência supera intensidade.",

    "Mais uma questão, mais perto da aprovação.",

    "O conhecimento de hoje é a conquista de amanhã.",

    "Você está mais perto da sua meta do que imagina.",

    "Estudar um pouco todos os dias faz diferença."
];

const fraseAleatoria =
    frases[Math.floor(Math.random() * frases.length)];

document.getElementById(
    "motivationText"
).textContent = fraseAleatoria;


/* ==========================
   CARROSSEL
========================== */

const slides =
    document.querySelectorAll(".carousel-slide");

const indicators =
    document.querySelectorAll(".indicator");

let slideAtual = 0;

function mostrarSlide(index){

    slides.forEach(slide=>{
        slide.style.display = "none";
    });

    indicators.forEach(indicator=>{
        indicator.classList.remove("active");
    });

    slides[index].style.display = "block";

    indicators[index].classList.add("active");
}

mostrarSlide(slideAtual);

setInterval(()=>{

    slideAtual++;

    if(slideAtual >= slides.length){
        slideAtual = 0;
    }

    mostrarSlide(slideAtual);

},8000);


/* ==========================
   STREAK
========================== */

const hoje = new Date();

const hojeFormatado =
    hoje.toISOString().split("T")[0];

let streak =
    parseInt(localStorage.getItem("streak")) || 0;

const ultimoDia =
    localStorage.getItem("ultimoDiaRespondido");

if(!ultimoDia){

    localStorage.setItem(
        "ultimoDiaRespondido",
        hojeFormatado
    );
}

const diferencaDias = ultimoDia
? Math.floor(
    (
        new Date(hojeFormatado) -
        new Date(ultimoDia)
    ) / (1000 * 60 * 60 * 24)
)
: 0;

if(diferencaDias > 1){

    streak = 0;

    localStorage.setItem(
        "streak",
        streak
    );
}

document.getElementById(
    "streakDays"
).textContent =
`${streak} Dias`;


/* ==========================
   NAVEGAÇÃO
========================== */

document.querySelectorAll(".nav-item")
.forEach(item=>{

    item.addEventListener("click",()=>{

        document
            .querySelector(".nav-item.active")
            ?.classList
            .remove("active");

        item.classList.add("active");

    });

});


/* ==========================
   LINKS
========================== */

document.querySelector(".portugues")
.addEventListener("click",()=>{

    window.location.href =
        "desafios-portugues.html";

});

document.querySelector(".matematica")
.addEventListener("click",()=>{

    window.location.href =
        "desafios-matematica.html";

});

document.querySelector(".simulados")
.addEventListener("click",()=>{

    window.location.href =
        "simulados.html";

});

document.querySelector(".desafios")
.addEventListener("click",()=>{

    window.location.href =
        "desafios.html";

});


/* ==========================
   TREINOS RÁPIDOS
========================== */

document.querySelector(".quick-questions")
.addEventListener("click",()=>{

    window.location.href =
        "quiz.html";

});

document.querySelector(".quick-challenge")
.addEventListener("click",()=>{

    window.location.href =
        "quiz.html";

});