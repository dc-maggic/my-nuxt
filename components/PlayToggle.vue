<template>
    <div id="play">
        <i @click="$emit('input',false)" v-if="value" class="el-icon-video-pause" />
        <i @click="$emit('input',true)" v-else class="el-icon-video-play" />
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        value: Boolean
    }
}
</script>
<style scoped>
#play {
    font-size: 30px;
    color: #f2247b;
}
#play i {
    cursor: pointer;
}
</style>