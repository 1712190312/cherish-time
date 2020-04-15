<template>
  <div class="body_sty">
    <!--录播图-->
    <van-swipe class="lb_mask" :autoplay="1500" :show-indicators="false">
      <van-swipe-item class="lb_1"></van-swipe-item>
      <van-swipe-item class="lb_2"></van-swipe-item>
      <van-swipe-item class="lb_3"></van-swipe-item>
      <van-swipe-item class="lb_4"></van-swipe-item>
    </van-swipe>
    
    <van-row type="flex" justify="space-between" class="lay">
      <van-col span="8"></van-col>
      <van-button round type="info" color="#808080" class="Btn1" size="large" to="login">skip</van-button>
      <van-col span="8"></van-col>
    </van-row>
  </div>
</template>

<style>
.body_sty {
  height: 100%;
}
.Btn1{
  position: absolute;
  bottom: 5;
}
.lb_mask {
  position: absolute;
  left: 0;
  top: 2;
  width: 100%;
  height: 100%;
}
.lb_1 {
  width: 100%;
  height: 100%;
  background-image: url("../assets/1.png");
  background-position: 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.lb_2 {
  width: 100%;
  height: 100%;
  background-image: url("../assets/2.png");
  background-position: 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.lb_3 {
  width: 100%;
  height: 100%;
  background-image: url("../assets/3.png");
  background-position: 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.lb_4 {
  width: 100%;
  height: 100%;
  background-image: url("../assets/4.png");
  background-position: 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
</style>

<script>
import Vue from "vue";
import { Col, Row } from "vant";
import { Toast } from 'vant';


Vue.use(Col);
Vue.use(Row);
export default {
   methods: {
    skip(){
      Toast("skip");
    }
  }
};
</script>
