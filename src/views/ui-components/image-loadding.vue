<!-- 图片加载组件-image-loadding -->
<template>
    <div class="image-loadding-wrapper">
        <div class="h1 font24 weight">图片加载中</div>
        <div class="h2 font20">基本用法</div>
        <pre><code><div v-html="code1"></div></code></pre>
        <div class="p">例子</div>
        <div class="demo">
            <basic-loadding-image style="width: 100%;height:127px;" src="http://oss.humorjie.vip/banner-nav.png" alt="demo图片" />
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
                    <th>src</th>
                    <th>需要加载的图片链接或本地图片</th>
                    <th>Object, String</th>
                    <th>—</th>
                </tr>
                <tr>
                    <th>alt</th>
                    <th>图片描述</th>
                    <th>String</th>
                    <th>—</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'ImageLoadding',
    components: {},
    data() {
        //这里存放数据
        return {
            code1: `<template>
    <basic-loadding-image  src="http://oss.humorjie.vip/banner-nav.png" alt="demo图片" />
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
     fileList: [] 
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
.image-loadding-wrapper {
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