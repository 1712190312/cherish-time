import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //data
  state: {
    currentTime:0,
    plan_finsh:0,
    plannum:0,
    MR_plan:false,
  },
  //methods
  mutations: {
    //传递时间参数
    updataCurrentTime(state,num){
      state.currentTime=num;
    },
    //获取当前的计划index
    plannum_index(state,num){
      state.plannum=num;
    },
    //判断计时计划完成与否
    changePlan_finsh(state,num){
      state.plan_finsh=num;
    },
    //判断计时返回计划是否是每日计划
    MR_planconfirm(state,num){
      state.MR_plan=num;
    }
  },
  //异步方法
  actions: {
  },
  //模块
  modules: {
  }
})
