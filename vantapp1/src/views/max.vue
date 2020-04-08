<template>
  <div>
    <div>
      <router-view />
      <van-tabbar route>
        <van-tabbar-item replace to="/max" icon="home-o">短期</van-tabbar-item>
        <van-tabbar-item replace to="/longitem" icon="label">长期</van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="nav_sty">
      <van-nav-bar title="短期">
        <!--左上弹出-->
        <template #left>
          <van-icon name="wap-home" @click="showLeft" />
          <van-popup v-model="showL" round position="left" :style="{height: '100%' ,width:'50%'}">
            <!--个人界面弹窗-->
            <div>
              <van-nav-bar>
                <template #left>
                  <van-icon name="arrow-left" size="22px" @click="hideshwoleft" />
                </template>
              </van-nav-bar>

              <!--吸顶距离-->
              <van-sticky :offset-top="70">
                <!--个人头像-->
                <van-image
                  round
                  width="4rem"
                  height="4rem"
                  top="1rem"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
              </van-sticky>

              <van-sticky :offset-top="200">
                <van-cell center title="个人里程碑">
                  <template #icon>
                    <van-icon name="friends" size="20px" />
                  </template>
                </van-cell>

                <van-cell center title="我的牧场">
                  <template #icon>
                    <van-icon name="point-gift" size="20px" />
                  </template>
                </van-cell>

                <van-cell center title="点赞排行榜" @click="GoGood">
                  <template #icon>
                    <van-icon name="good-job" size="20px" />
                  </template>
                </van-cell>

                <van-cell center title="设置" @click="GoSetting">
                  <template #icon>
                    <van-icon name="setting" size="20px" />
                  </template>
                </van-cell>
              </van-sticky>
            </div>
          </van-popup>
        </template>

        <!--右上弹出-->
        <template #right>
          <van-icon name="plus" @click="showRight" />
          <!--新建短期计划弹窗暂时舍弃-->
          <!-- <van-popup v-model="showR" round position="bottom" :style="{ height: '30%' }">
          </van-popup>-->
          <!--新建短期计划上拉菜单-->
          <van-action-sheet
            v-model="showR"
            :actions="actions"
            cancel-text="确认"
            @cancel="onCancel"
            :style="{ height: '30%' }"
            description="新建短期计划"
          >
            <van-dropdown-menu overlay="false">
              <van-dropdown-item v-model="value" :options="option" />
            </van-dropdown-menu>
            <van-cell-group>
              <van-field v-model="value1" placeholder="请输入计划" input-align="center" />
            </van-cell-group>
          </van-action-sheet>
        </template>
      </van-nav-bar>
    </div>
    <!--短期计划列表-->
    <div>
      <van-grid :gutter="10" :border="false" :column-num="4">
        <van-grid-item>
          <van-image
            round
            width="4rem"
            height="4rem"
            @click="set_time"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586095355294&di=817277abc1bc0beeb6bd754e81fb38ec&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F10%2F16%2F59035b41b31f8_610.jpg"
          />
          <h6>专注</h6>
        </van-grid-item>
        <van-grid-item>
          <van-image
            round
            width="4rem"
            height="4rem"
            @click="finish_plan"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3280938643,1750635942&fm=26&gp=0.jpg"
          />
          <h6>饮水</h6>
        </van-grid-item>
        <van-grid-item>
          <van-image
            round
            width="4rem"
            height="4rem"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586095935255&di=c67ca46680933938cb37d357160b0a56&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F19%2F52%2F29570b3549ece4d.jpg"
          />
          <h6>放下手机</h6>
        </van-grid-item>
        <van-grid-item>
          <van-image
            round
            width="4rem"
            height="4rem"
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3704243962,3488546178&fm=26&gp=0.jpg"
          />
          <h6>记录美好</h6>
        </van-grid-item>
        <van-grid-item>
          <van-image
            round
            width="4rem"
            height="4rem"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=153606762,3021730881&fm=15&gp=0.jpg"
          />
          <h6>吃药</h6>
        </van-grid-item>
        <van-grid-item>
          <van-image
            round
            width="4rem"
            height="4rem"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586096266671&di=8401f2f6d76cd9b60cffb927b687d2ab&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F19%2F48%2F39570b25ee4e848.jpg"
          />
          <h6>看书</h6>
        </van-grid-item>
        <van-grid-item>
          <van-image
            round
            width="4rem"
            height="4rem"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3854818272,2588434238&fm=26&gp=0.jpg"
          />
          <h6>吃水果</h6>
        </van-grid-item>
      </van-grid>
      <div id="all">
        <van-dialog v-model="show_text" title="计时模式" show-cancel-button :beforeClose="confirm_time">
          <van-picker :columns="columns" @change="onChange" />
          <van-datetime-picker
  v-model="currentTime"
  type="time"
  :min-hour="0"
  :min-minute="0"
  :max-minute="60"
  :max-hour="24"
  :show-toolbar=false
  cancel-button-text	='1 '
  confirm-button-text	=' '
  :item-height="20"
/>
          <van-button round type="info" plain>删除计划</van-button>
      </van-dialog>
      </div>
    </div>
    <button @click="Gotest">test</button>
  </div>
</template>

<style>
.bar_sty {
  background: #14c1bb;
}
</style>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Dialog,Toast  } from "vant";

// 全局注册
Vue.use(Dialog);

Vue.use(Icon);

export default {
  data() {
    return {
      show_text: false,
      showR: false,
      showL: false,
      value: 0,
      option: [
        { text: "学习", value: 0 },
        { text: "工作", value: 1 },
        { text: "运动", value: 2 },
        { text: "习惯", value: 3 },
        { text: "其他", value: 4 }
      ],
      value1: "",
      columns: ['正计时', '倒计时']
      
    };
  },

  methods: {
    showRight() {
      this.showR = true;
    },
    showLeft() {
      this.showL = true;
    },
    //个人信息页的跳转
    GoSetting() {
      this.$router.push({ path: "/setting" });
    },
    GoGood() {
      this.$router.push({ path: "/good" });
    },
    finish_plan() {
      Dialog.confirm({
        title: "标题",
        message: "弹窗内容"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    set_time() {
      this.show_text = true;
    },
    confirm_time(action,done){
      if(action=='confirm'){
        this.$router.push({ path: "/timedown" });
      }else{
        done()
      }
    },
    Gotest(){
      this.$router.push({ path: "/test" });
    }
  }
};
</script>