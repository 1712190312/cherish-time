<template>
  <div>
    <div>
      <!-- 底部tabbar标签栏 -->
      <router-view />
      <van-tabbar route>
        <van-tabbar-item replace to="/test" icon="completed">今日待办</van-tabbar-item>
        <van-tabbar-item replace to="/max" icon="home-o">预约待办</van-tabbar-item>
        <van-tabbar-item replace to="/longitem" icon="label">长期待办</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 添加计划弹出层 -->
    <van-popup v-model="showright" position="right" :style="{ height: '100%',width:'100%' }">
      <van-nav-bar title="添加计划" @click-left="outadd" @click-right="addplan">
        <template #left>
          <van-icon name="cross" size="30px" />
        </template>
        <template #right>
          <van-icon name="success" size="30px" />
        </template>
      </van-nav-bar>
      <div>
        <!-- 计划标题 -->
        <van-cell-group>
          <van-field v-model="valuename" placeholder="请输入计划标题" />
        </van-cell-group>
        <!-- 全天计划 -->
        <van-cell title="全天计划">
          <template #default>
            <van-switch v-model="checked" size="24px" @change="QTchange" />
          </template>
        </van-cell>
        <!-- 非全天计划开始结束显示 -->
        <div v-if="Fqt_show">
          <!-- 开始时间 -->
          <van-cell title="开始时间" is-link :value="this.BeginTimeValue" @click="BeginChoiceTime"></van-cell>
          <!-- 结束时间 -->
          <van-cell title="结束时间" is-link :value="this.EndTimeValue" @click="EndChoiceTime"></van-cell>
        </div>

        <!-- 全天计划开始结束显示 -->
        <div v-if="Qt_show">
          <!-- 开始时间 -->
          <van-cell title="开始时间" is-link :value="this.BeginTimeValue" @click="BeginChoiceTime"></van-cell>
          <!-- 结束时间 -->
          <van-cell title="结束时间" is-link :value="this.EndTimeValue" @click="EndChoiceTime"></van-cell>
        </div>


        <!-- 每日计划开始结束显示 -->
        <div v-if="MR_show">
          <!-- 开始时间 -->
          <van-cell title="每日开始时间" is-link :value="this.BeginTimeValue" @click="BeginChoiceTime"></van-cell>
          <!-- 结束时间 -->
          <van-cell title="结束时间" is-link :value="this.EndTimeValue" @click="EndChoiceTime"></van-cell>
        </div>

        <!-- 重复 -->
        <van-cell title="重复" is-link :value="this.CF_choice" @click="CFChoice"></van-cell>
        <!-- 重复弹出层 -->
        <van-popup v-model="CFshow" round position="bottom" :style="{ height: '25%' }">
          <van-cell title="一次性计划" @click="show1_choice">
            <template #icon v-if="show1">
              <van-icon name="arrow" size="20px" />
            </template>
          </van-cell>
          <van-cell title="每天" @click="show2_choice">
            <template #icon v-if="show2">
              <van-icon name="arrow" size="20px" />
            </template>
          </van-cell>
          <van-cell title="每周(周一至周五)" @click="show3_choice">
            <template #icon v-if="show3">
              <van-icon name="arrow" size="20px" />
            </template>
          </van-cell>
        </van-popup>

        <!-- 弹出层非全天计划的时间选择 -->
        <van-popup v-model="showFQT" round position="bottom" :style="{ height: '40%' }">
          <div class="textcenter">
            <h4>{{this.text_name}}</h4>
            <header>{{this.timeValue}}</header>
          </div>
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            visible-item-count="3"
            :show-toolbar="false"
            :formatter="formatter"
            @change="confirmPicker"
          />
          <van-row type="flex" justify="space-around">
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="showFQT=false">取消</van-button>
            </van-col>
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="confirmTime">确定</van-button>
            </van-col>
          </van-row>
        </van-popup>

        <!-- 弹出层全天计划的时间选择 -->
        <van-popup v-model="showQT" round position="bottom" :style="{ height: '40%' }">
          <div class="textcenter">
            <h4>{{this.text_name}}</h4>
            <header>{{this.timeValue}}</header>
          </div>
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            visible-item-count="3"
            :show-toolbar="false"
            :formatter="formatter"
            @change="QT_confirmPicker"
          />

          <van-row type="flex" justify="space-around">
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="showQT=false">取消</van-button>
            </van-col>
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="confirmTime">确定</van-button>
            </van-col>
          </van-row>
        </van-popup>



         <!-- 弹出层每日计划的时间选择 -->
        <van-popup v-model="showMR" round position="bottom" :style="{ height: '40%' }">
          <div class="textcenter">
            <h4>{{this.text_name}}</h4>
            <header>{{this.timeValue}}</header>
          </div>
          <van-datetime-picker
            v-model="currentTime"
            type="time"
            :min-hour="0"
            :max-hour="23"
            visible-item-count="3"
            :show-toolbar="false"
            :formatter="formatter"
            @change="MR_confirmPicker"
          />

          <van-row type="flex" justify="space-around">
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="showMR=false">取消</van-button>
            </van-col>
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="confirmTime">确定</van-button>
            </van-col>
          </van-row>
        </van-popup>
      </div>
    </van-popup>

    <!-- 修改计划弹出层 -->
    <van-popup v-model="showchange_plan" position="right" :style="{ height: '100%',width:'100%' }">
      <van-nav-bar title="修改计划" @click-left="outadd" @click-right="changeplan">
        <template #left>
          <van-icon name="cross" size="30px" />
        </template>
        <template #right>
          <van-icon name="success" size="30px" />
        </template>
      </van-nav-bar>
      <div>
        <!-- 计划标题 -->
        <van-cell-group>
          <van-field v-model="valuename" placeholder="请输入计划标题" />
        </van-cell-group>
        <!-- 全天计划 -->
        <van-cell title="全天计划">
          <template #default>
            <van-switch v-model="checked" size="24px" @change="QTchange" />
          </template>
        </van-cell>
        <!-- 非全天计划开始结束显示 -->
        <div v-if="Fqt_show">
          <!-- 开始时间 -->
          <van-cell title="开始时间" is-link :value="this.BeginTimeValue" @click="BeginChoiceTime"></van-cell>
          <!-- 结束时间 -->
          <van-cell title="结束时间" is-link :value="this.EndTimeValue" @click="EndChoiceTime"></van-cell>
        </div>

        <!-- 全天计划开始结束显示 -->
        <div v-if="Qt_show">
          <!-- 开始时间 -->
          <van-cell title="开始时间" is-link :value="this.BeginTimeValue" @click="BeginChoiceTime"></van-cell>
          <!-- 结束时间 -->
          <van-cell title="结束时间" is-link :value="this.EndTimeValue" @click="EndChoiceTime"></van-cell>
        </div>

        <!-- 每日计划开始结束显示 -->
        <div v-if="MR_show">
          <!-- 开始时间 -->
          <van-cell title="每日开始时间" is-link :value="this.BeginTimeValue" @click="BeginChoiceTime"></van-cell>
          <!-- 结束时间 -->
          <van-cell title="结束时间" is-link :value="this.EndTimeValue" @click="EndChoiceTime"></van-cell>
        </div>

        <!-- 重复 -->
        <van-cell title="重复" is-link :value="this.CF_choice" @click="CFChoice"></van-cell>
        <!-- 重复弹出层 -->
        <van-popup v-model="CFshow" round position="bottom" :style="{ height: '25%' }">
          <van-cell title="一次性计划" @click="show1_choice">
            <template #icon v-if="show1">
              <van-icon name="arrow" size="20px" />
            </template>
          </van-cell>
          <van-cell title="每天" @click="show2_choice">
            <template #icon v-if="show2">
              <van-icon name="arrow" size="20px" />
            </template>
          </van-cell>
          <van-cell title="每周(周一至周五)" @click="show3_choice">
            <template #icon v-if="show3">
              <van-icon name="arrow" size="20px" />
            </template>
          </van-cell>
        </van-popup>

        <!-- 弹出层非全天计划的时间选择 -->
        <van-popup v-model="showFQT" round position="bottom" :style="{ height: '40%' }">
          <div class="textcenter">
            <h4>{{this.text_name}}</h4>
            <header>{{this.timeValue}}</header>
          </div>
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            visible-item-count="3"
            :show-toolbar="false"
            :formatter="formatter"
            @change="confirmPicker"
          />
          <van-row type="flex" justify="space-around">
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="showFQT=false">取消</van-button>
            </van-col>
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="confirmTime">确定</van-button>
            </van-col>
          </van-row>
        </van-popup>

        <!-- 弹出层全天计划的时间选择 -->
        <van-popup v-model="showQT" round position="bottom" :style="{ height: '40%' }">
          <div class="textcenter">
            <h4>{{this.text_name}}</h4>
            <header>{{this.timeValue}}</header>
          </div>
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            visible-item-count="3"
            :show-toolbar="false"
            :formatter="formatter"
            @change="QT_confirmPicker"
          />
          <van-row type="flex" justify="space-around">
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="showQT=false">取消</van-button>
            </van-col>
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="confirmTime">确定</van-button>
            </van-col>
          </van-row>
        </van-popup>


         <!-- 弹出层每日计划的时间选择 -->
        <van-popup v-model="showMR" round position="bottom" :style="{ height: '40%' }">
          <div class="textcenter">
            <h4>{{this.text_name}}</h4>
            <header>{{this.timeValue}}</header>
          </div>
          <van-datetime-picker
            v-model="currentTime"
            type="time"
            :min-hour="0"
            :max-hour="23"
            visible-item-count="3"
            :show-toolbar="false"
            :formatter="formatter"
            @change="MR_confirmPicker"
          />

          <van-row type="flex" justify="space-around">
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="showMR=false">取消</van-button>
            </van-col>
            <van-col span="9">
              <van-button round plain type="info" size="large" @click="confirmTime">确定</van-button>
            </van-col>
          </van-row>
        </van-popup>

        <van-button round plain type="info" size="large" @click="del_plan">删除计划</van-button>
      </div>
    </van-popup>

    <!-- 顶部 -->
    <div>
      <van-nav-bar title="今日待办" @click-right="onClickRight">
        <template #right>
          <van-icon name="add-o" size="20px" />
        </template>
        <!--左上弹出-->
        <template #left>
          <van-icon name="wap-home" size="20px" @click="showLeft" />
          <van-popup v-model="showL" round position="left" :style="{height: '100%' ,width:'50%'}">
            <!--个人界面弹窗-->
            <div>
              <van-nav-bar>
                <template #left>
                  <van-icon name="arrow-left" size="20px" @click="hideshwoleft" />
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

                <van-cell center title="我的牧场" @click="GoNc">
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
      </van-nav-bar>
    </div>
    <!-- 上方日期显示 -->
    <div>
      <van-row class="textcenter">
        <van-col span="3">
          <van-icon name="arrow-left" size="30" @click="lefticon" />
        </van-col>
        <van-col span="18">
          <van-cell center :title="this.date" @click="show = true" />
        </van-col>
        <van-col span="3">
          <van-icon name="arrow" size="30" @click="righticon" />
        </van-col>
      </van-row>
      <van-calendar v-model="show" @confirm="onConfirm" />
    </div>


    <!-- 每日未完成列表 -->
    <div>
      <van-list v-model="eloading" :finished="efinished" @load="everyonLoad">
        <div
          v-for="(item,index) in today_everylist"
          :key="index"
          @touchstart.prevent="MR_touchinUk(index)"
          @touchend.prevent="MR_cleartime(index)"
          @click="every_finsh(index)"
        >
          <van-cell>
            <template #icon>
              <van-image
                round
                width="2.5rem"
                height="2.5rem"
                src="http://img3.imgtn.bdimg.com/it/u=3105721490,614407519&fm=26&gp=0.jpg"
              />
            </template>
            <template #title>{{item.name}}</template>
            <template #label>{{item.BeginTimeList}}-{{item.EndTimeList}}</template>
          </van-cell>
        </div>
      </van-list>
    </div>

     


    <!-- 今天未完成列表 -->
    <div>
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div
          v-for="(item,index) in todaylist"
          :key="index"
          @touchstart.prevent="touchinUk(index)"
          @touchend.prevent="cleartime(index)"
          @click="planclick(index)"
        >
          <van-cell>
            <template #icon>
              <van-image
                round
                width="2.5rem"
                height="2.5rem"
                src="http://img3.imgtn.bdimg.com/it/u=3105721490,614407519&fm=26&gp=0.jpg"
              />
            </template>
            <template #title>{{item.name}}</template>

            <template #label>{{item.BeginTimeList}}-{{item.EndTimeList}}</template>
          </van-cell>
        </div>
      </van-list>
    </div>


    <!-- 每日完成列表 -->
    <div>
      <van-list v-model="efloading" :finished="effinished" @load="everyfinshonLoad">
        <div
          v-for="(item,index) in today_everyfinshlist"
          :key="index"
          
        >
          <van-cell>
            <template #icon>
              <van-image
                round
                width="2.5rem"
                height="2.5rem"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587483466732&di=d7719d8d7769410f887855f5aa653984&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F40%2F50%2F19573d0219c29be.jpg"
              />
            </template>
            <template #title>{{item.name}}</template>
            <template #label>{{item.BeginTimeList}}-{{item.EndTimeList}}</template>
          </van-cell>
        </div>
      </van-list>
    </div>

    <!-- 今天完成列表 -->
    <div v-if="finsh_show">
      <van-list v-model="floading" :finished="ffinished" finished-text="没有更多了" @load="finshonLoad">
        <div v-for="(item,index) in todayfinishlist" :key="index">
          <van-cell>
            <template #icon>
              <van-image
                round
                width="2.5rem"
                height="2.5rem"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587483466732&di=d7719d8d7769410f887855f5aa653984&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F40%2F50%2F19573d0219c29be.jpg"
              />
            </template>
            <template #title>{{item.name}}</template>

            <template #label>{{item.BeginTimeList}}-{{item.EndTimeList}}</template>
          </van-cell>
        </div>
      </van-list>
    </div>

    <!-- 单击计划弹出打卡或计时 -->
    <van-dialog
      v-model="clickplanshow"
      title="完成"
      show-cancel-button
      cancelButtonText="打卡"
      confirmButtonText="计时"
      @confirm="js_plan"
      @cancel="daka_plan"
      :close-on-click-overlay="true"
    />

    <div id="all">
      <van-dialog
        v-model="show_js"
        title="计时模式"
        show-cancel-button
        :beforeClose="confirm_time"
        :close-on-popstate="true"
      >
        <van-picker :columns="columns" visible-item-count="1" />

        <van-datetime-picker
          v-model="currentTime"
          type="time"
          :min-hour="0"
          :min-minute="0"
          :max-minute="60"
          :max-hour="24"
          :show-toolbar="false"
          :formatter="formatter"
          cancel-button-text=" "
          confirm-button-text=" "
          :item-height="20"
          visible-item-count="2"
        />
        <!-- 删除计划原本按钮<van-button round type="info" plain @click="del_plan(index)">删除计划</van-button> -->
      </van-dialog>
    </div>
  </div>
</template>

<style>
.textcenter {
  text-align: center;
}
.important {
  z-index: 9;
}
</style>

<script>
import storage from "../store/listfucton.js";
import Vue from "vue";
import { Col, Row } from "vant";
import { Dialog } from 'vant';
Vue.use(Col);
Vue.use(Row);

export default {
  data() {
    return {
      finsh_show: true,
      //个人界面
      showL: false,
      //修改日历时间
      calendar_date: "",
      //修改计划
      showchange_plan: false,
      plannumber: 0,
      changename: "",
      changedetialtime: "",
      //单击计划弹出
      clickplanshow: false,
      show_js: false, //计时show

      //计时

      columns: ["倒计时", "正计时"],
      secondsTime: 0,
      currentTime: 0,
      //
      Fqt_show: true,
      Qt_show: false,
      MR_show:false,
      show1: true,
      show2: false,
      show3: false,
      //重复下拉菜单
      CFshow: false,
      CF_choice: "一次性任务",
      CFvalue: 0, //重复 0一次性 1每天 2每周一至五
      //输入框的值
      valuename: "",
      showFQT: false,
      showQT: false,
      showMR:false,
      checked: false,
      showright: false,
      show: false,
      //今日待办列表
      todaylist: [],
      todaylistnum: 0,
      date: "date",
      loading: false,
      finished: false,
      //今日完成列表
      floading: false,
      ffinished: false,

      //时间选择
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentTime: '12:00',
      timeValue: "",

      BeginTimeValue: "",
      EndTimeValue: "",
      Begin_End: 0, //确认是开始还是结束时间的选择
      text_name: "开始时间",
      //列表
      listdata: [
        // {
        //   // name:'早起',
        //   // BeginTimeList:'2020-04-20 8:00',
        //   // EndTtimeList:'2020-05-20 8:00',
        //   // CFway:2,//0 1 2
        // }
      ],
      datalistnum: 0,

      //testlist用于向短期或长期计划添加
      testlist: [],
      testlistnum: 0,
      //todayfinishlist今日完成列表
      todayfinishlist: [],
      todayfinishnum: 0,
      //总的完成计划表
      finishlist: [],
      finishnum: 0,
      //每日计划
      everylist:[],
      everylistnum:0,
      //每日计划完成总表
      everyfinshlist:[],
      everyfinshnum:0, 
      //每日计划在今天完成的
      today_everyfinshlist:[],
      efloading:false,
      effinished:false,
      today_everyfinshnum:0,
      //今天包含的每日计划
      today_everylist:[],
      today_everynum:0,
      eloading:false,
      efinished:false,


      //区别每日计划普通计划
      MR:false,
    };
  },

  created() {
    let date = new Date();
    this.calendar_date = date;
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    // let s = date.getSeconds()
    if (m >= 1 && m <= 9) {
      m = `0${m}`;
    }
    if (d >= 1 && d <= 9) {
      d = `0${d}`;
    }
    // if (s >= 0 && s <= 9) { min = `0${s}` }
    let time = `${y}-${m}-${d}`;
    this.date = this.date_get();
    this.getTime();
  },
  mounted() {
    var list = storage.get("listdata");
    if (list) {
      this.listdata = list;
      this.datalistnum = storage.get("datalistnum");
    }
    var list2 = storage.get("todaylist");
    if (list2) {
      this.todaylist = list2;
      this.todaylistnum = storage.get("todaylistnum");
    }

    var list3 = storage.get("finishlist");
    if (list3) {
      this.finishlist = list3;
      this.finishnum = storage.get("finishnum");
    }

    var list4=storage.get("everylist");
    if(list4){
      this.everylist=storage.get("everylist");
      this.everylistnum=storage.get("everylistnum")
    }




    this.today_everyfinshplan();
    this.today_everyplan();
    this.today_finshplan();
    this.today_plan();
    if (this.$store.state.plan_finsh == 1) {
      this.js_goback();
    }
   
  },
  methods: {
    //个人信息页展示隐藏
    showLeft() {
      this.showL = true;
    },
    hideshwoleft() {
      this.showL = false;
    },
    //个人信息页的跳转
    GoSetting() {
      this.$router.push({ path: "/setting" });
    },
    GoGood() {
      this.$router.push({ path: "/good" });
    },
    GoDetials() {
      this.$router.push({ path: "/Details" });
    },
    GoPlanQ() {
      this.$router.push({ path: "/PlanQ" });
    },
    GoMylc() {
      this.$router.push({ path: "/mylc" });
    },
    GoNc() {
      this.$router.push({ path: "/threeView" });
    },

    //列表排序
    get_sort(list) {
      list.sort(function(a, b) {
        return a.BeginTimeList > b.BeginTimeList;
      });
    },

    //前一天下一天显示
    lefticon() {
      console.log("left");
      var val = new Date(this.calendar_date);
      val.setDate(this.calendar_date.getDate() - 1);
      this.calendar_date = val;
      let y = val.getFullYear();
      let m = val.getMonth() + 1;
      let d = val.getDate();
      if (m >= 1 && m <= 9) {
        m = `0${m}`;
      }
      if (d >= 1 && d <= 9) {
        d = `0${d}`;
      }
      let time = `${y}-${m}-${d}`;
      this.date = time;
      console.log(this.date);
      this.today_everyfinshplan();
      this.today_everyplan();
      this.today_finshplan();
      this.today_plan();
    },
    righticon() {
      console.log("right");
      var val = new Date(this.calendar_date);
      val.setDate(this.calendar_date.getDate() + 1);
      this.calendar_date = val;
      let y = val.getFullYear();
      let m = val.getMonth() + 1;
      let d = val.getDate();
      if (m >= 1 && m <= 9) {
        m = `0${m}`;
      }
      if (d >= 1 && d <= 9) {
        d = `0${d}`;
      }
      let time = `${y}-${m}-${d}`;
      this.date = time;
      console.log(this.date);

      this.today_everyfinshplan();
      this.today_everyplan();
      this.today_finshplan();
      this.today_plan();
    },

    //时间选择修饰函数
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      } else if (type === "second") {
        return `${value}秒`;
      }
      return value;
    },

    // 默认显示当前时间
    getTime() {
      let date = new Date();
      console.log(date);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      let min = date.getMinutes();
      // let s = date.getSeconds()
      if (m >= 1 && m <= 9) {
        m = `0${m}`;
      }
      if (d >= 1 && d <= 9) {
        d = `0${d}`;
      }
      if (h >= 0 && h <= 9) {
        h = `0${h}`;
      }
      if (min >= 0 && min <= 9) {
        min = `0${min}`;
      }
      // if (s >= 0 && s <= 9) { min = `0${s}` }
      let time = `${y}-${m}-${d} ${h}:${min}`;
      this.timeValue = time;
      this.BeginTimeValue = time;
      this.EndTimeValue = time;
    },

    // 全天计划默认显示时间早上8点
    QT_getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      // let s = date.getSeconds()
      if (m >= 1 && m <= 9) {
        m = `0${m}`;
      }
      if (d >= 1 && d <= 9) {
        d = `0${d}`;
      }
      // if (s >= 0 && s <= 9) { min = `0${s}` }
      let time = `${y}-${m}-${d} 08:00`;
      this.timeValue = time;
      this.BeginTimeValue = time;
      this.EndTimeValue = time;
    },
  //每日时间显示
    MR_gettime(){
      var val = this.currentDate;
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      let time= `${hour}:${minute}`;
      this.timeValue = time;
      this.BeginTimeValue = time;
      this.EndTimeValue = time;
      console.log(this.timeValue);
    },

    //改变选择之后的时间
    confirmPicker() {
      var val = this.currentDate;
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      // let second = val.getSeconds()
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      // if (second >= 0 && second <= 9) { second = `0${second}` }
      this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`;
      console.log(this.timeValue);
    },

    //改变选择之后的时间
    QT_confirmPicker() {
      var val = this.currentDate;
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      // let second = val.getSeconds()
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      // if (second >= 0 && second <= 9) { second = `0${second}` }
      this.timeValue = `${year}-${month}-${day} 08:00`;
      console.log(this.timeValue);
    },
    //每日计划改变时间
    MR_confirmPicker(){   
      this.timeValue =this.currentTime;
      console.log(this.timeValue);
    },

    // 日历时间选择
    formatDate(date) {
      this.calendar_date = date;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      return `${year}-${month}-${day}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
      console.log(this.date);
      this.today_plan();
    },

    // 今日计划列表
    onLoad() {
      setTimeout(() => {
        for (
          let i = 0;
          i < this.todaylistnum && this.todaylist.length < this.todaylistnum;
          i++
        ) {
          this.todaylist.push(this.todaylist.length + 1);
        }
        this.loading = false;

        if (this.todaylist.length >= this.todaylistnum) {
          this.finished = true;
        }
      }, 1000);
    },
    //今日完成计划列表
    finshonLoad() {
      setTimeout(() => {
        for (
          let i = 0;
          i < this.todayfinishnum &&
          this.todayfinishlist.length < this.todayfinishnum;
          i++
        ) {
          this.todayfinishlist.push(this.todayfinishlist.length + 1);
        }
        this.floading = false;

        if (this.todayfinishlist.length >= this.todayfinishnum) {
          this.ffinished = true;
        }
      }, 1000);
    },

    //每日未完成计划
    everyonLoad(){
      setTimeout(() => {
        for (
          let i = 0;
          i < this.today_everynum &&
          this.today_everylist.length < this.today_everynum;
          i++
        ) {
          this.today_everylist.push(this.today_everylist.length + 1);
        }
        this.eloading = false;

        if (this.today_everylist.length >= this.today_everynum) {
          this.efinished = true;
        }
      }, 1000);
    },

    everyfinshonLoad(){
      setTimeout(() => {
        for (
          let i = 0;
          i < this.today_everyfinshnum &&
          this.today_everyfinshlist.length < this.today_everyfinshnum;
          i++
        ) {
          this.today_everyfinshlist.push(this.today_everyfinshlist.length + 1);
        }
        this.efloading = false;

        if (this.today_everyfinshlist.length >= this.today_everyfinshnum) {
          this.effinished = true;
        }
      }, 1000);
    },

    //点击函数
    onClickRight() {
      this.showright = true;
      this.getTime();
      this.CFvalue = 0;
    },
    outadd() {
      this.showright = false;
      this.showchange_plan = false;
      this.show1_choice();
    },

    //开始结束时间选择
    BeginChoiceTime() {
      this.Begin_End = 0;
      this.text_name = "开始时间";
      if(this.CFvalue==1){
        this.showMR=true;
      }else{
         if (this.checked == false) {
        this.showFQT = true;
      } else {
        this.showQT = true;
      }
      }
    },
    EndChoiceTime() {
      this.Begin_End = 1;
      this.text_name = "结束时间";
      if(this.CFvalue==1){
        this.showMR=true;
      }else{
         if (this.checked == false) {
        this.showFQT = true;
      } else {
        this.showQT = true;
      }
      }
    },
    // choiceTime() {
    //   this.showFQT = true;
    // },

    //开始或结束时间确定
    confirmTime() {
      if (this.Begin_End == 0) {
        this.BeginTimeValue = this.timeValue;
        this.EndTimeValue = this.BeginTimeValue;
        console.log(this.Begin_End);
      } else {
        this.EndTimeValue = this.timeValue;
      }
      if(this.CFvalue==1){
        this.showMR=false;
      }else{
        if (this.checked == false) {
        this.showFQT = false;
      } else {
        this.showQT = false;
      }
      }
      
    },
    //重复选择
    CFChoice() {
      this.CFshow = true;
    },
    show1_choice() {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.CFshow = false;
      this.CF_choice = "一次性任务";
      this.CFvalue = 0;
    },
    show2_choice() {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.CFshow = false;
      this.CF_choice = "每天";
      this.CFvalue = 1;
      //每日计划
      this.MR_gettime();
       this.MR_show=true;
        this.Qt_show = false;
        this.Fqt_show = false;
    },
    show3_choice() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.CFshow = false;
      this.CF_choice = "每周(周一至周五)";
      this.CFvalue = 2;
    },

    //全天、非全天、每日 计划
    QTchange() {
      console.log(this.checked);
      if(this.CFvalue==1){
        this.MR_show=true;
        this.Qt_show = false;
        this.Fqt_show = false;
        this.MR_gettime();
      }else{
        if (this.checked == false) {
        this.getTime();
        this.Fqt_show = true;
        this.Qt_show = false;
        this.MR_show=false;
      } else {
        this.QT_getTime();
        this.Fqt_show = false;
        this.Qt_show = true;
        this.MR_show=false;
      }
      }
    },
    //添加计划
    addplan() {


      console.log("addplan");
      //添加全天计划
      if(this.CFvalue==1){
        this.everylist.push({
        name: this.valuename,
        BeginTimeList: this.BeginTimeValue,
        EndTimeList: this.EndTimeValue,
        CFway: this.CFvalue,
        detialtime: this.detial_time(),
        DKday:0,
        });
        this.everylistnum++;
        this.get_sort(this.everylist);
        storage.set("everylist",this.everylist);
        storage.set("everylistnum",this.everylistnum);
        this.showright = false;
        this.show1_choice();
        this.today_everyplan();
      }else{

      
      this.listdata.push({
        name: this.valuename,
        BeginTimeList: this.BeginTimeValue,
        EndTimeList: this.EndTimeValue,
        CFway: this.CFvalue,
        detialtime: this.detial_time(),
        percentage: 0
      });
      console.log(this.detial_time());

      this.get_sort(this.listdata);
      storage.set("listdata", this.listdata);
      this.showright = false;
      this.datalistnum++;
      storage.set("datalistnum", this.datalistnum);
      

      this.finshonLoad();
      this.today_finshplan();
      this.today_plan();
      }
      this.show1_choice();
    },

    //当天的每日计划
    today_everyplan(){
      var list=storage.get("everylist");
      if(list){
        this.everylist=storage.get("everylist");
        this.everylistnum=storage.get("everylistnum");
      }else{
        this.everylist=[];
        this.everylistnum=0;
      }


      if(this.everylistnum>0){
        this.today_everylist=JSON.parse(JSON.stringify(this.everylist));
        this.today_everynum=this.everylistnum;
      }

      var list_c=JSON.parse(JSON.stringify(this.today_everylist));
      var num_c=this.today_everynum;
      //从当天的每日计划中删除当天已完成的每日计划
      if(this.today_everyfinshnum>0){
        for(let i=0;i<this.today_everyfinshnum;i++){
          for(let j=0;j<this.today_everynum;j++){
            if(this.today_everyfinshlist[i].detialtime==this.today_everylist[j].detialtime){ 
              for(let a=0;a<num_c;a++){
                if(list_c[a].detialtime==this.today_everyfinshlist[i].detialtime){
                  list_c.splice(a,1);
                  num_c--;
                  break;
                }
              }
            }
          }
        }
      }

      this.today_everylist=JSON.parse(JSON.stringify(list_c));;
      this.today_everynum=num_c;
      console.log(this.today_everylist);
      this.everyonLoad();

    },


    today_everyfinshplan(){
      var list=storage.get("everyfinshlist");
      if(list){
        this.everyfinshlist=storage.get("everyfinshlist");
        this.everyfinshnum=storage.get("everyfinshnum");
      }else{
        this.everyfinshnum=0;
        this.everyfinshlist=[];
      }
      this.today_everyfinshlist=[];
      this.today_everyfinshnum=0;

      if(this.everyfinshnum>0){
        for(let i=0;i<this.everyfinshnum;i++){
          if(this.everyfinshlist[i].finshtime==this.date){
            console.log("添加today_everyfinshlist",this.date)
            this.today_everyfinshlist.push(this.everyfinshlist[i]);
            this.today_everyfinshnum++;
          }
        }
      }
      console.log(this.today_everyfinshlist);
      this.everyfinshonLoad();


    },


    //查找当天计划
    today_plan() {
      this.todaylist = [];
      this.todaylistnum = 0;
      storage.set("todaylist", this.todaylist);
      storage.set("todaylistnum", this.todaylistnum);
      var num = 0;
      var today = this.date;
      //console.log("this.date:"+this.date);
      for (let i = 0; i < this.datalistnum; i++) {
        console.log("进入寻找今日计划循环");
        var ba = this.listdata[i].BeginTimeList.split(" ");
        // console.log(ba[0]);
        var ea = this.listdata[i].EndTimeList.split(" ");
        // console.log(ea[0]);
        if (ba[0] <= today && ea[0] >= today) {
          this.todaylist.push(this.listdata[i]);
          num++;
          // console.log("1");
        }
        this.get_sort(this.todaylist);
      }

      storage.set("todaylist", this.todaylist);
      this.todaylistnum = num;
      storage.set("todaylistnum", this.todaylistnum);





      var flist=storage.get("todayfinishlist");
      if(flist){
        this.todayfinishlist=flist;
        this.todayfinishnum=storage.get("todayfinishnum");
      }else{
        this.todayfinishlist = [];
      this.todayfinishnum = 0;
      storage.set("todayfinishlist", this.todayfinishlist);
      storage.set("todayfinishnum",this.todayfinishnum);
      }


      this.testlistnum = this.todaylistnum;

      //防止同步
      this.testlist=JSON.parse(JSON.stringify(this.todaylist));


    
      console.log(this.testlist);
      console.log("todaylistnum", this.todaylistnum);
      
      console.log("todayfinishnum", this.todayfinishnum);



      if (this.todayfinishnum>0&&this.todaylistnum>0) {
        console.log("进行比较");
          for (let i=0; i < this.todaylistnum; i++) {
            for (let j=0; j < this.todayfinishnum; j++) {
              console.log("i",i)
              console.log("j",j)
              if (
                this.todaylist[i].detialtime==this.todayfinishlist[j].detialtime
              ) {
                console.log("从今日计划总删除今日已完成计划1");
                console.log(this.todaylist[i]);
                console.log("testlisy");
                console.log(this.testlist);
                console.log("todaylist");
                console.log(this.todaylist);
                for(let t=0;t<this.testlistnum;t++){
                  if(this.todaylist[i].detialtime=this.testlist[t].detialtime)
                     this.testlist.splice(t, 1);
                     this.testlistnum--;
                     break;
                };
              }
            }
          }
      }
      if(this.testlist==0){
        this.testlistnum=0;
      }
      this.todaylist=JSON.parse(JSON.stringify(this.testlist));
      this.todaylistnum=this.testlistnum;
      storage.set("todaylist", this.testlist);
      storage.set("todaylistnum", this.testlistnum);
      console.log("settestlist", this.testlist);
      this.onLoad();
    },
    //当天完成计划
    today_finshplan() {
      
        this.todayfinishlist = [];
      this.todayfinishnum = 0;
      storage.set("todayfinishlist", this.todayfinishlist);
      storage.set("todayfinishnum",this.todayfinishnum);
      

      var list = storage.get("finishlist");
      if (list) {
        this.finishlist = storage.get("finishlist");
        this.finishnum = storage.get("finishnum");
      }

      var today = this.date;


      for (let i = 0; i < this.finishnum; i++) {
        if (this.finishlist[i].finshtime == this.date) {
          this.todayfinishlist.push(this.finishlist[i]);
          this.todayfinishnum++;
        }
      }
      this.get_sort(this.todayfinishlist);
      storage.set("todayfinishlist", this.todayfinishlist);
      storage.set("todayfinishnum", this.todayfinishnum);
      this.finshonLoad();
    },

    //每日计划的完成
    every_finsh(index){
      this.clickplanshow=true;
      this.plannumber=index;
      this.MR=true;
      this.$store.commit("MR_planconfirm", this.MR);
    },

    //单击今日计划
    planclick(index) {
      this.clickplanshow = true;
      console.log(index);
      this.plannumber = index;
    },

    //得到当前时间精确到日
    date_get() {
      let date = new Date();
      console.log("lala" + date);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      // let s = date.getSeconds()
      if (m >= 1 && m <= 9) {
        m = `0${m}`;
      }
      if (d >= 1 && d <= 9) {
        d = `0${d}`;
      }
      let time = `${y}-${m}-${d}`;
      return time;
    },
    //得到当前时间精确到毫秒
    detial_time() {
      let date = new Date().getTime();
      return date;
    },

    //打卡计划完成
    daka_plan() {
//       var nowtime=this.date_get()
//       if(this.date!=nowtime){
//         console.log("当前无法打卡");
//         Dialog.alert({
//   message: '打卡失败',
// }).then(() => {
//   // on close
// });
        
//         return;
//       };
if(this.MR){
  console.log("打卡每日计划")

  var list_t=storage.get("everyfinshlist");
  if(list_t){
    this.everyfinshlist=storage.get("everyfinshlist");
    this.everyfinshnum=storage.get("everyfinshnum");
  }else{
    this.everyfinshlist=[];
    this.everyfinshnum=0;
  }
  let e_time=this.date;
  this.everyfinshlist.push({
    name:this.today_everylist[this.plannumber].name,
    CFway:this.today_everylist[this.plannumber].CFway,
    BeginTimeList:this.today_everylist[this.plannumber].BeginTimeList,
    EndTimeList:this.today_everylist[this.plannumber].EndTimeList,
    detialtime:this.today_everylist[this.plannumber].detialtime,
    finshtime:e_time,
  })

  this.everyfinshnum++;
  storage.set("everyfinshlist",this.everyfinshlist);
  storage.set("everyfinshnum",this.everyfinshnum);

  var list_ee=storage.get("everylist");
  if(list_ee){
    this.everylist=storage.get("everylist");
    this.everylistnum=storage.get("everylistnum");
    console.log(this.everylist);
    console.log(this.everylist[0].detialtime);
    for(let i=0;i<this.everylistnum;i++){
      console.log(i);
      console.log("e",this.everylist[i].detialtime);
      console.log("t",this.today_everylist[this.plannumber].detialtime);
      if(this.today_everylist[this.plannumber].detialtime==this.everylist[i].detialtime){
        this.everylist[i].DKday+=1;
        console.log("DKday",this.everylist[i].DKday)
        break;
      }
    }
    storage.set("everylist",this.everylist);
  }


  this.today_everyfinshplan();
  this.today_everyplan();
  this.MR=false;
  this.$store.commit("MR_planconfirm", this.MR);
}else{


      var list = storage.get("finishlist");
      if (list) {
        this.finishlist = storage.get("finishlist");
        this.finishnum = storage.get("finishnum");
      }else{
        this.finishlist=[];
        this.finishnum=0;
      }
      var tdlist=storage.get("todaylist");
      if(tdlist){
        this.todaylist=storage.get("todaylist");
        this.todaylistnum=storage.get("todaylistnum");
      }else{
        this.todaylist=[];
        this.todaylistnum=0;
      }
      let time = this.date;
      this.clickplanshow = false;
      console.log(this.valuename);
      console.log("this.date", this.date);
      //向完成计划的总表中添加
      this.finishlist.push({
        name: this.todaylist[this.plannumber].name,
        BeginTimeList: this.todaylist[this.plannumber].BeginTimeList,
        EndTimeList: this.todaylist[this.plannumber].EndTimeList,
        detialtime: this.todaylist[this.plannumber].detialtime,
        percentage: this.todaylist[this.plannumber].percentage,
        finshtime: time //完成计划时间
      });
      console.log("this.finishlist");
      this.finishnum++;
      this.get_sort(this.finishlist);
      storage.set("finishlist", this.finishlist);
      storage.set("finishnum", this.finishnum);
      this.DKifshort_plan();
      this.today_finshplan();
      this.today_plan();
}
    },
    DKifshort_plan() {
      console.log("判断当前打卡计划");
      //判断当前打卡的计划是否为短期计划
      var ba = this.todaylist[this.plannumber].BeginTimeList.split(" ");
      console.log("begin" + ba[0]);
      var ea = this.todaylist[this.plannumber].EndTimeList.split(" ");
      console.log("end" + ea[0]);
      if (ba[0] == ea[0]) {
        this.DKdel_shortplan();
      } else {
        this.DK_longplan();
      }
    },
    DK_longplan(){
      console.log("当前打卡计划是长期计划");
      var listd=storage.get("listdata");
      if(listd){
        this.listdata=storage.get("listdata");
        this.datalistnum=storage.get("datalistnum");
        for(let i=0;i<this.datalistnum;i++){
          if(this.todaylist[this.plannumber].detialtime==this.listdata[i].detialtime){
            console.log("增加pre")
            var ba=new Date(this.listdata[i].BeginTimeList).getTime();
            var ea=new Date(this.listdata[i].EndTimeList).getTime();
            console.log(ba,ea);
            var daynum=parseInt(Math.abs(ea-ba)/1000/60/60/24)+1;
            daynum+=1;
            var addpre=100/daynum;
            this.listdata[i].percentage+=addpre;
            storage.set("listdata",this.listdata);
            break;
          }
        }
      }else{
        console.log("error无长期计划")
      }
      
    },
    DKdel_shortplan() {
      console.log("当前打卡计划是短期计划");

      //从计划总表删除
      this.listdata = storage.get("listdata");
      this.datalistnum = storage.get("datalistnum");
      this.todaylist = storage.get("todaylist");
      this.todaylistnum = storage.get("todaylistnum");
      console.log("listdata");
      console.log(this.listdata);
      console.log("todaylist");
      console.log(this.todaylist);
      console.log("plannumber" + this.plannumber);
      for (let i = 0; i < this.datalistnum; i++) {
        if (
          this.listdata[i].detialtime ==
          this.todaylist[this.plannumber].detialtime
        ) {
          console.log("短期删除");
          this.listdata.splice(i, 1);
          this.datalistnum--;
          break;
        }
      }
      storage.set("listdata", this.listdata);
      storage.set("datalistnum", this.datalistnum);
    },
    //计时计划完成
    js_plan() {
      this.clickplanshow = false;
      this.show_js = true;
      this.$store.commit("plannum_index", this.plannumber);
      console.log("this.$store.state.plannum:" + this.$store.state.plannum);
    },
    //时间转换成毫秒再上传到store
    timeChange() {
      var hms = this.currentTime; // your input string
      console.log(this.currentTime);
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

    //长按修改计划的实现
    touchinUk(index) {
      console.log("长按" + index);
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.Loop = 0;
          this.changeplanshow(index);
        }.bind(this),
        1000
      );
    },

    cleartime(index) {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
      if (this.Loop != 0) {
        this.planclick(index);
      }
    },
     //每日计划长按修改
    MR_touchinUk(index) {
      console.log("长按" + index);
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.Loop = 0;
          this.MR_changeplanshow(index);
        }.bind(this),
        1000
      );
    },


    MR_cleartime(index) {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
      if (this.Loop != 0) {
        this.every_finsh(index);
      }
    },



    //修改计划显示
    changeplanshow(index) {
      this.showchange_plan = true;
      this.valuename = this.todaylist[index].name;
      this.BeginTimeValue = this.todaylist[index].BeginTimeList;
      this.EndTimeValue = this.todaylist[index].EndTimeList;
      this.CFvalue = this.todaylist[index].CFway;
      this.plannumber = index;
      this.changename = this.todaylist[index].name;
      this.changedetialtime = this.todaylist[index].detialtime;
      console.log(this.todaylist[index].detialtime);
    },


    MR_changeplanshow(index) {

      this.show2_choice();
      this.showchange_plan = true;
      this.valuename = this.today_everylist[index].name;
      this.BeginTimeValue = this.today_everylist[index].BeginTimeList;
      this.EndTimeValue = this.today_everylist[index].EndTimeList;
      this.CFvalue = this.today_everylist[index].CFway;
      this.plannumber = index;
      this.changename = this.today_everylist[index].name;
      this.changedetialtime = this.today_everylist[index].detialtime;
      console.log("cfway",this.today_everylist[index].CFway);
    },
    //修改计划从todaylist和datalist中删除对应项目再添加新的修改
    changeplan() {
      this.del_plan();
      this.addplan();
    },
    // 删除计划
    del_plan() {
      console.log("delete");
      console.log(this.changedetialtime);

      if(this.CFvalue==1){
        this.everylist=storage.get("everylist");
        this.everylistnum=storage.get("everylistnum");
        for(let j=0;j<this.everylistnum;j++){
          if(this.everylist[j].detialtime==this.changedetialtime){
            this.everylist.splice(j,1);
            this.everylistnum--;
            storage.set("everylist",this.everylist);
            storage.set("everylistnum",this.everylistnum);
            console.log("everylist");
            break;
          }
        }
        this.today_everylist.splice(this.plannumber,1);
        this.today_everynum--;

      }else{

      
      this.listdata = storage.get("listdata");
      this.datalistnum = storage.get("datalistnum");
      for (let i = 0; i < this.datalistnum; i++) {
        if (this.listdata[i].detialtime == this.changedetialtime) {
          this.listdata.splice(i, 1);
          this.datalistnum--;
          storage.set("listdata", this.listdata);
          storage.set("datalistnum", this.datalistnum);
          console.log("已从listdata删除");
          break;
        }
      }

      this.todaylist.splice(this.plannumber, 1);
      this.todaylistnum--;
      storage.set("todaylistnum", this.todaylistnum);
      }
      this.showchange_plan = false;
    },
    //
    js_goback() {
      this.MR=this.$store.state.MR_plan;
      console.log(this.MR)
      console.log("倒计时完成返回");
      this.$store.commit("changePlan_finsh", 0);
      console.log(
        "置0this.$store.state.plan_finsh:" + this.$store.state.plan_finsh
      );
      this.plannumber = this.$store.state.plannum;
      console.log("返回后plannumber:" + this.plannumber);
      this.daka_plan();


    }
  }
};
</script>