<!-- 开发指南-快速上手模块 -->
<template>
    <div class="fast-get-wrapper">
        <div class="h1 font24 weight">快速上手</div>
        <div class="h2 font20">引入basic-vue-ui</div>
        <div class="p">一般在 webpack 入口页面 main.js 中添加如下配置：</div>
        <pre><code>import BasicUI from 'basic-vue-ui/lib/basic-vue-ui.umd.min'<br/>import "basic-vue-ui/lib/basic-vue-ui.css"<br/>Vue.use(BasicUI)</code></pre>
        <div class="h2 font20">按需引入</div>
        <div class="p">如果您想在 webpack 中按需使用组件，减少文件体积，可以这样写：</div>
        <pre><code>import BasicPage from 'basic-vue-ui/lib/components/page'<br/>Vue.use(BasicPage)</code></pre>
        <div class="p">css依然需要全局引入</div>
        <pre><code>import "basic-vue-ui/lib/basic-vue-ui.css"</code></pre>
    </div>
</template>

<script>

export default {
    name: 'FastGet',
    components: {},
    data() {
        //这里存放数据
        return {

        };
    },
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
}
</script>
<style lang='scss' scoped>
.fast-get-wrapper {
    .h1,.h2 {
        margin-top: 20px;
        color: #666;
    }
    .p {
        font-size: 16px;
        color: #666;
        margin: 20px 0 ;
    }
}
</style>