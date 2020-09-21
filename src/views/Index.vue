<template>
    <div class="index-wrapper">
      <div class="catalog-header"></div>
      <div class="catalog-box flex">
        <div class="catalog-wrapper">
          <div class="catalog-list" v-for="(item, index) of catalogData" :key="index">
            <div class="catalog-title font20">{{item.title}}</div>
            <div class="catalog-content">
              <div :class="activePath === childrenItem.link ? 'list active': 'list'" v-for="(childrenItem, index1) of item.children" :key="index1" @click="routerGo(childrenItem.link)">
                {{childrenItem.title}}
              </div>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import { setTheme } from "@/utils"
import Qs from 'querystring'
export default {
  name: 'Home',
  data () {
    return {
      catalogData: [
        {
          title: '开发指南',
          children: [
            { 
              title: '安装',
              link: '/dev-guide/install'
            },
            { 
              title: '快速上手',
              link: '/dev-guide/fastget'
            },
          ]
        },
        {
          title: '组件',
          children: [
            { 
              title: 'emoji表情包',
              link: '/ui/emoji'
            },
            { 
              title: 'page分页',
              link: '/ui/page'
            },
            { 
              title: 'empty分页',
              link: '/ui/empty'
            },
            { 
              title: '图片上传',
              link: '/ui/update-image'
            },
            { 
              title: '图片加载中',
              link: '/ui/image-loadding'
            },
            { 
              title: '滑动验证码',
              link: '/ui/sliding-captcha'
            },
            { 
              title: '更多',
              link: '/ui/more'
            },
          ]
        },
      ],
      activePath: ''
    }
  },
  computed: {
    ...mapGetters([
      "text",
      "value1",
      "value2",
    ])
  },
  watch: {
    value1: function(newValue) {
      console.log(newValue)
    },
    value2: function(newValue) {
      console.log(newValue)
    }
  },
  methods: {
    // 路由跳转
    routerGo(link) {
      this.activePath = link
      this.$router.push({path: link})
    },
    changeTheme(type) {
      setTheme(type)
    },
    async addList() {
      let json = {
        id: 10
      }
      const res = await this.$Axios("test_add", json)
      if(res) {
        console.log(res, "11")
      }
    },
    async deleteList() {
      let json = {
        name: "vue",
        id: 10
      }
      const res = await this.$Axios("test_delete", json)
      if(res) {
        console.log(res)
      }
    },
    async getList() {
      let json = {
        name: "vue",
        id: 10
      }
      const res = await this.$Axios("test_getList", json)
      if(res) {
        console.log(res, "111")
      }
    },
    async updateList() {
      let json = {
        name: "vue",
        id: 10
      }
      const res = await this.$Axios("test_updateList", json)
      if(res) {
        console.log(res)
      }
    },
  },
  mounted() {
    this.activePath = this.$router.currentRoute.path
    setTimeout(()=> {
      this.$store.commit("main/changeValue1", 22)
      this.$store.commit("main/changeValue2", 33)
    }, 1000)
      console.log()
      // this.addList()
      // this.deleteList()
      // this.getList()
      // this.updateList()
      // console.log(process.env.NODE_ENV, "process.env")
  }
}
</script>
<style  lang="scss" scoped>
.index-wrapper {
  width: 1200px;
  height: 100vh;
  padding-bottom: 60px;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 6px;
  overflow: hidden;
  .catalog-header {
    height: 60px;
  }
  .catalog-box {
    height: calc(100% - 60px);
    .catalog-wrapper {
      width: 200px;
      background: #fff;
      margin-right: 2px;
      .catalog-list {
        margin-bottom: 20px;
        .catalog-title {
          color: #000;
          margin: 20px;
        }
        .catalog-content {
          .list {
            width: 100%;
            line-height: 30px;
            color: #666;
            cursor: pointer;
            padding: 10px 20px;
            box-sizing: border-box;
            &:hover {
              background: #f1f1f1;
              color: $primary-theme1;
            }
            &.active {
              color: $primary-theme1;
            }
          }
        }
      }
    }
    .content-wrapper {
      flex: 1;
      background: #fff;
      padding: 10px 20px 60px 20px;
      overflow-y: auto;
      &::-webkit-scrollbar {display:none}
    }
  }
  .theme {
    width: 100px;
    height: 100px;
  }
  .theme1 {
    background: $primary-theme1;
  }
  .theme2 {
    background: $primary-theme2;
  }
  .theme3 {
    background: $primary-theme3;
  }
  .content {
    margin: 50px;
    display: flex;
    .primary {
      width: 100px;
      height: 100px;
      @include bg_color;
      color: #fff;
    }
    .bth-box {
      margin-left: 20px;
      .list {
        width: 100px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ddd;
        border-radius: 2px;
        margin-bottom: 10px;
        text-align: center;
        color: #fff;
        &.theme1 {
          background: blue;
        }
        &.theme2 {
          background: red;
        }
        &.theme3 {
          background: yellow;
        }
      }
    }
  }
}
</style>