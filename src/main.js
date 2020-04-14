import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'
// import "@src/assets/css/index.scss";
import "@/assets/css/index.scss";
new Vue({
    el: "#app",
    router,
    store,
    components: {
        App,
    },
    template: "<App/>"
});
