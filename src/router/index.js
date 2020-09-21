import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/index.vue"
Vue.use(Router)

export default new Router({
      routes: [{
          path: '/',
          name: 'home',
          component: Home,
          redirect: '/dev-guide/install',
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
            {
              path: '/ui/page',
              name: 'page',
              component: (resolve) => {
                return require(['@/views/ui-components/page.vue'], resolve)
              }
            },
            {
              path: '/ui/empty',
              name: 'empty',
              component: (resolve) => {
                return require(['@/views/ui-components/empty.vue'], resolve)
              }
            },
            {
              path: '/ui/update-image',
              name: 'update-image',
              component: (resolve) => {
                return require(['@/views/ui-components/update-image.vue'], resolve)
              }
            },
            {
              path: '/ui/image-loadding',
              name: 'image-loadding',
              component: (resolve) => {
                return require(['@/views/ui-components/image-loadding.vue'], resolve)
              }
            },
            {
              path: '/ui/sliding-captcha',
              name: 'sliding-captcha',
              component: (resolve) => {
                return require(['@/views/ui-components/sliding-captcha.vue'], resolve)
              }
            },
            {
              path: '/ui/more',
              name: 'more',
              component: (resolve) => {
                return require(['@/views/ui-components/more.vue'], resolve)
              }
            },
            ]
          }
        ],
        mode: 'history',
        base: process.env.ENV === 'development' ? '/': '/ui-doc/'
      })