<template>
  <div id="greedy-snake">
    <canvas ref="canvas" id="canvas" width="1600" height="1600" />
    <div class="right">
      <UploadPhoto v-model="imageUrl" :body.sync="body" @changeStyle="submit" />
      <ControlPanel :turn.sync="play" :speed.sync="speed" />
    </div>
  </div>
</template>

<script>
import head from '@/src/images/big.png'
import UploadPhoto from '@/src/components/greedy-snake/UploadPhoto.vue'
import ControlPanel from '@/src/components/greedy-snake/ControlPanel.vue'
export default {
  name: 'greedy-snake',
  components: {
    UploadPhoto,
    ControlPanel,
  },
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.loadHead()
    document.removeEventListener('keydown', this.control)
    document.addEventListener('keydown', this.control)
  },
  data() {
    return {
      play: false,
      diameter: 80,
      speed: 200,
      imageUrl: head,
      body: ['#fff2dd', '#fff2dd', '#ffd0c9'],
    }
  },
  watch: {
    play(v) {
      if (v) {
        this.timer = setInterval(() => {
          this.animation()
        }, this.speed)
      } else {
        clearInterval(this.timer)
      }
    },
    speed() {
      if (!this.play) return
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.animation()
      }, this.speed)
    },
  },
  methods: {
    loadHead() {
      this.img = new Image()
      this.img.src = this.imageUrl
      this.img.onload = () => {
        this.draw()
        this.hasDraw = true
      }
    },
    draw() {
      const bodyColor = this.body,
        diameter = this.diameter,
        canvas = this.canvas,
        ctx = this.ctx,
        _this = this
      let isEatFood = false
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      function Rect(x, y, diameter, color) {
        this.x = x
        this.y = y
        this.diameter = diameter
        this.color = color
      }
      Rect.prototype.draw = function () {
        const radius = this.diameter / 2
        ctx.beginPath()
        if (typeof this.color === 'string') {
          ctx.fillStyle = this.color
        } else if (this.color.length === 1) {
          ctx.fillStyle = this.color[0]
        } else {
          var gradient = ctx.createRadialGradient(
            this.x + radius,
            this.y + radius,
            radius,
            this.x + radius,
            this.y + radius,
            0
          )
          gradient.addColorStop(1, this.color[0])
          gradient.addColorStop(0.8, this.color[1])
          gradient.addColorStop(0, this.color[2])
          ctx.fillStyle = gradient
        }
        ctx.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI, true)
        ctx.lineTo(this.x + radius, this.y + radius)
        ctx.fill()
      }
      Rect.prototype.drawHead = function () {
        let x = this.x,
          y = this.y,
          d
        switch (this.direction) {
          case 0:
            y += diameter
            d = -Math.PI / 2
            break
          case 1:
            break
          case 2:
            x += diameter
            d = Math.PI / 2
            break
          case 3:
            x += diameter
            y += diameter
            d = Math.PI
            break
        }
        ctx.translate(x, y)
        ctx.rotate(d)
        ctx.beginPath()
        ctx.drawImage(_this.img, 0, 0, diameter, diameter)
        ctx.rotate(-d)
        ctx.translate(-x, -y)
      }
      function Snake(length = 0) {
        this.length = length
        this.head = new Rect(canvas.width / 2, canvas.height / 2, diameter, '')
        this.body = []
        let x = this.head.x + diameter
        let y = this.head.y
        for (let i = 0; i < this.length; i++) {
          const rect = new Rect(x, y, diameter, bodyColor)
          this.body.push(rect)
          x += diameter
        }
      }
      Snake.prototype.drawSnake = function () {
        this.head.drawHead()
        for (let i = 0; i < this.body.length; i++) {
          this.body[i].draw()
        }
      }
      Snake.prototype.moveSnake = function () {
        const body = new Rect(
          this.head.x,
          this.head.y,
          this.head.diameter,
          bodyColor
        )
        this.body.unshift(body)
        isEatFood =
          _this.food &&
          this.head.x === _this.food.x &&
          this.head.y === _this.food.y
        if (isEatFood) {
          _this.food = randomFood(this)
          _this.food.draw()
          isEatFood = false
        } else {
          this.body.pop()
        }
        // 根据方向，控制蛇头的坐标
        switch (this.direction) {
          case 0:
            this.head.x -= this.head.diameter
            break
          case 1:
            this.head.y -= this.head.diameter
            break
          case 2:
            this.head.x += this.head.diameter
            break
          case 3:
            this.head.y += this.head.diameter
            break
        }
        if (_this.isHit(this)) {
          _this.play = false
          _this
            .$confirm('oh,no.人生苦短，何须自尽?', '警告', {
              closeOnPressEscape: false,
              closeOnHashChange: false,
              confirmButtonText: '重新来过',
              cancelButtonText: '我不！',
              type: 'warning',
            })
            .then(() => {
              _this.draw()
              _this.play = true
            })
            .catch(() => {
              _this.draw()
            })
          return false
        }
      }
      const snake = new Snake(3)
      snake.direction = 0
      snake.head.direction = 0
      snake.drawSnake()
      this.player = snake
      this.food = randomFood(snake)
      this.food.draw()
      function randomFood(snake) {
        let isInSnake = true,
          food
        while (isInSnake) {
          const x =
              Math.round(
                (Math.random() * (canvas.width - diameter)) / diameter
              ) * diameter,
            y =
              Math.round(
                (Math.random() * (canvas.width - diameter)) / diameter
              ) * diameter
          food = new Rect(x, y, diameter, '#ffcd71')
          if (
            (x === snake.head.x && y === snake.head.y) ||
            snake.body.find((e) => x === e.x && y === e.y)
          ) {
            isInSnake = true
            continue
          } else {
            isInSnake = false
          }
        }
        return food
      }
    },
    control(e) {
      e = e || window.event
      const snake = this.player
      if (e.keyCode === 32) {
        this.play = !this.play
      }
      if (!this.hasDraw) return false
      this.hasDraw = false
      switch (e.keyCode) {
        case 37:
          snake.direction = snake.direction === 2 ? 2 : 0
          break
        case 38:
          snake.direction = snake.direction === 3 ? 3 : 1
          break
        case 39:
          snake.direction = snake.direction === 0 ? 0 : 2
          break
        case 40:
          snake.direction = snake.direction === 1 ? 1 : 3
          break
      }
      snake.head.direction = snake.direction
    },
    animation() {
      if (this.player.moveSnake() === false) {
        return false
      }
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.food.draw()
      this.player.drawSnake()
      this.hasDraw = true
    },
    isHit(snake) {
      const head = snake.head
      return (
        head.x < 0 ||
        head.x >= this.canvas.width ||
        head.y < 0 ||
        head.y >= this.canvas.height ||
        snake.body.find((e) => head.x === e.x && head.y === e.y)
      )
    },
    submit() {
      this.play = false
      this.loadHead()
    },
  },
}
</script>
<style scoped>
#greedy-snake {
  display: flex;
}
#canvas {
  border: 1px solid #aaa;
  margin-right: 20px;
  width: 800px;
  height: 800px;
}
.grey {
  font-size: 16px;
  color: #ddd;
}
.right {
  flex: 1;
}
</style>