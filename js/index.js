const display = document.getElementById('display');
const score = document.getElementById('score');

const context = display.getContext('2d');

const state = {
	snake: [{
		x: Math.floor(Math.random() * display.width),
		y: Math.floor(Math.random() * display.height)
	}],
	snakeDirectionX: 0,
	snakeDirectionY: 0,
	snakeColor: '#23ff23',
	fruitColor: '#ff2323',
	fruit: {
		x: Math.floor(Math.random() * display.width),
		y: Math.floor(Math.random() * display.height)
	},
	direction: '',
	changingDirection: false,
	score: 0,
	gameOver: false
};


loop();

document.addEventListener('keydown', changeDirection);

function loop() {

	state.changingDirection = false;

	if(state.gameOver) {
		restart();
	}

	setTimeout(function() {
		clearScreen();
		drawFruit();
		moveSnake();
		drawSnake();
		checkColisison();

		loop();
	}, 70);

}

function clearScreen() {
	context.clearRect(0, 0, display.width, display.height);
}

function drawFruit() {
	context.fillStyle = state.fruitColor;
	context.fillRect(state.fruit.x, state.fruit.y, 1, 1);
}

function changeDirection(event) {

	if(state.changingDirection) return;
	state.changingDirection = true;

	const key = event.key;
	const acceptedMoves = [
		'ArrowUp',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
	];

	if(acceptedMoves.indexOf(key) >= 0) state.direction = key;
}

function moveSnake() {
	const head = {
		x: state.snake[0].x + state.snakeDirectionX,
		y: state.snake[0].y + state.snakeDirectionY
	};

	const goingUp = state.snakeDirectionY === -1;
	const goingDown = state.snakeDirectionY === 1;
	const goingLeft = state.snakeDirectionX === -1;
	const goingRight = state.snakeDirectionX === 1;

	if(state.direction === 'ArrowUp' && !goingDown) {
		state.snakeDirectionX = 0;
		state.snakeDirectionY = -1;
	}
	if(state.direction === 'ArrowDown' && !goingUp) {
		state.snakeDirectionX = 0;
		state.snakeDirectionY = 1;
	}
	if(state.direction === 'ArrowLeft' && !goingRight) {
		state.snakeDirectionX = -1;
		state.snakeDirectionY = 0;
	}
	if(state.direction === 'ArrowRight' && !goingLeft) {
		state.snakeDirectionX = 1;
		state.snakeDirectionY = 0;
	}

	state.snake.unshift(head);

	if(checkColisionFruit()) {
		respawnFruit();
		updateScore();
	}
	else {
		state.snake.pop();
	}
}

function drawSnake() {
	state.snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
	context.fillStyle = state.snakeColor;
	context.fillRect(snakePart.x, snakePart.y, 1, 1);
}

function checkColisionFruit() {
	if(state.snake[0].x === state.fruit.x && state.snake[0].y === state.fruit.y) return true;

	return false;
}

function checkColisison() {
	const snakeHead = state.snake[0];

	for(let i = 1; i < state.snake.length; i++) {
		if(
			state.snake[i].x === snakeHead.x &&
			state.snake[i].y === snakeHead.y
		) state.gameOver = true;
	}
	if(
		state.snake[0]. x < 0 ||
		state.snake[0].x > display.width - 1 ||
		state.snake[0]. y < 0 ||
		state.snake[0].y > display.height - 1
	) state.gameOver = true;
}

function respawnFruit() {
	state.fruit.x = Math.floor(Math.random() * display.width);
	state.fruit.y = Math.floor(Math.random() * display.height);
}

function updateScore() {
	state.score += 10;

	score.innerHTML = state.score;
}

function restart() {
	state.snake = [{
		x: Math.floor(Math.random() * display.width),
		y: Math.floor(Math.random() * display.height)
	}];

	state.snakeDirectionX = 0;
	state.snakeDirectionY = 0;

	state.fruit = {
		x: Math.floor(Math.random() * display.width),
		y: Math.floor(Math.random() * display.height)
	};

	state.direction = '';

	state.score = 0;
	state.gameOver = false;

	score.innerHTML = state.score;
}