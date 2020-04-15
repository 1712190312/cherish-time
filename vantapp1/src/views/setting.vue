<template>
  <div id="app">
      <van-nav-bar
      title="个人"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="home">
        <div class="cardoftop">
          <van-card
            title="用户名"
            centered
          >
          <template #thumb>
                  <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
         </template>
          </van-card>
        </div>
    
     <van-cell title="账户中心" icon="setting" is-link />
    
    <van-cell title="我的赞" icon="good-job" is-link />
    <van-cell title="消息盒子" icon="comment-circle" is-link />
    <van-cell title="我的好友" icon="friends" is-link to="MyF" />
    </div>
  </div>
</template>

<script>

export default {
 methods: {
    onClickLeft() {
         this.$router.go(-1);
    },
  }
};  
</script>