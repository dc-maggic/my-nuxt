<template>
    <div id="test">
        <p>在 nuxt 使用 web worker</p>
        <el-input v-model="num" placeholder="请输入一个值求斐波那契数列">
             <i slot="suffix" class="el-input__icon el-icon-search" @click="clickEvent"></i>
        </el-input>
        <el-skeleton v-if="!fNum" animated :rows="1" style="margin-top: 20px;"/>
        <span v-else>{{ fNum }} </span>
    </div>
</template>
<script>
import Worker from "./test.worker.js";

export default {
  data() {
    return {
      num: null,
      fNum: undefined
    }
  },
  mounted() {
    this.$worker = new Worker();
  },
  methods: {
    clickEvent() {
    const self = this
    this.$worker.onmessage = function(event) {
      self.fNum = event.data
      console.log("Got: " + event.data + "\n");
    };

    this.$worker.onerror = function(error) {
      console.log(error);
    };

    this.$worker.postMessage(++this.num);
    }
  }
}
</script>