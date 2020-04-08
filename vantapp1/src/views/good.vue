<template>
  <div id="app">
    
   <van-nav-bar
     title="点赞排行榜" 
     left-arrow
     fixed
     @click-left="onClickLeft"
   />
   
  <div id= "zlist">
     <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >   
        <van-cell v-for="(item,index) in list" :key="index" title="姓名" icon="https://b.yzcdn.cn/vant/icon-demo-1126.png" label="排名" value="点赞数" />
      </van-list>
   </div> 


  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [
        
      ],
      error: false,
      loading: false
    };
  },
  methods: {
   onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onClickLeft(){
         this.$router.go(-1);
    }
  }
}
</script>

<style>
#zlist{
  margin-top: 65px;
}
</style>

