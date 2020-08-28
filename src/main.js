import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'
import "@/assets/css/index.scss";
import Axios from '@/api'
if(localStorage.getItem("WINDOWS_THEME")) {
    window.document.documentElement.setAttribute('data-theme', localStorage.getItem("WINDOWS_THEME"))
}

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