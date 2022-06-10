<template>
    <div class="sky">
        <PlayToggle v-model="play" />
        <div class="box">
            <div>
                <h3>Fast Night</h3>
                <div class="grid">
                    <StarFunctional v-for="(v,i) of list" :key="i" :value="v" />
                </div>
            </div>
            <div>
                <h3>Slow Night</h3>
                <div class="grid">
                    <StarCommon v-for="(v,i) of list" :key="i" :value="v" />
                </div>
            </div>
        </div>
        <h3>WHY</h3>
        <p>
            利用了 <b><a href="https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6" alt="函数式组件">Functional Components</a></b>，
            它没有状态（没有响应式数据），也没有实例。
            <br>
            当使用函数式组件时，该引用将会是 HTMLElement，因为他们是无状态的也是无实例的。
            <br>
            JS 引擎是单线程的运行机制，JS 线程会阻塞 UI 线程，所以当脚本执行时间过长，就会阻塞渲染，导致页面卡顿。在 patch 过程中，如果遇到一个节点是组件 vnode，会递归执行子组件的初始化过程；而函数式组件的 render 生成的是普通的 vnode，不会有递归子组件的过程，因此渲染开销会低很多。
        </p>
        <h3>与 React 的 Hook 对比</h3>
    </div>
</template>

<script>
export default({
    name: 'sky',
    data() {
        return {
            list: [],
            play: false
        }
    },
    watch: {
        play(v){
            if(v) this.generate()
        }
    },
    created(){
        this.generate()
    },
    methods: {
        generate () {
            const data = []
            for (let i = 0; i < 100; i++) {
                data.push(Math.random() < 0.5)
            }
            this.list = data
            this.play && requestAnimationFrame(this.generate)
        }
    }
})
</script>

<style>
.box > div{
    display: inline-block;
}
.grid {
    background: #000;
    width: 200px;
}
.grid .star {
    display: inline-block;
    font-size: 20px;
}
.grid .star.light{
    color: yellow;
}
</style>