const splash = document.querySelector(".splash");

window.addEventListener("load", function(){

setTimeout(() => {

splash.classList.add("hide");

}, 2500); // tempo da splash

});

const entrar = document.getElementById("entrar");
const criar = document.getElementById("criar");

entrar.addEventListener("click", function(){

window.location.href = "login.html";

});

criar.addEventListener("click", function(){

window.location.href = "cadastro.html";

});