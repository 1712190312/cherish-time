<template>
  <div id="all">
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="输入邮箱或手机号"
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
       <van-field
        v-model="password"
        name="验证码"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      />
     <div style="margin: 15px;">
        <van-button round block type="info" native-type="submit1">发送验证码</van-button>
      </div>
      <div style="margin: 15px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
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