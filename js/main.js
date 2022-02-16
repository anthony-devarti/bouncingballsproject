// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {

    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    } 
    
    update() {
      //checks if the ball has reached the right edge of the canvas and reducing its velocity to 0
      if ((this.x + this.size) >=width) {
        this.velX = -(this.velX);
      }
      //same, but for the left edge
      if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
      }
      //same, but for the top edge
      if ((this.y + this.size) >- height) {
        this.velY = -(this.velY);
      }
      //same, but for the bottom edge
      if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
      }
      //adds the size of the ball so that the ball stops when the edge reaches the end of the canvas, rather than the middle
      this.x += this.velX;
      this.y += this.velY;
    }

    //woof
    collisioinDetect() {
      //for each ball in the balls array
      for (const ball of balls) {
        //if the ball we're checking position against is the same ball otherwise, they'd always be "colliding" with themselves
        if(!(this === ball)) {
          //then, if the x axis matches
          const dx = this.x - ball.x;
          //or the y axis matches
          const dy = this.y -ball.y;
          const distance = Math.sqrt(dx * dx + dy *dy);
          //then we run the if statement to change the ball color
          if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
          }
        }
      }
    }
};

const balls = [];
/*While loop creates a new insance of the ball and generates a random size and color.
It will keep doing this as long as there are fewer than 25 balls in play
*/
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball (
    //ball position always drawn t least one ball width away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width -size),
    random(0 + size,height -size),
    random(-7,7),
    random(-7,7),
    randomRGB(),
    size
  );
 balls.push(ball); 
}

function loop() {
  //sets the background to a black color
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  //re-fills the background after each frame, so the previous iteration of the ball will disappear
  ctx.fillRect(0, 0, width, height);
  //this loops through the balls array, and runs the draw and update functions each time, updating each ball's position
  for (const ball of balls) {
    //draws a ball
    ball.draw();
    //calls the update function above
    ball.update();
    //calls the collision detect function we defined earlier
    ball.collisioinDetect();
  }
  //runs the function again, recursively.  This being a part of the loop function means it will keep repeating itself.
  requestAnimationFrame(loop);
}

//time to call the loop function we just defined
loop();