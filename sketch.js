let bikes = [];
let tileSize = 16;
let bikeSize = tileSize / 8;
let speed = 1;
let vectorArray = [];
let players = 1;

//Creates the javascript elements and sets globals. Runs once
function setup() {
  createCanvas(48 * 16, 48 * 16);
  background(51);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
  for (i = 0; i < players; i++) {
    bikes[i] = new Bike(width / 2, round(height / 1.33, 0));
  }
  drawMap();
}

//looping function
function draw() {
  for (bike of bikes) {
    bike.update();
    bike.show();
    bike.turn();
    if (bike.explosion) {
      bike.explosion.updateAnimation();
      bike.explosion.showAnimation();
      if (bike.explosion.isFinished()) {

      }
    }
  }
}

//Draws map.
function drawMap() {
  push();
  stroke(200, 50);
  strokeWeight(1);
  noFill();
  rectMode(CORNER);
  background(51);
  for (i = 0; i < width; i += tileSize) {
    for (j = 0; j < height; j += tileSize) {
      rect(i, j, tileSize, tileSize);
      vectorArray[createVector(i, j)] = true;
    }
  }
  pop();
}

//runs parallel, executes when a key is pressed
function keyPressed() {
  for (bike of bikes) {
    if (bike.isAlive) {
      bike.changeDir(keyCode);
    }
  }
}