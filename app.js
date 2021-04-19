window.onload=function() {
    playerx=playery=10; //position of snake head
    pixelsize=dimension=20; //pixelsize is size of pixels and dimension is dimensions of canvas
    foodx=foody=10; //position of food
    directionx=directiony=0;    
    snake=[]; //all (x,y) positions of snake. (first element is the tail and last element the head)
    tail=3;

    canv= document.getElementById("game");
    board=canv.getContext("2d"); //creation of a CanvasRenderingContext2D object
    document.addEventListener("keydown", keyPush); //when key is pressed, change variables accordingly
    state = setInterval(game,1000/10); //calls the game function every 1s/15ms using new or old keydown values to move the snake. (1000ms = 1s)
}
function playagain() {
    endgame();
    playerx=playery=10; //position of snake head
    pixelsize=dimension=20; //pixelsize is size of pixels and dimension is dimensions of canvas
    foodx=foody=10; //position of food
    directionx=directiony=0;    
    snake=[]; //all (x,y) positions of snake. (first element is the tail and last element the head)
    tail=3;
    state = setInterval(game,1000/10);
}

function endgame() {
    clearInterval(state);
}

function game() {
    playerx+=directionx; //new position of snake head
    playery+=directiony;

    //ends game if touch walls
    if(playerx<0){ 
        endgame();
    }
    if(playerx>dimension-1){
        endgame();
    }
    if(playery<0){
        endgame();
    }
    if(playery>dimension-1){
        endgame();
    }
    //resets canvas as all white
    board.fillStyle="black"; //sets color of rect
    board.fillRect(0,0,canv.width,canv.height); //x0,y0, width, height
    
    board.shadowColor = "blue";
    board.shadowBlur= 10;
    board.fillStyle="white"; //sets color of snake
    for(var i =0; i<snake.length; i++){ //loops to render the snake
        board.fillRect(snake[i].x*pixelsize,snake[i].y*pixelsize,pixelsize-2,pixelsize-2);
        if(snake[i].x==playerx && snake[i].y==playery && tail>4 && i != 0){ //snake head hit body. i != 0 handle case when head hits tail, which shouldn't happen.
            endgame();
        }
    }
    snake.push({x:playerx, y:playery}); //update snake head (end of array)
    while(snake.length>tail){ //updates entire snake according to length of snake
        snake.shift(); //gets rid of tail of snake (front of array)
    }
    if(foodx==playerx && foody==playery) { //eats food and generate new location of food
        tail++;
        validFood();
    }
    board.fillStyle="blue";
    board.fillRect(foodx*pixelsize, foody*pixelsize, pixelsize-2,pixelsize-2); //position of food
}

function validFood(){
    foodx=Math.floor(Math.random()*dimension); //(num from 0.0 to 1.0)*20
    foody=Math.floor(Math.random()*dimension);
    for(var i=0; i<snake.length; i++){
        if(snake[i].x==foodx && snake[i].y==foody){
            validFood();
        }
    }
}

function keyPush(evt){
    switch(evt.keyCode) {
        //left or a
        case 37:
            if (directionx == 1 && directiony == 0){break;}
            else {
                directionx=-1;directiony=0;
                break;
            }
        case 65:
            if (directionx == 1 && directiony == 0){break;}
            else {
                directionx=-1;directiony=0;
                break;
            }
        //down or s
        case 38:
            if (directionx == 0 && directiony == 1){break;}
            else{
                directionx=0;directiony=-1;
                break;
            }
        case 87:
            if (directionx == 0 && directiony == 1){break;}
            else{
                directionx=0;directiony=-1;
                break;
            }
        //right or d
        case 39:
            if (directionx == -1 && directiony == 0){break;}
            else {
                directionx=1;directiony=0;
                break;
            }
        case 68:
            if (directionx == -1 && directiony == 0){break;}
            else {
                directionx=1;directiony=0;
                break;
            }
        //up or w
        case 40:
            if (directionx == 0 && directiony == -1){break;}
            else{
                directionx=0;directiony=1;
                break;
            }
        case 83:
            if (directionx == 0 && directiony == -1){break;}
            else{
                directionx=0;directiony=1;
                break;
            }
    }
}
