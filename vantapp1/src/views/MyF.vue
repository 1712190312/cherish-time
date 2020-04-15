<template>
  <div class="home">
    <van-nav-bar title="我的好友" left-arrow @click-left="onClickLeft"> 
       <template #right>
          <van-icon name="plus" size="18" @click="Add"/> 
       </template>
    </van-nav-bar>

    <van-search
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      input-align="center"
    />

    <van-list
        v-model="loading"
        :finished="finished" 
        @load="onLoad"
      >
      <van-cell v-for="(item,index) in list" :key="index" value="用户名" @click="gofplan"> 
          <template #icon>
            <div class="dist">
               <van-image round width="2rem" height="2rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
          </template>
      </van-cell> 

    </van-list>

  </div>
</template>

<script>
// @ is an alias to /src

export default {

  data() {
    return {
      list: [],
     loading: false,
     finished: false
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

    Add(){
      this.$router.push('addf')
    },

    gofplan(){
      this.$router.push('fplan')
    },

    onClickLeft(){
      this.$router.go(-1);
    }

  }

}
</script>

<style>
 
.dist{
   padding-right: 5px;
 }

</style>