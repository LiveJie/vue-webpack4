<!-- empty组件-empty -->
<template>
    <div class="empty-wrapper">
        <div class="h1 font24 weight">Empty空消息组件</div>
        <div class="h2 font20">基本用法</div>
        <pre><code><div v-html="code1"></div></code></pre>
        <div class="p">例子</div>
        <div class="demo">
            <basic-empty />
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
                    <th>—</th>
                    <th>—</th>
                    <th>—</th>
                    <th>—</th>
                </tr>
            </tbody>
        </table>
        <!-- <basic-page></basic-page> -->
    </div>
</template>

<script>

export default {
    name: 'Empty',
    components: {},
    data() {
        //这里存放数据
        return {
            code1: `<template>
    <basic-empty />
</template>
&lt;script>
export default {
    data () {
        return {
        }
    },
    methods: {
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
.empty-wrapper {
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