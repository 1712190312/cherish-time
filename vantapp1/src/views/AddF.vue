<template>
    <div class="body">
        <van-nav-bar
            title="添加好友"
            left-arrow
            @click-left="backflist"
        />

        <van-search
            v-model="value"
            shape="round"
            placeholder="请输入好友ID"
            input-align="center"
        />

    </div>
</template>

<script>
export default {
    
    methods:{
      
        backflist(){
            this.$router.go(-1);
        }
    }
}
</script>