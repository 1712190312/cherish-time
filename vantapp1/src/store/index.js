import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //data
  state: {
    currentTime:0,
  },
  //methods
  mutations: {
    updataCurrentTime(state,num){
      state.currentTime=num;
    }
  },
  //异步方法
  actions: {
  },
  //模块
  modules: {
  }
})
