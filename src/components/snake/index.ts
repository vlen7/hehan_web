class Food {
    element: HTMLElement

    constructor() {
        this.element = document.getElementById('food')!
    }

    get X(){
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    change(left:number, top:number) {
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

class ScorePanel {
    score = 0
    level = 1

    scoreEle: HTMLElement
    levelEle: HTMLElement

    maxLevel: number
    upScore: number

    constructor(maxLevel: number = 100, upScore: number = 2) {
        this.maxLevel = maxLevel
        this.upScore = upScore
        this.scoreEle = document.getElementById("score")!
        this.levelEle = document.getElementById("level")!
    }

    addScore() {
        this.scoreEle.innerHTML = ++this.score + ''
        if (this.score % this.upScore == 0) {
            this.levelUp()
        }
    }

    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

class Snake {
    head: HTMLElement
    bodies: HTMLCollection
    element: HTMLElement

    alive = true

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.bodies = this.element.getElementsByTagName('div');
    }

    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    set X(value: number) {
        if (value == this.head.offsetLeft) {
            return
        }

        if (value < 0 || value > 290) {
            this.alive = false
            return
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        this.moveBody()
        this.head.style.left = value + 'px'
    }

    set Y(value: number) {
        if (value == this.head.offsetTop) {
            return
        }

        if (value < 0 || value > 290) {
            this.alive = false
            return
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value) {
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }

        this.moveBody()
        this.head.style.top = value + 'px'
    }

    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    moveBody() {
        for (let i=this.bodies.length -1;i>0;i--) {
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    conflict(X: number, Y: number) :boolean {
        for (let i=1; i<this.bodies.length;i++) {
            if (X == (this.bodies[i] as HTMLElement).offsetLeft && Y == (this.bodies[i] as HTMLElement).offsetTop) {
                return true
            }
        }
        return false
    }
}

class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    direction: string = "ArrowRight"

    speed: number

    constructor(speed: number = 4) {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.speed = speed

        this.init()
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))

        this.run()
    }

    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key
    }

    checkEat(X: number, Y: number) :boolean {
        return (this.food.X == X && this.food.Y == Y)
    }

    run() {
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.direction) {
            case "ArrowUp":
                Y -= 10
                break
            case "ArrowDown":
                Y += 10
                break
            case "ArrowLeft":
                X -= 10
                break
            case "ArrowRight": 
                X += 10
                break
        }

        if (this.checkEat(X, Y)) {
            let top:number
            let left:number
            do {
                top = Math.round(Math.random() * 29) * 10
                left = Math.round(Math.random() * 29) * 10
            } while (this.snake.conflict(left, top))
            
            this.food.change(left, top)
            this.scorePanel.addScore()
            this.snake.addBody()
        }

        this.snake.X = X
        this.snake.Y = Y

        if (this.snake.alive && !this.snake.conflict(this.snake.head.offsetLeft, this.snake.head.offsetTop)) {
            setTimeout(this.run.bind(this), 1500/(this.speed + this.scorePanel.level))
        } else {
            alert("died!")
        }
    }
}

export default GameControl