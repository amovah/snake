function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cnavas = document.getElementById('canvas'),
		cn = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

var cWidth = canvas.width,
		cHeight = canvas.height;

var snake = [[0, 0, 1]],
		target = [];

function drawSnake() {
	for(var item of snake) {
		cn.fillStyle = '#3A5FCD';
		cn.fillRect(item[0], item[1], 20, 20);
	}
}

function moveSnake() {
	snake = snake.map(function(item, index) {
		if(snake[index + 1]) {
			return snake[index + 1];
		}
		else {
			switch(item[2]) {
				case 0:
					return [item[0], item[1] - 20, item[2]];
				case 1:
					return [item[0] + 20, item[1], item[2]];
				case 2:
					return [item[0], item[1] + 20, item[2]];
				case 3:
					return [item[0] - 20, item[1], item[2]];
			}
		}
	});

	cn.clearRect(0, 0, cWidth, cHeight);
	drawSnake();
	createTarget();
	var len = snake.length -1;
	if(target[0] == snake[len][0] && target[1] == snake[len][1]) {
		snake.push([target[0], target[1], snake[snake.length - 1][2]]);
		target = [];
		createTarget();
	}
}
function createTarget() {
	if(!target[0]) {
		target = [random(1, canvas.width / 20) * 20 - 20, random(1, canvas.height / 20) * 20 - 20];
		cn.fillStyle = 'red';
		cn.fillRect(target[0], target[1], 20, 20);
	}
	else {
		cn.fillStyle = 'red';
		cn.fillRect(target[0], target[1], 20, 20);
	}
}
setInterval(moveSnake, 100);

document.addEventListener('keypress', function(e) {
	if(e.keyCode == 37)
		snake[snake.length - 1][2] = 3;
	else if(e.keyCode == 38)
		snake[snake.length - 1][2] = 0;
	else if(e.keyCode == 39)
		snake[snake.length - 1][2] = 1;
	else if(e.keyCode == 40)
		snake[snake.length - 1][2] = 2;
});
