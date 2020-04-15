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
      <van-nav-bar title="长期">
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

          <!--新建长期计划动作面板-->
          <van-action-sheet
            v-model="showR"
            :actions="actions"
            cancel-text="确认"
            @cancel="onCancel"
            :style="{ height: '44%' }"
            description="新建长期计划"
          >
            <van-dropdown-menu overlay="false">
              <van-dropdown-item v-model="value" :options="option" />
            </van-dropdown-menu>

            <van-cell-group>
              <van-field v-model="value1_name" placeholder="请输入计划名" input-align="center" />
            </van-cell-group>

            <van-cell-group>
              <van-field v-model="value1_details" placeholder="请输入计划详情" input-align="center" />
            </van-cell-group>

            <!--计划持续时间选择-->
            <van-cell title="选择日期区间" :value="datavalue" @click="showdata = true">
              <template #icon>
                <van-icon name="calender-o" size="28px" />
              </template>
            </van-cell>
            <van-calendar
              v-model="showdata"
              type="range"
              @confirm="onConfirm"
              :style="{ height: '40%' }"
            />
          </van-action-sheet>
        </template>
      </van-nav-bar>
      <!--修改长期计划弹窗-->
      <van-action-sheet
        v-model="showXR"
        :actions="actions"
        cancel-text="确认"
        @cancel="onCancel"
        :style="{ height: '44%' }"
        description="修改长期计划"
      >
        <van-dropdown-menu overlay="false">
          <van-dropdown-item v-model="value" :options="option" />
        </van-dropdown-menu>

        <van-cell-group>
          <van-field v-model="value1_name" placeholder="请输入计划名" input-align="center" />
        </van-cell-group>

        <van-cell-group>
          <van-field v-model="value1_details" placeholder="请输入计划详情" input-align="center" />
        </van-cell-group>

        <!--计划持续时间选择-->
        <van-cell title="选择日期区间" :value="datavalue" @click="showdata = true">
          <template #icon>
            <van-icon name="calender-o" size="28px" />
          </template>
        </van-cell>
        <van-calendar
          v-model="showdata"
          type="range"
          @confirm="onConfirm"
          :style="{ height: '40%' }"
        />
      </van-action-sheet>

      <!--列表滑动显示计划-->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-swipe-cell v-for="(item,index) in list" :key="index">
            <van-card
              :thumb="item.img"
            >
              <!-- @click-thumb="Modify_plan" 修改计划选项暂时删除-->

              <!--标签-->
              <template #tag>
                <van-tag type="danger">{{item.tag}}</van-tag>
              </template>

              <template #title>
                <!--标题-->
                <header class="title_c">{{item.title}}</header>
              </template>

              <template #desc>
                <!--描述-->
                {{item.desc}}
              </template>


              <!-- 图片的获取还没想好 -->
              <!-- <template #thumb>
                <img
                 :v-for="(image,index) in imageList" :key="index"
                  v-lazy="image"
                   width="100%"
                  height="100%"
                  fit="cover"
                /> -->
                <!-- https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2775235769,229421951&fm=26&gp=0.jpg -->
              <!-- </template> -->


              <template #bottom>
                <van-progress :percentage=item.percentage stroke-width="5" />
              </template>

              <template #footer>
                {{item.List_datavalue}}日期
                <van-button size="small" @click="DK_plan(index)">打卡</van-button>
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" :style="{ height: '100%' }" @click="del_plan(index)"/>
            </template>
          </van-swipe-cell>
        </van-list>
    </div>
    <!-- <button @click="addist">add</button> -->
    <!-- <button @click="got">go</button> -->
  </div>
</template>

<style>
.bar_sty {
  background: #14c1bb;
}
.title_c {
  font-weight: bold;
}
</style>

<script>
import Vue from "vue";
import { Icon, Calendar } from "vant";
Vue.use(Calendar);
Vue.use(Icon);
import { Lazyload } from 'vant';

Vue.use(Lazyload);

export default {
  data() {
    return {
      //顶上弹出设置
      showR: false,
      showL: false,
      showXR: false,
      //上拉菜单设定
      value: 0,
      option: [
        { text: "学习", value: 0 },
        { text: "工作", value: 1 },
        { text: "运动", value: 2 },
        { text: "习惯", value: 3 },
        { text: "其他", value: 4 }
      ],
      value1_name: "",
      value1_details: "",
      value1_tag:"",

     //计算日期差
      daynum:0,
      Date1:0,
      Date2:0,
      testday:'',
      addpercentage:0,//增加的百分比

      //计划列表
      list: [
        {   
          tag: "学习",
          title: "背单词",
          desc: "每天50个",
          percentage:0,
          List_datavalue:'4/15-5/15',//日历时间区间
          img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2775235769,229421951&fm=26&gp=0.jpg",
        },
        {   
          tag: "运动",
          title: "俯卧撑",
          desc: "每天做5组一组30个",
          percentage:0,
          List_datavalue:'4/15-4/20',//日历时间区间
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586093636131&di=2ab32d0917bc1c7900b478e6107a4adf&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%3Dshijue1%2C0%2C0%2C294%2C40%2Fsign%3D31a14f2251b5c9ea76fe0ba0bd50dc75%2F14ce36d3d539b6003fc9769ee350352ac65cb797.jpg',
        },
        {   
          tag: "习惯",
          title: "写日记",
          desc: "在这里详细描述你的计划",
          percentage:0,
          List_datavalue:'4/15-6/15',//日历时间区间
          img:"http://img4.imgtn.bdimg.com/it/u=2695717903,3002449993&fm=26&gp=0.jpg",
        },
      ],
      loading: false,
      finished: false,
      refreshing: false,

      listnum: 0,

      //日历数据
      showdata: false,
      datavalue: "",

      //图片列表暂时用不上
      imageList: [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2775235769,229421951&fm=26&gp=0.jpg',
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    };
  },

  methods: {
    showRight() {
      this.showR = true;
    },
    showLeft() {
      this.showL = true;
    },
    hideshwoleft() {
      this.showL = false;
    },
    //日历函数
    formatDate(datavalue) {
      return `${datavalue.getMonth() + 1}/${datavalue.getDate()}`;
    },

    onConfirm(datavalue) {
      const [start, end] = datavalue;
      this.showdata = false;
      this.datavalue = `${this.formatDate(start)}-${this.formatDate(end)}`;
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

    //列表函数
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (
          let i = 0;
          i < this.listnum && this.list.length < this.listnum;
          i++
        ) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= this.listnum) {
          this.finished = true;
        }
      }, 1000);
    },



    // onRefresh() {
    //   // 清空列表数据
    //   this.finished = false;

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true;
    //   this.onLoad();
    // },

    // Modify_plan() {
    //   this.showXR = true;
    // },


    //新建计划函数
    //确认计划
    onCancel() {
      this.show = false;
      this.listnum = this.listnum + 1;
      //   this.$toast(this.listnum);
      this.change_tag();
      this.list.push({title:this.value1_name,
      desc:this.value1_details,
      tag:this.value1_tag,
      percentage:0,
      List_datavalue:this.datavalue,
      img:'https://img.yzcdn.cn/vant/leaf.jpg'}),
      this.daychanget();
      this.value1_tag='';
    },
    //根据value值确定类别
    change_tag(){
      if(this.value==0)
        this.value1_tag="学习";
      if(this.value==1)
        this.value1_tag="工作";
      if(this.value==2)
        this.value1_tag="运动";
      if(this.value==3)
        this.value1_tag="习惯";
      if(this.value==4)
        this.value1_tag="其他"; 
    },
    // got(){
    //   this.$router.push({path:'/test'})
    // }
   del_plan(index){
     this.list.splice(index,1);
     this.listnum--;
   },

   DK_plan(index){
     let item=this.list[index];
     this.daychange(index);
     var num=100/this.daynum;
     console.log(num);
     this.addpercentage=num;
     
     item.percentage+=this.addpercentage;
     if(item.percentage>=100){
       this.del_plan(index);
       this.$toast("本项计划已完成");
     };
     item.percentage=item.percentage.toFixed(2);
     item.percentage=parseFloat(item.percentage);
   },


  //日期算天数
   daychange(index){
     let item=this.list[index];
     var day=item.List_datavalue;
     var a=day.split(/[/]|-/);  
     console.log(a[3]);
     this.Date1=new Date("2020",a[0]-1,a[1]).getTime();
     this.Date2=new Date("2020",a[2]-1,a[3]).getTime();
     this.daynum=parseInt(Math.abs(this.Date1-this.Date2)/1000/60/60/24)+1;
    //  this.$toast(this.daynum);
    },

   //计算日期差
  //  daychanget(){
  //    var day=this.datavalue;
  //    var a=day.split(/[/]|-/);  
  //   //  console.log(a[3]);
  //   this.Date1=new Date("2020",a[0]-1,a[1]).getTime();
  //   this.Date2=new Date("2020",a[2]-1,a[3]).getTime();
  //    console.log(this.Date1);
  //    console.log(this.Date2);
  //    this.daynum=parseInt(Math.abs(this.Date1-this.Date2)/1000/60/60/24)+1;
  //    this.$toast(this.daynum);
  //   },
  }
};
</script>