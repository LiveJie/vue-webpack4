<template>
  <div class="index">
    <div class="botton-wrapper">
      <div class="list" v-for="(item, index) of 3" :key="index" @click="checkStyle(item)"></div>
    </div>
    <div class="show"></div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    checkStyle(index) {
      window.document.documentElement.setAttribute('data-theme', `theme${index}`)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.index {
  
  .botton-wrapper {
    width: 100%;
    height: 200px;
      display: flex;
    .list {
      width: 200px;
      height: 200px;
      margin: 20px;
      &:nth-of-type(1) {
        background: blue;
      }
      &:nth-of-type(2) {
        background: red;
      }
      &:nth-of-type(3) {
        background: yellow;
      }
    }
  }
  .show {
    width: 100%;
    height: 200px;
    @include bg_color("red");
  }
}
</style>
