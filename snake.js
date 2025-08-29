const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

// Game Variables
let snake = [{ x: 200, y: 200 }];
let direction = { x: 1, y: 0 };
let food = { x: 100, y: 100 };
let score = 0;
let gridSize = 20;

// Draw Snake
function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Draw Food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Move Snake
function moveSnake() {
  const head = {
    x: snake[0].x + direction.x * gridSize,
    y: snake[0].y + direction.y * gridSize,
  };
  snake.unshift(head);

  // Check if the snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("scoreBoard").textContent = `Score: ${score}`;
    generateFood();
  } else {
    snake.pop(); // Remove tail segment if no food is eaten
  }
}

// Generate Random Food
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

  // Ensure food does not spawn on the snake
  if (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
    generateFood();
  }
}

// Check Collisions
function checkCollision() {
  const head = snake[0];

  // Wall collision
  if (
    head.x <= -30 ||
    head.x > canvas.width ||
    head.y < -30 ||
    head.y > canvas.height
  ) {
    console.log(`x ${head.x}`);
    console.log(`canva x ${canvas.width}`);
    console.log(`y ${head.y}`);
    console.log(`canva y ${canvas.height}`);
    resetGame();
  }

  // Self-collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      resetGame();
    }
  }
}

// Reset Game
function resetGame() {
  alert(`Game Over! Final Score: ${score}`);
  snake = [{ x: 200, y: 200 }];
  direction = { x: 1, y: 0 }; // Reset direction
  score = 0;
  document.getElementById("scoreBoard").textContent = `Score: ${score}`;
  generateFood();
}

// Game Loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

// Change Direction
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Start Game
setInterval(gameLoop, 100);
