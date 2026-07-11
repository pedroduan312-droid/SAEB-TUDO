/* ==========================
   DADOS INICIAIS
========================== */

const dados = JSON.parse(localStorage.getItem("desempenho")) || {

    portugues: {
        corretas: 78,
        respondidas: 100
    },

    matematica: {
        corretas: 84,
        respondidas: 100
    },

    historico: [42, 48, 55, 58, 63, 70, 75],

    sequencia: 13,

    variacao: 12

};

/* ==========================
   PORCENTAGENS
========================== */

const portuguesPct =
    dados.portugues.respondidas > 0
    ? Math.round(
        (dados.portugues.corretas /
        dados.portugues.respondidas) * 100
      )
    : 0;

const matematicaPct =
    dados.matematica.respondidas > 0
    ? Math.round(
        (dados.matematica.corretas /
        dados.matematica.respondidas) * 100
      )
    : 0;

const desempenhoGeral =
    Math.round(
        (portuguesPct + matematicaPct) / 2
    );

/* ==========================
   CÍRCULO PRINCIPAL
========================== */

const circle = document.querySelector(".circle");

circle.style.setProperty(
    "--progress",
    `${desempenhoGeral}%`
);

let cor = "#2F8BFF";

if(desempenhoGeral < 30){
    cor = "#F44336";
}
else if(desempenhoGeral < 50){
    cor = "#FF9800";
}
else if(desempenhoGeral < 70){
    cor = "#FEC929";
}
else if(desempenhoGeral < 90){
    cor = "#1E50F3";
}
else{
    cor = "#37E460";
}

circle.style.setProperty(
    "--circle-color",
    cor
);

document.getElementById(
    "percentualGeral"
).innerText =
`${desempenhoGeral}%`;

/* ==========================
   MENSAGENS
========================== */

const mensagens = {

    ruim: [
        "Continue praticando!",
        "Todo começo é difícil.",
        "Persistência traz resultados."
    ],

    medio: [
        "Você está evoluindo!",
        "Bom trabalho!",
        "Continue estudando."
    ],

    bom: [
        "Muito bom!",
        "Excelente evolução!",
        "Continue nesse ritmo!"
    ],

    excelente: [
        "Excelente!",
        "Resultado impressionante!",
        "Desempenho excepcional!"
    ]

};

let titulo = "";
let mensagem = "";

if(desempenhoGeral < 30){

    titulo = "Continue!";
    mensagem =
    mensagens.ruim[
        Math.floor(
            Math.random() *
            mensagens.ruim.length
        )
    ];

}
else if(desempenhoGeral < 70){

    titulo = "Bom trabalho!";
    mensagem =
    mensagens.medio[
        Math.floor(
            Math.random() *
            mensagens.medio.length
        )
    ];

}
else if(desempenhoGeral < 90){

    titulo = "Muito Bom!";
    mensagem =
    mensagens.bom[
        Math.floor(
            Math.random() *
            mensagens.bom.length
        )
    ];

}
else{

    titulo = "Excelente!";
    mensagem =
    mensagens.excelente[
        Math.floor(
            Math.random() *
            mensagens.excelente.length
        )
    ];

}

document.getElementById(
    "tituloDesempenho"
).innerText = titulo;

document.getElementById(
    "mensagemDesempenho"
).innerText = mensagem;

/* ==========================
   VARIAÇÃO
========================== */

const variacao =
document.getElementById("variacao");

if(dados.variacao >= 0){

    variacao.innerText =
    `+${dados.variacao}%`;

    variacao.style.background =
    "#DDF7E6";

    variacao.style.color =
    "#37E460";

}
else{

    variacao.innerText =
    `${dados.variacao}%`;

    variacao.style.background =
    "#FFE3E3";

    variacao.style.color =
    "#F44336";

}

/* ==========================
   BARRAS
========================== */

document.getElementById(
    "portuguesValor"
).innerText =
`${portuguesPct}%`;

document.getElementById(
    "matematicaValor"
).innerText =
`${matematicaPct}%`;

setTimeout(() => {

    document.getElementById(
        "barraPortugues"
    ).style.width =
    `${portuguesPct}%`;

    document.getElementById(
        "barraMatematica"
    ).style.width =
    `${matematicaPct}%`;

}, 300);

/* ==========================
   GRÁFICO
========================== */

const canvas =
document.getElementById(
    "graficoEvolucao"
);

const ctx =
canvas.getContext("2d");

const pontos =
dados.historico;

const largura =
canvas.width;

const altura =
canvas.height;

ctx.strokeStyle =
"#1E50F3";

ctx.lineWidth = 4;

ctx.beginPath();

pontos.forEach((valor, index) => {

    const x =
    (largura / 6) * index;

    const y =
    altura -
    ((valor / 100) * altura);

    if(index === 0){
        ctx.moveTo(x, y);
    }
    else{
        ctx.lineTo(x, y);
    }

});

ctx.stroke();

/* pontos */

pontos.forEach((valor, index) => {

    const x =
    (largura / 6) * index;

    const y =
    altura -
    ((valor / 100) * altura);

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        6,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
    "#1E50F3";

    ctx.fill();

});

/* ==========================
   CALENDÁRIO
========================== */

const calendario =
document.getElementById(
    "calendarioSequencia"
);

for(let i = 1; i <= 31; i++){

    const dia =
    document.createElement("div");

    if(i <= dados.sequencia){
        dia.classList.add("ativo");
    }

    calendario.appendChild(dia);

}

/* ==========================
   SEQUÊNCIA
========================== */

const dias =
dados.sequencia;

document.getElementById(
    "diasSequencia"
).innerText =
`${dias} Dias`;

const mensagemSeq =
document.getElementById(
    "mensagemSequencia"
);

if(dias === 0){
    mensagemSeq.innerText =
    "Comece hoje mesmo!";
}
else if(dias < 7){
    mensagemSeq.innerText =
    "Bom começo!";
}
else if(dias < 15){
    mensagemSeq.innerText =
    "Continue assim!";
}
else if(dias < 30){
    mensagemSeq.innerText =
    "Ótimo ritmo!";
}
else{
    mensagemSeq.innerText =
    "Impressionante!";
}