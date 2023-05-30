function Food() {
    this.x;
    this.y;
    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() *
            columns - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() *
            rows - 1) + 1) * scale;
    }
    this.draw = function() {
        ctx.fillStyle = "#FF1E00";
        ctx.fillRect(this.x, this.y, scale, scale)
    }
}

function Snake() {
    this.x = (Math.floor(Math.random() *
        columns - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() *
        rows - 1) + 1) * scale;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.draw = function() {
        ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i<this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x,
            this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    }
    this.update = function() {
        for (let i = 0; i<this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] =
            { x: this.x, y: this.y };
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x > canvas.width) {
            this.x = 0;
        }
        if (this.y > canvas.height) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width;
        }
        if (this.y < 0) {
            this.y = canvas.height;
        }
    }
    this.changeDirection = function(direction) {
        switch (direction) {
            case 'w':
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
                break;
            case 's':
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
                break;
            case 'a':
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
                break;
            case 'd':
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
                break;
        }
    }
    this.eat = function(food) {
        if (this.x === food.x &&
            this.y === food.y) {
            this.total++;
            return true;
        }
        return false;
    }
    this.checkCollision = function() {
        for (var i = 0; i<this.tail.length; i++) {
            if (this.x === this.tail[i].x &&
                this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;
(function setup() {
    snake = new Snake();
    food = new Food();
    food.pickLocation();
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        food.draw();
        snake.update();
        snake.draw();
        if (snake.eat(food)) {
            food.pickLocation();
        }
        snake.checkCollision();
        document.querySelector('.score')
        .innerText = snake.total;
    }, 250);
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));