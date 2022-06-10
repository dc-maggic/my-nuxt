<template>
    <i class="star el-icon-star-on" :class="{light: value}"></i>
</template>
<script>
export default {
    props: ['value']
}
</script>