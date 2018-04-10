function Bike(pos, player) {
  this.player = player; //Player's Number
  this.pos = pos; //Bike's position
  this.vel = createVector(0, -speed); //Bike's velocity
  this.graphics = createGraphics(width, height); //Graphics canvas for bike
  this.graphics.background(255, 0); //Graphics Background color. No alpha for transparency
  this.graphics.rectMode(CENTER);
  this.isAlive = true; //Is the bike alive?
  this.nextDir = createVector(0, -speed); // next direction it will turn when it hits a new intersection
  this.locations = []; //locations that the bike has been
  this.col = color(random(255), random(255), random(255));
  this.explosion;

  /**
   * this.show is a function that draws the bike
   */
  this.show = function() {
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
      vectorArray[this.pos] = true;
    }
  }

  this.getKeyFromPlayer = function(key) {
    let dir;
    switch (this.player) {
      case 1:
        switch (key) {
          case UP_ARROW:
            dir = "UP";
            break;

          case DOWN_ARROW:
            dir = "DOWN";
            break;

          case LEFT_ARROW:
            dir = "LEFT";
            break;

          case RIGHT_ARROW:
            dir = "RIGHT";
            break;
        }
        break;

      case 2:
        switch (key) {
          case 87:
            dir = "UP";
            break;

          case 83:
            dir = "DOWN";
            break;

          case 65:
            dir = "LEFT";
            break;

          case 68:
            dir = "RIGHT";
            break;
        }
        break;
    }
    this.changeDir(dir);
  }

  /**
   * this.changeDir receives input from getKeyPressed() and converts it into a vector
   * this function is done BEFORE it makes the turn
   */
  this.changeDir = function(dir) {
    let dirVector = createVector(0, 0);
    switch (dir) {
      case "LEFT":
        dirVector = createVector(-speed, 0);
        break;

      case "UP":
        dirVector = createVector(0, -speed);
        break;

      case "RIGHT":
        dirVector = createVector(speed, 0);
        break;

      case "DOWN":
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
    if (vectorArray[this.pos] || (this.pos.x === width || this.pos.x === 0) || (this.pos.y === height || this.pos.y === 0)) {
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



//This is the Explosion animation class
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
    for (bike of bikes) {
      image(bike.graphics, 0, 0);
    }
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