<template>
  <div class="upload">
    <div>
      <h4>蛇头设置</h4>
      <div class="head" @click="handler">
        <img ref="image" v-if="value" :src="value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <input type="file" ref="file" accept="image/*" multiple="false" @change="uploadHead" />
      <p>建议80*80的尺寸，格式PNG</p>
      <h4>蛇身设置</h4>
      <div class="body">
        <el-input v-model="colors" placeholder="请输入蛇皮色" clearable></el-input>
        <span>
          输入格式:#123456
          <br />纯色只需输入1个颜色
          <br />渐变色只需输入3个颜色，用逗号（英文）隔开
        </span>
      </div>
    </div>
    <div class="right">
      <el-button @click="tryStyle">试一下皮肤</el-button>
      <h4>试衣间</h4>
      <canvas ref="canvas" id="canvas" width="200" height="700" />
      <el-button @click="submitStyle">绘制</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload-photo',
  props: {
    value: {
      type: String,
      default: ''
    },
    body: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      colors: '',
    }
  },
  methods: {
    uploadHead(e) {
      const item = e.target.files[0],
        fileReader = new FileReader(),
        _this = this
      fileReader.readAsDataURL(item)
      fileReader.onload = function () {
        _this.$emit('input', this.result)
      }
    },
    handler() {
      this.$refs.file.click()
    },
    detect() {
      if (!this.value) {
        this.$message('请选择头像作为蛇头')
        return false
      }
      const reg = /^\#[0-9a-f]{6}$/,
        colorAry = this.colors.split(','),
        len = colorAry.length
      if (!this.colors) {
        this.$message('请输入蛇皮颜色')
        return false
      } else if (len === 1) {
        if (!reg.test(colorAry[0])) {
          this.$message('请输入正确格式的蛇皮颜色！')
          return false
        }
      } else if (len === 3) {
        for (var i = 0; i < 3; i++) {
          if (!reg.test(colorAry[i])) {
            this.$message('请输入正确格式的蛇皮颜色！')
            return false
          }
        }
      }
      return true
    },
    tryStyle() {
      const canvas = this.$refs.canvas,
        ctx = canvas.getContext('2d')
      if(!this.detect()){
        return
      }
      const colorAry = this.colors.split(','),
        len = colorAry.length
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      //头
      ctx.beginPath()
      ctx.drawImage(this.$refs.image, 20, 20, 160, 160)
      // 身体
      if (len === 1) {
        for (var i = 0; i < 3; i++) {
          ctx.beginPath()
          ctx.fillStyle = this.colors
          ctx.arc(100, 260 + 160 * i, 80, 0, 2 * Math.PI, true)
          ctx.lineTo(100, 260 + 160 * i)
          ctx.fill()
        }
      } else {
        for (var i = 0; i < 3; i++) {
          ctx.beginPath()
          var gradient = ctx.createRadialGradient(
            100,
            260 + 160 * i,
            80,
            100,
            260 + 160 * i,
            0
          )
          gradient.addColorStop(1, colorAry[0])
          gradient.addColorStop(0.8, colorAry[1])
          gradient.addColorStop(0, colorAry[2])
          ctx.fillStyle = gradient
          ctx.arc(100, 260 + 160 * i, 80, 0, 2 * Math.PI, true)
          ctx.lineTo(100, 260 + 160 * i)
          ctx.fill()
        }
      }
    },
    submitStyle() {
      if(!this.detect()){
        return
      }
      const colorAry = this.colors.split(',')
      this.$emit('update:body', colorAry)
      this.$emit('changeStyle')
    }
  },
}
</script>

<style scoped>
.upload {
  display: flex;
}
.upload .right {
  padding-left: 40px;
}
.upload input {
  display: none;
}
.head {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border: 1px solid #eee;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  width: 100%;
}
.avatar {
  display: block;
  width: 100%;
  height: 100%;
}
canvas {
  width: 100px;
  height: 350px;
  border: 1px solid #aaa;
}
</style>