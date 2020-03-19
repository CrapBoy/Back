import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Menu from '../views/Menu'
import Marketing from '../views/Marketing'
import Full from '../views/Full'
import Custom from '../views/Custom'
import Setting from '../views/Setting'
import Outline from '../views/Outline'
import OrderInfo from'../views/OrderInfo'
import ChangeGoods from '../views/ChangeGoods'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    component:Index,
    children:[{
      //首页
      path:"menu",
      name:"menu",
      component: Menu
    },{
      //品类管理
      path:"marketing",
      name:"marketing",
      component: Marketing
    },{
      //商品管理
      path:"full",
      name:"full",
      component: Full
    },{
      //用户管理
      path:"custom",
      name:"custom",
      component: Custom
    },{
      //商品管理
      path:"setting",
      name:"setting",
      component: Setting
    },{
      //商品管理
      path:"outline",
      name:"outline",
      component: Outline
    },{
      path:"orderInfo",
      name:"orderInfo",
      component:OrderInfo
    },{
      path:"changeGoods",
      name:"changeGoods",
      component:ChangeGoods
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
