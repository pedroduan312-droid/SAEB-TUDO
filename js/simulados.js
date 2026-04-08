/* CARDS CLICÁVEIS */

document.querySelectorAll(".card-cardapio").forEach(card => {
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

    const card = botao.closest(".card-cardapio");
    if(card){
      const destino = card.dataset.link;
      if(destino){
        window.location.href = destino;
      }
    }
  });
});


/* NAVBAR */

document.querySelectorAll(".nav-item").forEach(btn => {
  btn.onclick = () => {
    const page = btn.dataset.page;

    if (page === "home") {
      window.location.href = "home.html";
    }

    if (page === "simulados") {
      window.location.href = "simulados.html";
    }

     if (page === "desempenho") {
      window.location.href = "desempenho.html";
    }

    if (page === "perfil") {
      window.location.href = "perfil.html";
    }
  };
});