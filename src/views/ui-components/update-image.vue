<!-- 本地上传图片组件-update-image -->
<template>
    <div class="update-image-wrapper">
        <div class="h1 font24 weight">图片上传组件</div>
        <div class="h2 font20">基本用法</div>
        <pre><code><div v-html="code1"></div></code></pre>
        <div class="p">例子</div>
        <div class="demo">
            <basic-update-image :toast="errorToast" fileTypes="jpeg, png, gif" :maxLength="1" :fileSize="5" :fileList="fileList" />
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
                    <th>fileTypes</th>
                    <th>文件类型,类型用逗号隔开</th>
                    <th>String</th>
                    <th>'jpeg, png, gif'</th>
                </tr>
                <tr>
                    <th>toast</th>
                    <th>需要用到的提示方法</th>
                    <th>Function</th>
                    <th>alert</th>
                </tr>
                <tr>
                    <th>fileSize</th>
                    <th>文件限制大小 单位MB</th>
                    <th>Number</th>
                    <th>5MB</th>
                </tr>
                <tr>
                    <th>maxLength</th>
                    <th>文件最大数量</th>
                    <th>Number</th>
                    <th>5</th>
                </tr>
                <tr>
                    <th>fileList</th>
                    <th>文件列表</th>
                    <th>Function</th>
                    <th>[]</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'UpdateImage',
    components: {},
    data() {
        //这里存放数据
        return {
            code1: `<template>
    <basic-update-image :toast="errorToast" fileTypes="jpeg, png, gif" :maxLength="1" :fileSize="5" :fileList="fileList" />
</template>
&lt;script>
export default {
    data () {
        return {
            fileList: [] // 接收上传图片文件数组
        }
    },
    methods: {
        errorToast(msg) {
            console.log(msg) // 错误提示 可以配合ui框架message来弹出错误内容
        }

    }
}
&lt;/script>
    `,
     fileList: [] 
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
.update-image-wrapper {
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