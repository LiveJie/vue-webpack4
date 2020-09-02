<!-- 分页组件-page -->
<template>
    <div class="page-wrapper">
        <div class="h1 font24 weight">Page分页</div>
        <div class="h2 font20">基本用法</div>
        <pre><code><div v-html="code1"></div></code></pre>
        <div class="p">例子</div>
        <div class="demo">
            <basic-page @change="pageChange" :showPageSize="5"/>
        </div>
        <div class="h2 font20">Attributes</div>
        <table border="1px solid #ccc !important" class="table">
            <thead>
                <tr>
                    <th>参数</th>
                    <th>说明</th>
                    <th>类型</th>
                    <th>默认值</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>page</th>
                    <th>当前页数</th>
                    <th>Number</th>
                    <th>1</th>
                </tr>
                <tr>
                    <th>total</th>
                    <th>总页数</th>
                    <th>Number</th>
                    <th>10</th>
                </tr>
                <tr>
                    <th>pageChange</th>
                    <th>函数返回分页改变后的页数</th>
                    <th>Function</th>
                    <th>—</th>
                </tr>
                <tr>
                    <th>showPageSize</th>
                    <th>展示的页数，必须为奇数，呈两边对称</th>
                    <th>Number</th>
                    <th>5</th>
                </tr>
            </tbody>
        </table>
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
    <basic-page @change="pageChange" :showPageSize="5"/>
</template>
&lt;script>
export default {
    data () {
        return {
        }
    },
    methods: {
        pageChange(val) {
            console.log(val) // 改变后的页数
        }
    }
}
&lt;/script>
    `,
        };
    },
    methods: {
        pageChange(val) {
            console.log(val)
        }
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
.page-wrapper {
    .h1,.h2 {
        margin: 20px 0;
        color: #666;
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