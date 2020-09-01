<template>
    <div class="index-wrapper">
      <div class="catalog-header"></div>
      <div class="catalog-box flex">
        <div class="catalog-wrapper">
          <div class="catalog-list" v-for="(item, index) of catalogData" :key="index">
            <div class="catalog-title font20">{{item.title}}</div>
            <div class="catalog-content">
              <div class="list" v-for="(childrenItem, index1) of item.children" :key="index1" @click="routerGo(childrenItem.link)">
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
              title: 'button',
              link: '/'
            },
            { 
              title: 'input输入框',
              link: '/'
            },
          ]
        },
      ]
    }
  },
  computed: {
    ...mapGetters(["text"])
  },
  methods: {
    // 路由跳转
    routerGo(link) {
      console.log(link)
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
  margin: 0 auto;
  .catalog-header {
    height: 60px;
  }
  .catalog-box {
    .catalog-wrapper {
      width: 200px;
      border: 1px solid red;
      .catalog-list {
        margin-bottom: 20px;
        .catalog-title {
          color: #000;
          margin-bottom: 16px;
        }
        .catalog-content {
          .list {
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
    .content-wrapper {
      flex: 1;
      border: 1px solid red;
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