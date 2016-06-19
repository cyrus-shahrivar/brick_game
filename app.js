window.onload = function () {
  // define canvas and canvas context
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  // define global variables
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

  // main draw function
  function draw() {
    // drawing code
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    if (y+dy < ballRadius || y+dy > canvas.height - ballRadius){
      randomR = Math.floor(Math.random()*255);
      randomG = Math.floor(Math.random()*255);
      randomB = Math.floor(Math.random()*255);
      dy = -dy;
      ctx.fillStyle = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
    }

    if (x+dx < ballRadius || x+dx > canvas.width - ballRadius){
      randomR = Math.floor(Math.random()*255);
      randomG = Math.floor(Math.random()*255);
      randomB = Math.floor(Math.random()*255);
      dx = -dx;
      ctx.fillStyle = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
    }

    if (rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
  }

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  // draw loop
  setInterval(draw,10);
};
