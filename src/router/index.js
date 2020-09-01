import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/index.vue"
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => { return err })
}

export default new Router({
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        children:[
          {
            path: '/dev-guide/install',
            name: 'install',
            component: function(resolve) {require(['@/views/dev-guide/install.vue'], resolve)} 
          },
          {
            path: '/dev-guide/fastget',
            name: 'fastget',
            component: function(resolve) {require(['@/views/dev-guide/fast-get.vue'], resolve)}
          },

        ]
      }
    ],
    mode: 'history'
})