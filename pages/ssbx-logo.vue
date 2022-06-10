<template>
    <div id="logo">
        <div class="cycle cycle_1"></div>
        <div class="cycle cycle_2"></div>
        <h1 class="text">声声不息</h1>
    </div>
</template>
<style>

:root {
  --black: #010101;
  --red: #F66034;
  --blue: #0A68DF;
}
</style>
<style scoped>
#logo {
    background: var(--black);
}
.cycle {
  height: 500px;
  width: 500px;
  border-radius: 50%;
  position: relative;
  box-sizing: border-box;
  display: inline-block;
}
.cycle_1 {
  z-index: 2;
  background: var(--red);
  background: repeating-linear-gradient(180deg,var(--red),var(--red) 12px, var(--black) 0,  var(--black) 22px);
  border: 12px solid var(--black);
}
.cycle_1::after, .cycle_2::after {
  content: '';
  display: inline-block;
  height: 200px;
  width: 200px;
  background: var(--black);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
  border-radius: 50%;
  z-index: 3;
}
.cycle_1 {
  z-index: 2;
  background: repeating-linear-gradient(180deg,var(--red),var(--red) 12px, var(--black) 0,  var(--black) 22px);
  border: 12px solid var(--black);
}
.cycle_2 {
  margin-left: -166px;
  background: linear-gradient(180deg,var(--red), var(--blue));
  border: 12px solid var(--black);
}
.cycle_2::before {
  position: absolute;
  box-sizing: border-box;
  top: -12px;
  left: -12px;
  content: '';
  display: inline-block;
  height: 500px;
  width: 500px;
  background:linear-gradient(180deg,var(--red), var(--blue));
  border-radius: 50%;
  -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  z-index: 3;
  border: 12px solid var(--black);
}
.text {
  background: linear-gradient(to right, var(--blue), var(--red));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-style: italic;
}
</style>