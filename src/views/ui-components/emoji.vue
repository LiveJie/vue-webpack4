<!-- UI组件-emoji -->
<template>
    <div class="emoji-wrapper">
        <div class="h1 font24 weight">快速上手</div>
        <basic-emoji></basic-emoji>
        <basic-page></basic-page>
    </div>
</template>

<script>

export default {
    name: 'Emoji',
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
.emoji-wrapper {
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