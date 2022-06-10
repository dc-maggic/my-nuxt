<template>
    <div id="maggic">
        <h1 v-if="$route.path !== '/universe-star'">MAGGIC's NUXT</h1>
        <nuxt />
    </div>
</template>
<style>
p {
    color: #333;
}
a, a:visited {
    color: orange;
    text-decoration: none;
}
</style>