//Variáveis
let xBolinha = 200;
let yBolinha = 200;
let diametro = 30;

let velocidadeXBolinha = 6;
let velocidadeyBolinha = 6;

// variaveis minharaquete
let xRaqueteJogador = 5;
let yRaqueteJogador = 150;
let larguraRaqueteJogador = 10;
let alturaRaqueteJogador = 90;

// variáveis raquete oponente
let xRaqueteOponente = 385;
let yRaqueteOponente = 150;
let larguraRaqueteOponente = 10;
let alturaRaqueteOponente = 90;
let velocidadeYoponente;

//colisao
let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(400, 400);
  trilha.loop();
}

function draw() {
  background("black");
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaqueteJogador();
  mostraRaqueteOponente()
  movimentaRaqueteJogador();
  movimentaRaqueteOponente ();
  verificaColisaoRaqueteJogador();
  verificaColisaoRaqueteOponete()
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  fill("rgb(54,138,17)"); // preenchimento com "cor"
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisao() {
  if (xBolinha > width || xBolinha < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha > height || yBolinha < 0) {
    velocidadeyBolinha *= -1;
  }
}

function mostraRaqueteJogador() {
  fill("blue");
  stroke("yellow");

  rect(
    xRaqueteJogador,
    yRaqueteJogador,
    larguraRaqueteJogador,
    alturaRaqueteJogador
  );
}

function mostraRaqueteOponente() {
  fill("blue");
  stroke("yellow");

  rect(
    xRaqueteOponente,
    yRaqueteOponente,
    larguraRaqueteOponente,
    alturaRaqueteOponente
  );
}

function movimentaRaqueteJogador() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteJogador -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteJogador += 10;
  }
}

function verificaColisaoRaqueteJogador() {
  colidiu = collideRectCircle(
    xRaqueteJogador,
    yRaqueteJogador,
    larguraRaqueteJogador,
    alturaRaqueteJogador,
    xBolinha,
    yBolinha,
    diametro / 2
  );
  if (colidiu==true){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaqueteOponete() {
  colidiu = collideRectCircle(
    xRaqueteOponente,
    yRaqueteOponente,
    larguraRaqueteOponente,
    alturaRaqueteOponente,
    xBolinha,
    yBolinha,
    diametro / 2
  );
  if (colidiu==true){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente (){
  velocidadeYoponente = yBolinha - yRaqueteOponente - alturaRaqueteOponente/2 - 30;
yRaqueteOponente+= velocidadeYoponente + chanceDeErrar;
  calculaChanceDeErrar()
  // if (keyIsDown(87)) {
  //  yRaqueteJogador -= 10;  }
  //if (keyIsDown(83)) {
  //  yRaqueteJogador += 10;  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  fill(color(255, 140,0));
  rect(220, 10, 40, 20);
  fill(255);
  text(meusPontos, 230, 26);
  fill(color(255, 140,0));
  rect(90, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 100, 26);
  textSize (20);
  
}

function marcaPonto() {
  if (xBolinha > 395) {
    meusPontos += 1;
      ponto.play();
  }
  if (xBolinha < 01) {
    pontosDoOponente += 1;
      ponto.play();
  }
}
