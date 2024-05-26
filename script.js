document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const submarine = {
        x: 100,
        y: canvas.height / 2,
        width: 40,
        height: 20,
        speed: 2,
        dy: 0
    };

    const keys = {
        up: false,
        down: false
    };

    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowUp') keys.up = true;
        if (e.code === 'ArrowDown') keys.down = true;
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowUp') keys.up = false;
        if (e.code === 'ArrowDown') keys.down = false;
    });

    function drawSubmarine() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(submarine.x, submarine.y, submarine.width, submarine.height);
    }

    function update() {
        if (keys.up) submarine.dy = -submarine.speed;
        else if (keys.down) submarine.dy = submarine.speed;
        else submarine.dy = 0;

        submarine.y += submarine.dy;

        if (submarine.y < 0) submarine.y = 0;
        if (submarine.y + submarine.height > canvas.height) submarine.y = canvas.height - submarine.height;
    }

    const obstacles = [];
    const obstacleWidth = 50;
    const obstacleGap = 200;
    let frame = 0;

    function createObstacle() {
        const height = Math.random() * (canvas.height - obstacleGap);
        obstacles.push({
            x: canvas.width,
            y: 0,
            width: obstacleWidth,
            height: height
        });
        obstacles.push({
            x: canvas.width,
            y: height + obstacleGap,
            width: obstacleWidth,
            height: canvas.height - height - obstacleGap
        });
    }

    function drawObstacles() {
        ctx.fillStyle = 'green';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    function updateObstacles() {
        obstacles.forEach(obstacle => {
            obstacle.x -= submarine.speed;
        });

        if (frame % 150 === 0) {
            createObstacle();
        }

        if (obstacles.length && obstacles[0].x + obstacleWidth < 0) {
            obstacles.shift();
            obstacles.shift();
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSubmarine();
        drawObstacles();
        update();
        updateObstacles();
        frame++;
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
