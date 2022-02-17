START

setup canvas


create an evil circle object

puts the evil circle onto the canvas

function mapping arrow keys to movement of the circle

//copy the behavior of the balls in regards to canvas edges in order to prevent it from going off the edge


controls for the evil circle
//making these start out false so the evil circle doesn't move when the page loads

//listener for button presses


//defines the key function handlers up down left right, upleft, upright, etc


// function to generate random number


// function to generate random color


//Create a ball class
class Ball {
//constructor

//function to draw the ball

//check if the ball has reached the edges, reducing velocity to 0

    //checks if the ball has reached the right edge of the canvas and reducing its velocity to 0
    
    //same, but for the left edge
    
    //same, but for the top edge
    
    //same, but for the bottom edge
    
    //adds the size of the ball so that the ball stops when the edge reaches the end of the canvas, rather than the middle
    


//function to detect for collision

    //for each ball in the balls array

    //if the ball we're checking position against is the same ball otherwise, they'd always be "colliding" with themselves
    



//creates an empty object (array?) called balls

/*While loop creates a new instance of the ball and generates a random size and color.
It will keep doing this as long as there are fewer than 25 balls in play
*/

//ball position always drawn t least one ball width away from the edge of the canvas, to avoid drawing errors


//creating an instance of the evil circle

//sets the background to a black color

//re-fills the background after each frame, so the previous iteration of the ball will disappear
//this loops through the balls array, and runs the draw and update functions each time, updating each ball's position
//draws a ball
//calls the update function above
//calls the collision detect function we defined earlier
//trying to draw the evil circle in the loop
}

//runs the function again, recursively.  This being a part of the loop function means it will keep repeating itself.


//time to call the loop function we just defined

