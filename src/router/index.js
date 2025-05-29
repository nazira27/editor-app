import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PageEditor from '@/components/PageEditor.vue'
import PageView from '@/components/PageView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pages/new',
    name: 'page-new',
    component: PageEditor
  },
  {
    path: '/pages/edit/:id',
    name: 'page-edit',
    component: PageEditor,
    props: true
  },
  {
    path: '/view/:id',
    name: 'page-view',
    component: PageView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
