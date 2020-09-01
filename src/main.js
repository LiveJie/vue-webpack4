import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'
import "@/assets/css/index.scss";
import Axios from '@/api'
// 引入mockjs
require('./mock')
if(localStorage.getItem("WINDOWS_THEME")) {
    window.document.documentElement.setAttribute('data-theme', localStorage.getItem("WINDOWS_THEME"))
}
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
      router.replace(targetPath);
    }
  });
Vue.prototype.$Axios = Axios
new Vue({
    el: "#app",
    router,
    store,
    components: {
        App,
    },
    template: "<App/>"
});