<!-- 开发指南-安装模块 -->
<template>
    <div class="install-wrapper">
        <div class="h1 font24 weight">安装</div>
        <div class="p">推荐使用 npm 来安装，享受生态圈和工具带来的便利，更好地和 webpack 配合使用，当然，我们也推荐使用 ES2015。</div>
        <!-- <div class="pre">$ npm install basic-vue-ui --save</div> -->
        <pre><code>$ npm install basic-vue-ui --save</code></pre>
    </div>
</template>

<script>

export default {
    name: 'Install',
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
.install-wrapper {
    .h1 {
        margin-top: 20px;
        color: #666;
    }
    .p {
        font-size: 16px;
        color: #666;
        margin: 20px 0 ;
    }
    .pre {
        background: #f1f1f1;
        height: 45px;
        border-radius: 2px;
        color: #999;
        padding: 0 10px;
        display: flex;
        align-items: center;
    }

}
</style>