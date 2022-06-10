<template>
    <canvas ref="canvas" id="canvas" :width="w" :height="h" />
</template>

<script>
export default {
    name: 'universe-star',
    data() {
        return {
            w: 100,
            h: 100
        }
    },
    beforeMount() {
        this.w = (document.documentElement.clientWidth || document.body.clientWidth) * 0.8
        this.h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.8
    },
    mounted(){
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = '#fff'
        this.ctx = ctx
        window.onresize = function() {
            this.w = (document.documentElement.clientWidth || document.body.clientWidth) * 0.8
            this.h = (document.documentElement.clientHeight || document.body.clientHeight) * 0.8
        }
        this.draw()
    },
    methods: {
        draw(){
            const ctx = this.ctx,
                _this = this
            function Star(x, y, r) {
                this.x = x
                this.y = y
                this.r = r
                this.speedX = (Math.random() * 3) * Math.pow(-1, Math.round(Math.random()))
                this.speedY = (Math.random() * 3) * Math.pow(-1, Math.round(Math.random()))
            }
            Star.prototype.draw = function() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()
            }
            Star.prototype.move = function() {
                this.x -= this.speedX
                this.y -= this.speedY
                if (this.x < 0 || this.x > _this.w) this.speedX *= -1
                if (this.y < 0 || this.y > _this.h) this.speedY *= -1
            }
            const stars = []
            for(let i=0; i<100; i++) {
                stars.push(new Star(Math.random() * this.w, Math.random() * this.h, 3))
            }
            function drawLine(startX, startY, endX, endY) {
                ctx.beginPath()
                ctx.moveTo(startX, startY)
                ctx.lineTo(endX, endY)
                ctx.stroke()
                ctx.closePath()
            }
            const mouseStar = new Star(0, 0, 3)
            canvas.onmousemove = (e)=> {
                mouseStar.x = e.clientX
                mouseStar.y = e.clientY
            }
            window.onclick = e=>{
                for (let i = 0; i < 5; i++) {
                    stars.push(new Star(e.clientX, e.clientY, 3))
                }
            }
            function step() {
                ctx.clearRect(0, 0, _this.w, _this.h)
                stars.forEach(star=> {
                    star.move()
                    star.draw()
                })
                const len = stars.length
                stars.forEach((star,index) => {
                    for (let i=index+1; i<len; i++) {
                        if(Math.abs(star.x - stars[i].x)<50 && Math.abs(star.y-stars[i].y)<50) {
                            drawLine(star.x, star.y, stars[i].x, stars[i].y)
                        }
                    }
                    if(Math.abs(star.x - mouseStar.x)<50 && Math.abs(star.y-mouseStar.y)<50) {
                        drawLine(star.x, star.y, mouseStar.x, mouseStar.y)
                    }
                })
                window.requestAnimationFrame(step)
            }
            window.requestAnimationFrame(step)
        }
    }
}
</script>
<style scoped>
#canvas {
    background: url('@/src/images/bg.jpg') center/cover no-repeat;
}
</style>