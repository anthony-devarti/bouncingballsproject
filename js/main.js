// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//create an evil circle object
class EvilCircle {

  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }
  //puts the evil circle onto the canvas
  drawEvilCircle() {
    //ctx.beginPath();
    ctx.arc(evilCircleX, canvas.height-evilCircleHeight, evilCircleWidth, evilCircleHeight, 2 * Math.PI);
    ctx.fillstyle = "blue";
    ctx.fill();
    ctx.closePath();
    //mapping arrow keys to movement of the circle
    if(rightPressed) {
      evilCircleX += 5;
    }
    else if(leftPressed) {
      evilCircleX -= 5;
    }
    else if (upPressed) {
      evilCircleY += 5;
    }
    else if (downPressed) {
      evilCircleY -= 5;
    }
    else if (leftPressed && upPressed) {
      evilCircleX -= 3;
      evilCircleY += 3;
    }
    else if (leftPressed && downPressed) {
      evilCircleX -= 3;
      evilCircleY -= 3;
    }
    else if (rightPressed && upPressed) {
      evilCircleX += 3;
      evilCircleY += 3;
    }
    else if (rightPressed && downPressed) {
      evilCircleX += 3;
      evilCircleY -= 3;
    }
  }
  //copy the behavior of the balls in regards to canvas edges in order to prevent it from going off the edge
  
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

  
}  
  evilCircleHeight = 200;
  evilCircleWidth = 200;
  evilCircleX = (canvas.width-evilCircleWidth) / 2;

  //controls for the evil circle
  //making these start out false so the evil circle doesn't move when the page loads
  let rightPressed = false;
  let leftPressed = false;
  //listens for button presses
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

//defines the key function handlers
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "arrowLeft") {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
  else if(e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  }
  else if(e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }  
}
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left"  || e.key == "ArrowLeft") {
    leftPressed = false;
  }
  else if(e.key == "Up" || e.key == "ArrowUp"){
    upPressed = false;
  }
  else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}


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
    collisionDetect() {
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



//creates an empty object (array?) called balls
const balls = [];
/*While loop creates a new instance of the ball and generates a random size and color.
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

//creating an instance of the evil circle
const evilCircle1 = new EvilCircle (
  50,
  50,
  randomRGB(),
  100
);
evilCircle1.update();

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
    ball.collisionDetect();
    //trying to draw the evil circle in the loop
  }
  
  //runs the function again, recursively.  This being a part of the loop function means it will keep repeating itself.
  requestAnimationFrame(loop);
}

//time to call the loop function we just defined
loop();