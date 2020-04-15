<template>
   <div class="body">
      <van-nav-bar
        title="详情"
        left-arrow
        @click-left="backPlanQ"
      />
        
        <van-card title="用户名" centered>
            <template #thumb>
                <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </template>     
            <template #footer>
                <van-progress :percentage="25" stroke-width="20" />
            </template>
        </van-card>

        <van-steps direction="vertical" :active="0">
            <van-step>
                <h4>跑步</h4>
                <p>2020-03-12 07:00</p>
            </van-step>
            <van-step>
                <h4>背单词</h4>
                <p>2020-03-12 08:00</p>
            </van-step>
            <van-step>
                <h4>写作业</h4>
                <p>2020-03-12 09:00</p>
            </van-step>
            <van-step>
                <h4>睡觉</h4>
                <p>2020-03-12 22:00</p>
            </van-step>
        </van-steps>

    </div>
</template>

<script>

export default {
  
  data() {
    return {

    };
  },

  methods: {
   backPlanQ(){
       this.$router.push('planq')
   }
  }
}
</script>
