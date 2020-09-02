<!-- 滑动验证码插件-sliding-captcha -->
<template>
    <div class="page-wrapper">
        <div class="h1 font24 weight">滑动验证码插件</div>
        <div class="h2 font20">基本用法</div>
        <pre><code><div v-html="code1"></div></code></pre>
        <div class="p">例子</div>
        <div class="demo">
            <remote-js cdn="http://oss.humorjie.vip/my-canvas.min.js"></remote-js>
            <div id="canvasCodeDom"></div>
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
                    <th>opt{}</th>
                    <th>MyCanvas第一个参数</th>
                    <th>{}</th>
                    <th>{}</th>
                </tr>
                <tr>
                    <th>w</th>
                    <th>验证码宽度</th>
                    <th>Number</th>
                    <th>350</th>
                </tr>
                <tr>
                    <th>h</th>
                    <th>验证码高度</th>
                    <th>Number</th>
                    <th>200</th>
                </tr>
                <tr>
                    <th>imgArr</th>
                    <th>验证码背景图片地址数组</th>
                    <th>Array</th>
                    <th>[]</th>
                </tr>
                <tr>
                    <th>callBack</th>
                    <th>MyCanvas第二个参数,返回操作的验证结果</th>
                    <th>Function</th>
                    <th>—</th>
                </tr>
            </tbody>
        </table>
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
    <remote-js cdn="http://oss.humorjie.vip/my-canvas.min.js"></remote-js>
    <div id="canvasCodeDom"></div>
</template>
&lt;script>
export default {
    data () {
        return {
        }
    },
    components: {
        'remote-js': {
            render(createElement) {
                return createElement('script', {
                    attrs: {
                        type: 'text/javascript',
                        src: this.cdn
                    }
                })
            },
            props: {
                cdn: {
                    type: String,
                    required: true
                }
            }
        }
    },
    methods: {
        checkStatus(status) {
            console.log(status) // 验证结果
        }
    },
    mounted() {
        this.$nextTick(()=> {
            setTimeout(()=> {
                new MyCanvas({}, this.checkStatus)
            }, 500)
        })
    }
}
&lt;/script>
    `,
        };
    },
    methods: {
        checkStatus(status) {
            console.log(status) // 验证结果
        }
    },
    components: {
        'remote-js': {
            render(createElement) {
                return createElement('script', {
                    attrs: {
                        type: 'text/javascript',
                        src: this.cdn
                    }
                })
            },
            props: {
                cdn: {
                    type: String,
                    required: true
                }
            }
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
        this.$nextTick(()=> {
            setTimeout(()=> {
                new MyCanvas({}, this.checkStatus)
            }, 500)
        })
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