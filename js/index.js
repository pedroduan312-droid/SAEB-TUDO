// FUTURAMENTE

/*
const usuarioLogado = localStorage.getItem("usuarioLogado");

if(usuarioLogado){
    window.location.href = "home.html";
}
*/

const content = document.querySelector(".content");
const livro = document.querySelector(".livro");

setTimeout(() => {

    document.body.classList.add("loaded");

    content.classList.add("show");

    livro.classList.add("show");

}, 2500);