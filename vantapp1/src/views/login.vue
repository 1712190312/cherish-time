<template>
  <div id="all">
    <div id="nav">
    </div>
    <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 30px;">
        <van-button round block type="info" native-type="submit" @click="GoMax">登陆</van-button>
      </div>
    </van-form>
    <div id="tab">
      <router-link to="/forget">忘记密码</router-link>|
      <router-link to="/registered">注册</router-link>
    </div>
  </div>
</template>

<style>
#all{
   text-align: center;
}
</style>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    GoMax(){
      this.$router.push({path:'/test'})
    }
  }
};
</script>
