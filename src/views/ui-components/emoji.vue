<!-- UI组件-emoji -->
<template>
    <div class="emoji-wrapper">
        <div class="h1 font24 weight">Emoji表情</div>
        <div class="h2 font20">基本用法</div>
        <pre><code><div v-html="code1"></div></code></pre>
        <!-- <basic-emoji></basic-emoji> -->
        <div class="p">一般在 webpack 入口页面 main.js 中添加如下配置：</div>
        <!-- <basic-page></basic-page> -->
    </div>
</template>

<script>

export default {
    name: 'Emoji',
    components: {},
    data() {
        //这里存放数据
        return {
            code1: `<template>
    <basic-emoji :callBakValue="callBakValue" :callBakFun="callBakFun"></basic-emoji>
</template>
&lt;script>
export default {
    data () {
    return {
        callBakValue: ""
    }
    },
    methods: {
        callBakFun() {
            console.log("点击完成的回调事件，写在这里！！！")
        }
    }
}
&lt;/script>
    `
        };
    },
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.code1 = this.code1.replace(/[<>]/g,function(a){
            switch(a){
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            }
        });
    },
}
</script>
<style lang='scss' scoped>
.emoji-wrapper {
    .h1,.h2 {
        margin: 20px 0;
        color: #666;
    }
    .p {
        font-size: 16px;
        color: #666;
        margin: 20px 0 ;
    }
}
</style>