<template>
  <div>
    <van-nav-bar
      title="找回密码"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-field
      v-model="username"
      name="注册邮箱"
      label="注册邮箱"
      placeholder="请填写注册邮箱"
      :rules="[{ required: true, message: '请填写注册邮箱' }]"
    />
    <div style="margin: 30px;">
        <van-button round block type="info" native-type="submit">找回密码</van-button>
      </div>
  </div>
</template>
<script>
import { Toast } from 'vant';

export default {
  methods: {
    onClickLeft() {
         this.$router.go(-1);
    },
  }
}
</script>