import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '../layouts/admin/Main'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
