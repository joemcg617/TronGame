let bikes = [];
let tileSize = 8;
let bikeSize = tileSize / 4;
let speed = 4;
let vectorArray = [];
let possiblePositions = [];
let players = 2;

//Creates the javascript elements and sets globals. Runs once
function setup() {
  createCanvas(48 * 16, 48 * 16);
  background(51);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
  drawMap();
  for (i = 0; i < players; i++) {
    bikes[i] = new Bike(random(possiblePositions), i + 1);
  }
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
        bike.explosion.graphics.clear();
      }
    }
  }
}

//Draws map.
function drawMap() {
  push();
  stroke(200, 50);
  strokeWeight(.5);
  noFill();
  rectMode(CORNER);
  background(51);
  let count = 0;
  for (i = 0; i < width; i += tileSize) {
    for (j = 0; j < height; j += tileSize) {
      rect(i, j, tileSize, tileSize);
      possiblePositions[count] = createVector(i, j);
      count++;
      vectorArray[createVector(i, j)] = false;
    }
  }
  pop();
}

//runs parallel, executes when a key is pressed
function keyPressed() {
  for (bike of bikes) {
    if (bike.isAlive) {
      bike.getKeyFromPlayer(keyCode);
    }
  }
}