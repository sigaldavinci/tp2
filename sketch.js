// === PRIMER CANVAS INTERACTIVO 2D CON FORMAS (ya tenías) ===
let canvas;
let coheteImg;

function preload(){
  coheteImg = loadImage("img/cohete.png");
}

function setup() {
  canvas = createCanvas(1000, 400);
  canvas.parent("arte-generativo");
  noStroke();
  background(10);
}

function draw() {
  fill(10, 10, 10, 20);
  rect(0, 0, width, height);

  if (mouseX < width / 2 && mouseY < height / 2) {
    fill(0, 255, 180);
    circle(mouseX, mouseY, 40);
  } else if (mouseX >= width / 2 && mouseY < height / 2) {
    fill(255, 100, 150);
    rect(mouseX - 20, mouseY - 20, 40, 40);
  } else if (mouseX < width / 2 && mouseY >= height / 2) {
    fill(100, 150, 255);
    ellipse(mouseX, mouseY, 50, 25);
  } else {
    fill(200, 100, 255);
    triangle(
      mouseX, mouseY - 20,
      mouseX - 20, mouseY + 20,
      mouseX + 20, mouseY + 20
    );
  }
}

function clearCanvas() {
  background(10);
}

function windowResized() {
  resizeCanvas(1000, 400);
}

// === SEGUNDO CANVAS: PARTICULAS QUE SIGUEN AL MOUSE (reemplaza sketch2) ===
let sketchParticles = function (p) {
  let particles = [];

  p.setup = function () {
      let canvas = p.createCanvas(1000, 500);
      canvas.parent("arte-generativo-2");
  };

  p.draw = function () {
      p.background(20, 20, 30, 90);

      // Generar partículas cerca del mouse
      for (let i = 0; i < 5; i++) {
          particles.push({
              x: p.mouseX + p.random(-10, 10),
              y: p.mouseY + p.random(-10, 10),
              vx: p.random(-1, 1),
              vy: p.random(-1, 1),
              alpha: 255
          });
      }

      // Dibujar y actualizar
      for (let i = particles.length - 1; i >= 0; i--) {
          let particle = particles[i];
          p.noStroke();
          p.fill(0, 255, 180, particle.alpha);
          p.circle(particle.x, particle.y, 10);
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.alpha -= 2;
          if (particle.alpha <= 0) {
              particles.splice(i, 1);
          }
      }
  };
};
new p5(sketchParticles);

// === TERCER CANVAS: ESCENA 3D CON FIGURAS ===
let sketch3D = function(p) {
  let angle = 0;
  let bg = 30;
  let lightColor = 0;

  p.setup = function() {
    let canvas = p.createCanvas(1000, 500, p.WEBGL);
    canvas.parent("arte-generativo-3");
  };

  p.draw = function() {
    p.background(bg);
    p.orbitControl();

    lightColor = (lightColor + 0.5) % 255;
    p.ambientLight(lightColor, 80, 180);
    p.directionalLight(255, 255, 255, 0.5, 0.5, -1);

    // Cubo
    p.push();
    p.rotateY(angle);
    p.rotateX(angle * 0.3);
    p.normalMaterial();
    p.box(100);
    p.pop();

    // Esfera
    p.push();
    p.translate(-200, 0, 0);
    p.fill(0, 255, 180);
    p.sphere(60);
    p.pop();

    // Toroide
    p.push();
    p.translate(200, -100, 0);
    p.rotateZ(angle);
    p.fill(255, 150, 0);
    p.torus(50, 20);
    p.pop();

    // Cono
    p.push();
    p.translate(0, 150, 0);
    p.rotateX(angle);
    p.fill(100, 200, 255);
    p.cone(50, 100);
    p.pop();

    angle += 0.01;
  };

  p.mouseWheel = function(e) {
    bg += e.delta > 0 ? 10 : -10;
    bg = p.constrain(bg, 0, 255);
  };
};
new p5(sketch3D);

let angle2 = 0;
let tiltX = 0;
let tiltY = 0;
let camZ = 400; // más cerca para inicio visual potente

let sketchSistema = function(p) {
  p.setup = function() {
    let canvas = p.createCanvas(1000, 500, p.WEBGL);
    canvas.parent("arte-generativo-4");
  };


  p.draw = function() {
    p.background(10);

    // Cámara con zoom interactivo
    p.camera(0, 0, camZ, 0, 0, 0, 0, 1, 0);

    p.ambientLight(60);
    p.pointLight(255, 255, 255, 0, 0, 300);

    // Control de inclinación con mouse
    tiltX = p.map(p.mouseX, 0, p.width, -PI / 3, PI / 3); // mayor rango
    tiltY = p.map(p.mouseY, 0, p.height, -PI / 3, PI / 3);

    p.rotateX(tiltY);
    p.rotateY(tiltX);

    // Sol central más grande
    p.push();
    p.emissiveMaterial(255, 204, 0);
    p.sphere(60);
    p.pop();

    // Planeta 1 - órbita más grande y esfera más grande
    p.push();
    let x = 250 * p.cos(angle2);
    let z = 250 * p.sin(angle2);
    p.translate(x, 0, z);
    p.specularMaterial(100, 150, 255);
    p.sphere(35);
    p.pop();

    // Planeta 2 - órbita más grande y esfera más grande
    p.push();
    let x2 = 380 * p.cos(angle2 * 0.5);
    let z2 = 380 * p.sin(angle2 * 0.5);
    p.translate(x2, 70, z2);
    p.fill(200, 100, 255);
    p.sphere(45);
    p.pop();

    // Planeta 3
    p.push();
    let x3 = 400 * p.cos(angle2 * 0.5);
    let z3 = 400 * p.sin(angle2 * 0.5);
    p.translate(x3, -40, z3);
    p.fill(0, 255, 150);
    p.sphere(50);
    p.pop();

    // Planeta 4
    p.push();
    let x4 = 500 * p.cos(angle2 * 0.3);
    let z4 = 500 * p.sin(angle2 * 0.3);
    p.translate(x4, 60, z4);
    p.fill(255, 100, 100);
    p.sphere(35);
    p.pop();

    // Planeta 5
    p.push();
    let x5 = 600 * p.cos(angle2 * 0.2);
    let z5 = 600 * p.sin(angle2 * 0.2);
    p.translate(x5, -60, z5);
    p.fill(255, 255, 150);
    p.sphere(45);
    p.pop();

    angle2 += 0.01;

    
  };

  // Scroll para acercar/alejar
  p.mouseWheel = function(event) {
    camZ += event.delta;
    camZ = p.constrain(camZ, 200, 1000);
  };

  // Clic para invertir dirección
  p.mousePressed = function() {
    angle2 = -angle2;
  };
};
new p5(sketchSistema);
