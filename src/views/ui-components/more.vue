<template>
    <div class="more-wrapper">
        <div class="h1 font24 weight">更多组件，持续更新，敬请期待</div>
        <div class="h2 font20 weight">basic-ui git地址：<a href="https://github.com/LiveJie/basic-ui"  target="_blank">https://github.com/LiveJie/basic-ui</a></div>
        <div class="h2 font20 weight">个人博客：<a href="http://blog.humorjie.vip/"  target="_blank">http://blog.humorjie.vip</a></div>
        <div class="h2 font20 weight">vue + webpack4.x搭建的基础框架：<a href="https://github.com/LiveJie/vue-webpack4"  target="_blank">https://github.com/LiveJie/vue-webpack4</a></div>
    </div>
</template>

<script>

export default {
    name: 'More',
    components: {},
    data() {
        //这里存放数据
        return {}
    },
}
</script>
<style lang='scss' scoped>
.more-wrapper {
    .h1,.h2 {
        margin: 20px 0;
        color: #666;
    }
    a {
        color: #00a1d6;
        &:hover {
            color: #00a1d6;
        }
    }
    .p {
        font-size: 16px;
        color: #666;
        margin: 20px 0 ;
    }
    .table {
        width: 100%;
        border: 1px;
        tr {
            line-height: 40px;
        }
        th {
            color: #666;
            font-size: 14px;
            font-weight: 400;
        }
    }
    .demo {
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 20px;
        box-sizing: border-box;
        .input {
            margin-bottom: 10px;
        }
    }
}
</style>