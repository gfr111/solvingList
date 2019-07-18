import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import solvingList from '@/components/solvingList'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'solvingList',
      component: solvingList
    }
  ]
})
