window.onload = function () {
  // define canvas and canvas context
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  // define global variables
  var lives = 3;
  var score = 0;
  var brickRowCount = 3;
  var brickColumnCount = 5;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;
  var ballFillColor = '#0095DD';
  var leftPressed = false;
  var rightPressed = false;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width-paddleWidth)/2;
  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = Math.random()*2;
  var dy = -2;
  var ballRadius = 10;
  ctx.fillStyle = '#0095DD';
  var randomR = Math.floor(Math.random()*255);
  var randomG = Math.floor(Math.random()*255);
  var randomB = Math.floor(Math.random()*255);
  var bricks = [];

  // looping thru bricks array to create brick objects
  for(var c=0; c<brickColumnCount; c++){
    bricks[c]=[];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = {x: 0, y: 0, status: 1};
    }
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }

  function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
      for (var r = 0; r < brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
          var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX,brickY,brickWidth, brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function randomizeColors() {
    randomR = Math.floor(Math.random()*255);
    randomG = Math.floor(Math.random()*255);
    randomB = Math.floor(Math.random()*255);
  }

  function drawPaddle (){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2);
    ctx.fillStyle = ballFillColor;
    ctx.fill();
    ctx.closePath();
  }

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
  }

  function collisionDetection(){
    for(var c = 0; c<brickColumnCount; c++){
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        //calculations
        if(b.status == 1){
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount){
                alert("YOU WIN, CONGRATULATIONS");
                document.location.reload();
            }
          }
        }
      }
    }
  }

  // main draw function
  function draw() {
    // drawing code
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // wall, floor, and paddle collison detection
    if (y+dy < ballRadius){
      randomizeColors();
      ballFillColor = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
      dy = -dy;
    } else if(y+dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        randomizeColors();
        ballFillColor = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
        dy = -dy; // dy = -dy*1.1;
        // dx = dx*1.1; // make ball go faster
      } else {
        // lives update
        lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    // side walls collison detection
    if (x+dx < ballRadius || x+dx > canvas.width - ballRadius){
      randomizeColors();
      ballFillColor = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
      dx = -dx;
    }

    // paddle movement update based on keyboard presses
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    // ball speed update
    x += dx;
    y += dy;

    // better than setInterval for continuously drawing canvas
    requestAnimationFrame(draw);
  }

  // event handlers
  document.addEventListener("mousemove", mouseMoveHandler, false);
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  // draw loop call
  draw();
};
