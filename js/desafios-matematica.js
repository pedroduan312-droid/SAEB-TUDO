/* BOTÃO VOLTAR */

document.getElementById("btnVoltar").addEventListener("click", () => {

history.back();

});


/* CARDS CLICÁVEIS */

document.querySelectorAll(".card-treino").forEach(card => {
  card.addEventListener("click", () => {
    const destino = card.dataset.link;
    if(destino){
      window.location.href = destino;
    }
  });
});


/* BOTÕES DOS CARDS */

document.querySelectorAll(".btn-card").forEach(botao => {
  botao.addEventListener("click", (event) => {
    event.stopPropagation();

    const card = botao.closest(".card-treino");
    if(card){
      const destino = card.dataset.link;
      if(destino){
        window.location.href = destino;
      }
    }
  });
});