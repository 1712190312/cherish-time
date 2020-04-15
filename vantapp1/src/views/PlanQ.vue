<template>
  <div id="planQ">

    <van-nav-bar
       title="计划圈"
       left-arrow
       fixed
       @click-left="onClickLeft"
    />

    <div style="height:30px;"></div>

 <!--   <div class="card">
    <van-card
      title="用户名"
      centered
      >
      <template #thumb>
        <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </template>
    </van-card>
    </div> 
    <div style="height:10px;"></div> -->

    <van-grid :border="false" :column-num="1">
      <van-grid-item>
        <van-image height="10rem" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        <div class="pic">
        <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
        </div>
        <h1 class="name">用户名</h1>
      </van-grid-item>
    </van-grid>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
       <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          >
          <van-card v-for="(item,index) in list" :key="index"
             desc="发布时间"
             title="用户名"
             centered
            >
            
             <template #thumb>
                <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
             </template>
          
          <!--点击时vant-rate颜色怎么不变？-->
          
            <template #footer>
                <van-progress :percentage="25" stroke-width="20" />
                <van-rate
                    v-model="value"
                    count="1"
                    icon="like"
                    void-color="#c8c9cc"
                    color="#ffd21e"  
                    void-icon="good-job-o"
                    size="2rem"
                    @change="onChange"
                /> 

                <!--  <van-icon name="good-job-o" size="2rem" @click="dianzan"/> -->
                <van-icon name="ellipsis" size="2rem" @click="godetail"/>
            </template>
            </van-card>
        
       </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },

    dianzan(){
       Toast({
      message: '点赞成功',
      icon: 'like-o'
      });
    },

    godetail(){
       this.$router.push('details')
    },

    onChange() {

      Toast({
      message: '点赞成功',
      icon: 'like-o'
      });
    },
    onClickLeft(){
      this.$router.push('max')
    } 
  }
}
</script>

<style>
.name{
  position: absolute;
  top:30px;
  left:105px;
  font-size: 20px;
}
.pic{
  position: absolute;
  top:25px;
  left:20px;
}
</style>

