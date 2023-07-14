// Game variables
var playerY;
var obstacleX;
var obstacleWidth;
var speed;
var score;
var gameover;
var obstacles;

// Button variables
var restartButton;

// Preload function (optional)
function preload() {
  // You can load any assets here (e.g., images, sounds)
}

// Setup function
function setup() {
  createCanvas(800, 400);
  playerY = height / 2;
  obstacleX = width;
  obstacleWidth = 30;
  speed = 5;
  score = 0;
  gameover = false;
  obstacles = [];

  // Create restart button
  restartButton = createButton("Restart");
  restartButton.position(width / 2 - 40, height / 2 + 20);
  restartButton.mousePressed(restartGame);
  restartButton.hide();

  // Add initial obstacles
  for (var i = 0; i < 5; i++) {
    obstacles.push(createObstacle());
  }
}

// Draw function
function draw() {
  background(220);

  // Update player position
  if (!gameover) {
    playerY += (mouseY - playerY) * 0.1;
  }

  // Draw player
  fill("blue");
  rect(50, playerY, 20, 20);

  // Move and draw obstacles
  for (var i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= speed;
    drawObstacle(obstacles[i]);

    // Check collision with player
    if (
      playerY < obstacles[i].y + obstacles[i].height &&
      playerY + 20 > obstacles[i].y &&
      50 < obstacles[i].x + obstacles[i].width &&
      50 + 20 > obstacles[i].x
    ) {
      gameover = true;
      restartButton.show();
      noLoop();
      break;
    }

    // Remove obstacles that have moved off the screen
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;

      // Increase speed every 5 points
      if (score % 5 === 0) {
        speed += 1;
      }
    }
  }

  // Add new obstacles
  if (!gameover && frameCount % 60 === 0) {
    obstacles.push(createObstacle());
  }

  // Display score
  fill("black");
  textSize(24);
  text("Score: " + score, 10, 30);

  // Display "Game Over" message
  if (gameover) {
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
  }
}

// Restart the game
function restartGame() {
  score = 0;
  speed = 5;
  gameover = false;
  obstacles = [];
  restartButton.hide();
  loop();
}

// Create a new obstacle
function createObstacle() {
  var obstacle = {
    x: width,
    y: random(height - 50),
    width: obstacleWidth,
    height: random(50, 200)
  };
  return obstacle;
}

// Draw an obstacle
function drawObstacle(obstacle) {
  fill("red");
  rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Initialize the game using p5.js functions
// These will automatically call preload(), setup(), and draw() for you
new p5();




