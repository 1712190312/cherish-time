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

        <van-button round plain type="info" size="large" @click="del_plan">删除计划</van-button>
      </div>
    </van-popup>

    <!-- 顶部 -->
    <div>
      <van-nav-bar title="长期待办" @click-right="onClickRight">
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



     <!-- 长期待办列表列表 -->
    <div>
        <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
          <div
            v-for="(item,index) in longlist"
            :key="index"
            @click="changeplanshow(index)"
          >
            <van-cell >
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
              <template #right-icon>
                <van-circle v-model="item.percentage" :rate="item.percentage" :speed="50" :text="text(index)"  size="40">
                </van-circle>
              </template>
            </van-cell>
          </div>
        </van-list>
    </div>

    
  </div>
</template>

<style>
</style>

<script>
import storage from "../store/listfucton.js";
import Vue from "vue";
import { Col, Row } from "vant";
Vue.use(Col);
Vue.use(Row);

export default {
  data() {
    return {
      //进度条
      currentRate:0,
      //个人界面
      showL:false,
      //修改计划
      showchange_plan: false,
      plannumber: 0,
      changename: "",
    
      //全天非全天计划显示
      Fqt_show: true,
      Qt_show: false,
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
      checked: false,
      showright: false,
   
      
      //时间选择
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
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
      
      //长期计划
      longlist:[],
      longlistnum:0,
      loading:false,
      finished:false,
    };
  },

  created() {
    this.date = this.date_get();
    this.getTime();
     this.get_listdata();

    // this.get_shortlist();
    this.get_longlist();
  },
  mounted() {
    this.get_listdata();

    // this.get_shortlist();
    this.get_longlist();
    
  },
  // computed: {
  //   text() {
  //     console.log("执行次数");
  //     return this.currentRate.toFixed(0) + '%';
  //   },
  // },
  methods: {
    //进度条

    text(index) {
      console.log("执行次数");
      return this.longlist[index].percentage.toFixed(0) + '%';
    },


  //列表排序
  get_sort(list){
    list.sort(function(a, b) {
      return a.BeginTimeList > b.BeginTimeList;
    });
  },
  //获取计划总表
  get_listdata(){
    var list = storage.get("listdata");
    if (list) {
      this.listdata = list;
      this.datalistnum = storage.get("datalistnum");
    }
  },

   //获取长期计划
   get_longlist(){
     this.longlist=[];
     this.longlistnum=0;
     //从计划总表listdata获取
     if(this.datalistnum!=0){
       for(let i=0;i<this.datalistnum;i++){
         var ba=this.listdata[i].BeginTimeList.split(" ");
         var ea=this.listdata[i].EndTimeList.split(" ");
         var now=this.date_get();
         //长期计划持续时间超过一天且截至时间不在过去
         if(ba[0]!=ea[0]&&ea[0]>=now){
           this.longlist.push(this.listdata[i]);
           this.longlistnum++;
          }
       }
     };
     this.get_sort(this.longlist);
     console.log(this.longlist);
     console.log("长期待办计划数"+this.longlistnum);

   },

    // 预约待办计划列表
    onLoad() {
      //重新获取一遍shortlist数据
      // var list=storage.get("shortlist");
      // if(list){
      //   this.shortlist=list;
      //   this.shortlistnum=storage.get("shortlistnum");
      // };
      
      setTimeout(() => {
        for (
          let i = 0;
          i < this.longlistnum && this.longlist.length < this.longlistnum;
          i++
        ) {
          this.longlist.push(this.longlist.length + 1);
        }
        this.loading = false;

        if (this.longlist.length >= this.longlistnum) {
          this.finished = true;
        }
      }, 1000);
    },
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
    GoDetials(){
      this.$router.push({ path: "/Details" });
    },
    GoPlanQ(){
       this.$router.push({ path: "/PlanQ" });
    },
    GoMylc(){
      this.$router.push({ path: "/mylc" });
    },
    GoNc(){
       this.$router.push({ path: "/threeView" }); 
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

    //点击函数
    onClickRight() {
      this.showright = true;
      this.getTime();
      this.CFvalue = 0;
    },
    outadd() {
      this.showright = false;
      this.showchange_plan = false;
    },

    //开始结束时间选择
    BeginChoiceTime() {
      this.Begin_End = 0;
      this.text_name = "开始时间";
      if (this.checked == false) {
        this.showFQT = true;
      } else {
        this.showQT = true;
      }
    },
    EndChoiceTime() {
      this.Begin_End = 1;
      this.text_name = "结束时间";
      if (this.checked == false) {
        this.showFQT = true;
      } else {
        this.showQT = true;
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
      if (this.checked == false) {
        this.showFQT = false;
      } else {
        this.showQT = false;
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
    },
    show3_choice() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.CFshow = false;
      this.CF_choice = "每周(周一至周五)";
      this.CFvalue = 2;
    },

    //全天计划
    QTchange() {
      console.log(this.checked);
      if (this.checked == false) {
        this.getTime();
        this.Fqt_show = true;
        this.Qt_show = false;
      } else {
        this.QT_getTime();
        this.Fqt_show = false;
        this.Qt_show = true;
      }
    },
    //添加计划
    addplan() {
      console.log(1);
      this.listdata.push({
        name: this.valuename,
        BeginTimeList: this.BeginTimeValue,
        EndTimeList: this.EndTimeValue,
        CFway: this.CFvalue,
        detialtime:this.detial_time(),
        percentage:0,//用于长期计划的进度显示
      });
      storage.set("listdata", this.listdata);
      this.showright = false;
      this.datalistnum++;
      storage.set("datalistnum", this.datalistnum);
    
      this.get_listdata();
      this.get_longlist();
      this.onLoad();
    },

   //修改计划

  //修改计划显示
  changeplanshow(index) {
      this.showchange_plan = true;
      this.valuename = this.shortlist[index].name;
      this.BeginTimeValue = this.shortlist[index].BeginTimeList;
      this.EndTimeValue = this.shortlist[index].EndTimeList;
      this.CFvalue = this.shortlist[index].CFway;
      this.plannumber = index;
      this.changename = this.shortlist[index].name;
      this.changedetialtime=this.shortlist[index].detialtime;
      console.log(this.changedetialtime);
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
      this.listdata = storage.get("listdata");
      this.datalistnum = storage.get("datalistnum");
      for (let i = 0; i < this.datalistnum; i++) {
        if (this.listdata[i].detialtime == this.changedetialtime) {
          this.listdata.splice(i, 1);
          this.datalistnum--;
          i--;
          console.log("已从listdata删除");
        }
      };
      storage.set("listdata", this.listdata);
      storage.set("datalistnum", this.datalistnum);
      this.get_longlist();
      this.onLoad();
     
      this.showchange_plan = false;
    },
    //得到当前时间精确到日
    date_get(){
     let date = new Date();
     console.log("获取当前时间:"+date);
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
    detial_time(){
      let date=new Date();
      return date;
    },
    
  }
};
</script>