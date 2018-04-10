function Bike(x, y) {
  this.pos = createVector(x, y); //Bike's position
  this.vel = createVector(0, -speed); //Bike's velocity
  this.graphics = createGraphics(width, height); //Graphics canvas for bike
  this.graphics.background(255, 0); //Graphics Background color. No alpha for transparency
  this.graphics.rectMode(CENTER);
  this.isAlive = true; //Is the bike alive?
  this.nextDir = createVector(0, -1); // next direction it will turn when it hits a new intersection
  this.locations = []; //locations that the bike has been
  this.col = color(255, 0, 0);
  this.explosion;

  /**
   * this.show is a function that draws the bike
   */
  this.show = function() {
    this.graphics.background(51, 0);
    this.graphics.noStroke();
    this.graphics.fill(this.col);
    this.graphics.rect(this.pos.x / 2, this.pos.y / 2, bikeSize, bikeSize);
    image(this.graphics, 0, 0);
  }

  /**
   * this.turn turns the bike and makes the location it has been at set to true
   * this function is done AFTER/WHILE it makes the turn
   */
  this.turn = function() {
    if (this.pos in vectorArray) {
      this.vel = this.nextDir;
      this.locations[this.pos] = true;
    }
  }

  /**
   * this.changeDir receives input from getKeyPressed() and converts it into a vector
   * this function is done BEFORE it makes the turn
   */
  this.changeDir = function(dir) {
    let dirVector = createVector(0, 0);
    switch (dir) {
      case LEFT_ARROW:
        dirVector = createVector(-speed, 0);
        break;

      case UP_ARROW:
        dirVector = createVector(0, -speed);
        break;

      case RIGHT_ARROW:
        dirVector = createVector(speed, 0);
        break;

      case DOWN_ARROW:
        dirVector = createVector(0, speed);
        break;

      default:
        dirVector = this.vel;
        break;
    }
    if (dirVector.x != (this.vel.x * -1) || dirVector.y != (this.vel.y * -1)) {
      this.nextDir = dirVector;
    }
  }

  /**
   * Checks for death
   */
  this.checkForDeath = function() {
    if (this.pos in this.locations || (this.pos.x === width || this.pos.x === 0) || (this.pos.y === height || this.pos.y === 0)) {
      this.nextDir = createVector(0, 0);
      this.isAlive = false;
      this.explode();
    }
  }

  this.explode = function() {
    this.explosion = new ExplosionAnimation(this);
  }

  /**
   * this.update updates the bike's position.
   */
  this.update = function() {
    if (this.isAlive) {
      this.pos.add(this.vel);
      if (this.vel != 0) {
        bike.checkForDeath();
      }
    } else {
      this.vel.mult(0);
    }
  }
}

function ExplosionAnimation(bike) {
  this.bike = bike;
  this.graphics = createGraphics(width, height);
  this.sz = 5;
  this.colorArray = this.bike.col.levels;
  this.colorArray[3] = 255;


  this.updateAnimation = function() {
    if (this.colorArray[3] > 0) {
      this.sz += 2;
      this.colorArray[3] -= 3;
    }
  }

  this.showAnimation = function() {
    drawMap();
    image(this.bike.graphics, 0, 0);
    this.graphics.noStroke();
    this.graphics.fill(this.colorArray[0], this.colorArray[1], this.colorArray[2], this.colorArray[3]);
    this.graphics.ellipse(this.bike.pos.x / 2, this.bike.pos.y / 2, this.sz);
    if (this.colorArray[3] > 0) {
      image(this.graphics, 0, 0);
      this.graphics.clear();
    }
  }

  this.isFinished = function() {
    if (this.alp < 0) {
      return true;
    } else {
      return false;
    }
  }
}