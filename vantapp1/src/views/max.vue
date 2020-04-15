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
                <van-cell center title="个人里程碑" @click="GoMylc">
                  <template #icon>
                    <van-icon name="friends" size="20px" />
                  </template>
                </van-cell>

                <van-cell center title="朋友圈" @click="GoPlanQ">
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
            @cancel="add_shortPlan"
            :style="{ height: '30%' }"
            description="新建短期计划"
          >
            <van-dropdown-menu overlay="false">
              <van-dropdown-item v-model="value" :options="option" @close="clsoed_value" />
            </van-dropdown-menu>

            <van-cell-group>
              <van-field v-model="short_name" placeholder="请输入计划" input-align="center" />
            </van-cell-group>
          </van-action-sheet>
        </template>
      </van-nav-bar>
    </div>
    <!--短期计划列表-->
    <div>
      <!-- <van-grid :gutter="10" :border="false" :column-num="4">
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
        
      </van-grid>-->

      <van-grid :gutter="10" :border="false" :column-num="4">
        <van-grid-item v-for="(item,index) in shortlist" :key="index">
          <van-list v-model="loading" :finished="finished" @load="onLoad" loading-text=" ">
            <div
              class="short_plan"
              @touchstart.prevent="touchinUk(index)"
              @touchend.prevent="cleartime(index)"
            >
              <van-image
                round
                width="4rem"
                height="4rem"
                @click="click_plan(index)"
                :src="item.img"
              />
              <header>{{item.shortname}}</header>
            </div>
          </van-list>
        </van-grid-item>
      </van-grid>

      <!-- 选择计时模式 -->
      <div id="all">
        <van-dialog v-model="show_text" title="计时模式" show-cancel-button :beforeClose="confirm_time" close-on-popstate=true>
          <van-picker :columns="columns" visible-item-count="1" />

          <van-datetime-picker
            v-model="currentTime"
            title="hour:minutes"
            type="time"
            :min-hour="0"
            :min-minute="0"
            :max-minute="60"
            :max-hour="24"
            :show-toolbar="true"
            cancel-button-text=" "
            confirm-button-text=" "
            :item-height="20"
            visible-item-count="2"
          />
          <!-- 删除计划原本按钮<van-button round type="info" plain @click="del_plan(index)">删除计划</van-button> -->
        </van-dialog>
      </div>

      <!-- 是否多次打卡显示 -->
      <div>
        <van-dialog v-model="show_some" 
        title="打卡次数" 
        show-cancel-button 
        confirmButtonText="多次" 
        cancelButtonText="单次" 
        @confirm="manyDK"
        @cancel="onceDK"
        >
        </van-dialog>
      </div>

    </div>
  </div>
</template>

<style>
.bar_sty {
  background: #14c1bb;
}
.short_plan {
  text-align: center;
}
</style>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Dialog, Toast } from "vant";

// 全局注册
Vue.use(Dialog);

Vue.use(Icon);

export default {
  data() {
    return {
      //列表数据
      loading: false,
      finished: false,
      refreshing: false,
      listnum: 5,
      short_name: "",
      image:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586859173525&di=2ed40c36ff895b36aa8eab69e683dfff&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F19%2F91%2F84570bf4c1066fe.jpg",
      shortlist: [
        {
          shortname: "专注",
          DKway: 0, //0计时模式或1打卡模式
          DKtime:1,//如果为打卡模式设置 0单次打卡 1多次打卡
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586095355294&di=817277abc1bc0beeb6bd754e81fb38ec&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F10%2F16%2F59035b41b31f8_610.jpg"
        },
        {
          shortname: "放下手机",
          DKway: 0,
          DKtime:1,
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586095935255&di=c67ca46680933938cb37d357160b0a56&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F19%2F52%2F29570b3549ece4d.jpg"
        },
        {
          shortname: "吃药",
          DKway: 1,
          DKtime:1,
          img:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=153606762,3021730881&fm=15&gp=0.jpg"
        },
        {
          shortname: "看书",
          DKway: 0,
          DKtime:1,
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586096266671&di=8401f2f6d76cd9b60cffb927b687d2ab&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F19%2F48%2F39570b25ee4e848.jpg"
        },
        {
          shortname: "吃水果",
          DKway: 1,
          DKtime:0,
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3854818272,2588434238&fm=26&gp=0.jpg"
        }
      ],

      //新建计划
      show_some: false,
      show_text: false,
      showR: false,
      showL: false,
      value: 0,//模式的value
      value_dk:0,//单多次打卡的value 0单 1多
      option: [
        { text: "计时模式", value: 0 },
        { text: "打卡模式", value: 1 }
      ],
      columns: ["倒计时", "正计时"],
      secondsTime: 0
    };
  },

  methods: {
    //隐藏个人信息界面弹出
    hideshwoleft() {
      this.showL = false;
    },
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
    GoDetials(){
      this.$router.push({ path: "/Details" });
    },
    GoPlanQ(){
       this.$router.push({ path: "/PlanQ" });
    },
    GoMylc(){
      this.$router.push({ path: "/mylc" });
    },
  
    //多次任务完成不删除
    finish_Mplan() {
      Dialog.confirm({
        title: "打卡完成"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
   //单次任务完成删除
    finish_Oplan(index) {
      Dialog.confirm({
        title: "打卡完成"
      })
        .then(() => {
          // on confirm
          this.shortlist.splice(index, 1);
        })
        .catch(() => {
          // on cancel
        });
        
    },

    set_time() {
      this.show_text = true;
    },

    //时间转换成毫秒再上传到store
    timeChange() {
      var hms = this.currentTime; // your input string
      var a = hms.split(":"); // split it at the colons
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = +a[0] * 60 * 60 * 1000 + +a[1] * 60 * 1000;
      this.secondsTime = seconds;
      console.log(seconds);
      console.log(this.secondsTime);
    },


    //设定时间后跳转到time界面
    confirm_time(action, done) {
      if (action == "confirm") {
        done();
        this.timeChange();
        this.$store.commit("updataCurrentTime", this.secondsTime);
        console.log(this.$store.state.currentTime);
        this.$router.push({ path: "/timedown" });
        done();
      } else {
        done();
      }
    },

    //列表函数
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.shortlist = [];
          this.refreshing = false;
        }
        for (
          let i = 0;
          i < this.listnum && this.shortlist.length < this.listnum;
          i++
        ) {
          this.shortlist.push(this.shortlist.length + 1);
        }
        this.loading = false;

        if (this.shortlist.length >= this.listnum) {
          this.finished = true;
        }
      }, 1000);
    },

    //增加短期计划
    add_shortPlan() {
      //计时模式计划增加
      console.log('打卡模式',this.value);
      if (this.value == 0) {
        this.shortlist.push({
          shortname: this.short_name,
          DKway: 0,
          DKtime:1,
          img: this.image
        });
      } else {

        //单次打卡任务增加
        if(this.value_dk==0){
          this.shortlist.push({
          shortname: this.short_name,
          DKway: 1,
          DKtime:0,
          img: this.image
        });
        }else{
          //多次打卡任务添加
          this.shortlist.push({
          shortname: this.short_name,
          DKway: 1,
          DKtime:1,
          img: this.image
        });
        }

      }
      this.listnum++;
      this.short_name = "";
      this.value=0;
    },

    //单击计划弹出
    click_plan(index) {
      let plan = this.shortlist[index];
      if (plan.DKway == 0) {
        this.set_time();
      } else {
        if(plan.DKtime==1){
          this.finish_Mplan();
        }else{
          this.finish_Oplan(index);
        }
      }
    },

    //关闭下拉菜单后操作
    clsoed_value() {
      console.log(this.value);
      if(this.value==1){
        this.show_some = true;
      };
    },
    manyDK(){
      this.value_dk=1;
    },
    onceDK(){
      this.value_dk=0;
    },

    //原本的删除按钮
    // del_plan(index) {
    //   this.show_text = false;
    //   this.shortlist.splice(index, 1);
    //   this.listnum--;
    // },

    //长按删除的实现
    touchinUk(index) {
      console.log(index);
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.Loop = 0;
          this.$dialog
            .confirm({
              message: "是否删除计划"
            })
            .then(() => {
              console.log("删除");
              this.shortlist.splice(index, 1);
              this.listnum--;
            })
            .catch(() => {
              // on cancel
              console.log("不删");
            });
        }.bind(this),
        1000
      );
    },
    cleartime(index) {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
      if (this.Loop != 0) {
        this.click_plan(index);
      }
    }
  }
};
</script>