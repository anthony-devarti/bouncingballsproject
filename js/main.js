// setup canvas
//make a para variable that fills in the score keeper
const para = document.querySelector('p');
let count = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//defines the height and width of the canvas
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
};

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
//making a class supertype
class Shape {
//constructing the properties of the superclass
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }

}
//making a ball subclass for the shape superclass
class Ball extends Shape {
//passing in x y velx and vely from the superclass down to this subclass
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);

    this.color = color;
    this.size = size;
    this.exists = true;
  }
//function defining how to draw the ball
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
//controlling for when the balls hit the edges of the canvas
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

//defining the behavior for the balls when they hit each other, redefining ball.color using the random function
  collisionDetect() {
     for (const ball of balls) {
        if (!(this === ball) && ball.exists) {
           const dx = this.x - ball.x;
           const dy = this.y - ball.y;
           const distance = Math.sqrt(dx * dx + dy * dy);

           if (distance < this.size + ball.size) {
             ball.color = this.color = randomRGB();
           }
        }
     }
  }

}
//making an evil circle subclass for the shape superclass
class EvilCircle extends Shape {

  constructor(x, y) {
    super(x, y, 20, 20);
//the color should always stay the same, so no need to randomize here
    this.color = "white";
    this.size = 10;
//listens for key presses to pass instructions to the evil circle, and tells it what to do
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
        case 's':
          this.y += this.velY;
          break;
      }
    });
  }
//draws the evil circle onto the canvas and defines specific properties not already defined
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
//this makes it so that if the circle's position exceeds the canvas, move it back
  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
      this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
      this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
      this.y += this.size;
    }
  }
//defines the behavior for when the evil ball touches the other balls
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        //checks if the evil circle is in the same position as the other balls
        const distance = Math.sqrt(dx * dx + dy * dy);
        //deletes the other ball and adjusts the ball count
        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          para.textContent = 'Ball count: ' + count;
        }
      }
    }
  }

}

// define array to store balls and populate it

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  count++;
  para.textContent = 'Ball count: ' + count;
}
//creates a new insance of evilcircle.  This is a good place to add a second circle
const evilBall = new EvilCircle(random(0, width), random(0, height));
//defines the loop to refill the page with a black background so they don't leave tracers
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
//repeats the same instruction for each ball in play
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }
//executes the evil ball functions we defined earlier
  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  requestAnimationFrame(loop);
}
//execute the loop we defined previously
loop();
