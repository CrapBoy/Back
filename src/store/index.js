import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',//在开发的时候才会打开，
  modules:{
    User,
  }
})
