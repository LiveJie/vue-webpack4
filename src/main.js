import Vue from "vue";
import App from "./App.vue";
import router from './router'
import "@src/assets/css/index.scss"
new Vue({
    el: "#app",
    router,
    components: {
        App,
    },
    template: "<App/>"
});
