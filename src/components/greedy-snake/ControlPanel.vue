<template>
  <PlayToggle v-model="bindValue">
    <template>
      <div class="speed">
        <el-button size="mini" circle plain icon="el-icon-minus" @click="control(0)" />
        <el-progress type="dashboard" :percentage="percentage" color="#f2247b" :width="100"></el-progress>
        <el-button size="mini" circle plain icon="el-icon-plus" @click="control(1)" />
      </div>
      <p class="grey">
        空格键：开关
        <br />加号：加速
        <br />减号：减速
      </p>
    </template>
  </PlayToggle>
</template>

<script>
export default {
  name: 'control-panel',
  props: {
    turn: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    percentage({ speed }) {
      return (250 - speed) / 2
    },
    bindValue: {
      get() {
        return this.turn
      },
      set(v) {
        this.$emit('update:turn', v)
      },
    },
  },
  mounted() {
    this.addEvent()
  },
  methods: {
    addEvent() {
      const _this = this
      function event(e) {
        switch (e.keyCode) {
          case 107:
          case 187:
            _this.control(1)
            break
          case 109:
          case 189:
            _this.control(0)
            break
        }
      }
      document.addEventListener('keydown', event)
    },
    control(flag) {
      let speed = this.speed
      if (flag === 0) {
        if (speed === 240) {
          return
        } else {
          speed = speed + 10
        }
      } else {
        if (speed === 50) {
          return
        } else {
          speed = speed - 10
        }
      }
      this.$emit('update:speed', speed)
    },
  },
}
</script>

<style scoped>
.grey {
  font-size: 16px;
  color: #999;
}
</style>