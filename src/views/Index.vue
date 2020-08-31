<template>
  <div class="index-wrapper">
    <!-- <header class="index-header flex">
      <div class="theme theme1"></div>
      <div class="theme theme2"></div>
      <div class="theme theme3"></div>
    </header>
    <div class="content">
      <div class="primary jcenter aitem flex">主题色</div>
      <div class="bth-box">
        <div class="list cursor theme1" @click="changeTheme('theme1')">改变主题色1</div>
        <div class="list cursor theme2" @click="changeTheme('theme2')">改变主题色2</div>
        <div class="list cursor theme3" @click="changeTheme('theme3')">改变主题色3</div>
      </div>
    </div> -->
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
    }
  },
  computed: {
    ...mapGetters(["text"])
  },
  methods: {
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
      this.addList()
      this.deleteList()
      this.getList()
      this.updateList()
  }
}
</script>

<style  lang="scss" scoped>
.index-wrapper {
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