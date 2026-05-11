let clientes = [];
let slider;

function setup() {
  const c = createCanvas(700, 480);
  c.parent('sketch-holder');
  slider = createSlider(5, 30, 15, 1);
  slider.parent('sketch-holder');
  slider.position(20, 430);
  slider.style('width', '660px');

  randomSeed(42);
  for (let i = 0; i < 200; i++) {
    const risco = random(2, 28);
    const retorno = map(risco, 2, 28, 80, 10) + random(-15, 15);
    clientes.push({ risco, retorno: max(0, retorno) });
  }
  textFont('Arial');
}

function draw() {
  background('#0f2440');
  const limiar = slider.value();

  stroke('#2b4a6f'); strokeWeight(1);
  line(60, 380, 660, 380); 
  line(60, 40, 60, 380);
  noStroke();
  fill('#8aa9c9'); 
  textSize(11); 
  textAlign(CENTER);
  text('Risco de inadimplência (%)', 360, 405);
  push(); 
  translate(20, 210); rotate(-HALF_PI);
  text('Retorno mensal esperado (R$)', 0, 0); 
  pop();
  textAlign(LEFT);

  const xLim = map(limiar, 0, 30, 60, 660);
  stroke('#00a3e0'); 
  strokeWeight(2); 
  drawingContext.setLineDash([6, 4]);
  line(xLim, 40, xLim, 380);
  drawingContext.setLineDash([]); 
  noStroke();
  fill('#00a3e0'); 
  textSize(11);
  text('limiar ' + limiar + '%', xLim + 6, 55);

  let aprovados = 0, analise = 0, negados = 0;
  for (const cli of clientes) {
    const x = map(cli.risco, 0, 30, 60, 660);
    const y = map(cli.retorno, 0, 100, 380, 40);
    let cor; 
    if (cli.risco <= limiar - 5) { cor = '#3ddc97'; aprovados++; }
    else if (cli.risco <= limiar) { cor = '#ffb84d'; analise++; }
    else { cor = '#ff4d6d'; negados++; }
    fill(cor); circle(x, y, 8);
  }

  desenharKPI(80,  60, 'APROVADOS',  aprovados, '#3ddc97');
  desenharKPI(290, 60, 'ANÁLISE',    analise,   '#ffb84d');
  desenharKPI(500, 60, 'NEGADOS',    negados,   '#ff4d6d');
}

function desenharKPI(x, y, label, valor, cor) {
  fill('#16314f'); 
  rect(x, y, 130, 50, 6);
  fill('#8aa9c9'); 
  textSize(10); 
  text(label, x + 12, y + 18);
  fill(cor); 
  textSize(22); 
  textStyle(BOLD);
  text(valor + ' / 200', x + 12, y + 40);
  textStyle(NORMAL);
}