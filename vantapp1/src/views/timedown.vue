<template>
    <div id="all">
        <van-nav-bar
      title="倒计时"
      left-arrow
      @click-left="onClickLeft"
    />
        <van-count-down
  ref="countDown"
  minutes
  :time="300000"
  :auto-start="false"
  format="HH:mm:ss:SSS"
  @finish="finish"
/>
<van-grid clickable>
  <van-grid-item text="开始" icon="play-circle-o" @click="start" />
  <van-grid-item text="暂停" icon="pause-circle-o" @click="pause" />
  <van-grid-item text="重置" icon="replay" @click="reset" />
</van-grid>
<h1>还在寻找好看的组件和动画效果</h1>
    </div>
</template>

<script>
import Vue from 'vue';
import { CountDown } from 'vant';

Vue.use(CountDown);
export default {
     methods: {
    start() {
      this.$refs.countDown.start();
    },
    pause() {
      this.$refs.countDown.pause();
    },
    reset() {
      this.$refs.countDown.reset();
    },
    finish() {
      Toast('倒计时结束');
    },
    onClickLeft() {
         this.$router.go(-1);
    },
  }
}
</script>