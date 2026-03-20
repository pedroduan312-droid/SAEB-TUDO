/* SAUDAÇÃO AUTOMÁTICA */

const saudacao = document.getElementById("saudacao");

const hora = new Date().getHours();

let texto = "Bom dia";

if(hora >= 12 && hora < 18){

texto = "Boa tarde";

}

else if(hora >= 18){

texto = "Boa noite";

}

saudacao.innerText = texto + "! Aluno";


/* DESAFIO DO DIA */


document.getElementById("btnDesafio").onclick = () => {
  window.location.href = "quiz.html?modo=geral_rapido";
};

/* QUESTÕES RÁPIDAS */

document.getElementById("btnRapido").onclick = () => {
  window.location.href = "quiz.html?modo=geral_rapido";
};


/* MATÉRIAS */

document.querySelectorAll(".materia").forEach(card => {

card.onclick = () => {

const materia = card.dataset.materia;

window.location.href = `quiz.html?materia=${materia}&modo=completo`;

};

});


/* NAVBAR */

document.querySelectorAll(".nav-item").forEach(btn => {

btn.onclick = () => {

const page = btn.dataset.page;

if(page === "home"){

window.location.href = "home.html";

}

if(page === "simulados"){

window.location.href = "simulados.html";

}

if(page === "perfil"){

window.location.href = "perfil.html";

}

};

});