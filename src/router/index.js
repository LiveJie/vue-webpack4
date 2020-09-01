import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/index.vue"
Vue.use(Router)

export default new Router({
      routes: [{
          path: '/',
          name: 'home',
          component: Home,
          children: [{
              path: '/dev-guide/install',
              name: 'install',
              component: (resolve) => {
                return require(['@/views/dev-guide/install.vue'], resolve)
              }
            },
            {
              path: '/dev-guide/fastget',
              name: 'fastget',
              component: (resolve) => {
                return require(['@/views/dev-guide/fast-get.vue'], resolve)
              }
            },
            {
              path: '/ui/emoji',
              name: 'emoji',
              component: (resolve) => {
                return require(['@/views/ui-components/emoji.vue'], resolve)
              }
            },
            ]
          }
        ],
        mode: 'history'
      })