window.onload = function () {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = Math.random()*2;
  var dy = -2;
  var ballRadius = 10;
  ctx.fillStyle = '#0095DD';
  var randomR = Math.floor(Math.random()*255);
  var randomG = Math.floor(Math.random()*255);
  var randomB = Math.floor(Math.random()*255);

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2);
    // ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    // drawing code
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();

    if (y+dy < ballRadius || y+dy > canvas.height - ballRadius){
      randomR = Math.floor(Math.random()*255);
      randomG = Math.floor(Math.random()*255);
      randomB = Math.floor(Math.random()*255);
      dy = -dy;
      ctx.fillStyle = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
      // ctx.fill();
    }

    if (x+dx < ballRadius || x+dx > canvas.width - ballRadius){
      randomR = Math.floor(Math.random()*255);
      randomG = Math.floor(Math.random()*255);
      randomB = Math.floor(Math.random()*255);
      dx = -dx;
      ctx.fillStyle = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
      // ctx.fill();
    }

    x += dx;
    y += dy;
  }

  setInterval(draw,10);
};
