<template>
    <div>
        <div class="game">
            <div class="line" v-for="(line,l) in ary" :key="l">
                <div class="number" :number="item" v-for="(item,i) in line" :key="i">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '2048',
    data() {
        return {
            ary: [
                [2,'','',''],
                ['','','',''],
                ['','','',''],
                ['','','','']
            ]
        }
    }
}
</script>

<style scoped>
.game {
    background-color: #bbada0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 4px;
    width: 250px;
    height: 250px;
}
.line {
    display: flex;
    justify-content: space-evenly;
}
.number {
    width: 50px;
    height: 50px;
    background-color: #ccc0b3;
    color: #fff;
    border-radius: 4px;
    font-size: 34px;
    text-align: center;
    line-height: 50px;
}
.number[number="2"]{

    color: #7f776f;
    background-color: #e8dfd7;
}
.number[number="4"] {
    color: #7c746c;
    background-color: #e7dcc7;

}
.number[number="8"] {
    background-color: #ecb382;

}
.number[number="16"] {
    background-color: #e69362;
}
.number[number="32"] {
    background-color: #ef856b;
}
.number[number="64"] {
    background-color: #e56648;
}
</style>