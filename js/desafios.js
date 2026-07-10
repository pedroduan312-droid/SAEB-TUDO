document.getElementById("btnVoltar")
.addEventListener("click", () => {
    history.back();
});

document.querySelectorAll("[data-link]")
.forEach(card => {

    card.addEventListener("click", () => {

        const destino = card.dataset.link;

        if(destino){
            window.location.href = destino;
        }

    });

});