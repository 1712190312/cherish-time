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

          <!--新建长期计划上拉菜单-->
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
              <van-field v-model="value1" placeholder="请输入计划名" input-align="center" />
            </van-cell-group>


            <van-cell-group>
              <van-field v-model="value1" placeholder="请输入计划详情" input-align="center" />
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
              <van-field v-model="value1" placeholder="请输入计划名" input-align="center" />
            </van-cell-group>


            <van-cell-group>
              <van-field v-model="value1" placeholder="请输入计划详情" input-align="center" />
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
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-swipe-cell v-for="item in list" :key="item">
            <van-card
              tag="学习"
              desc="30个（这里详细描述自己的计划）"
              title="每天背单词"
              thumb="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2775235769,229421951&fm=26&gp=0.jpg"
              @click-thumb="Modify_plan"
            >
              <template #bottom>
                <van-progress :percentage="50" stroke-width="5" />
              </template>
              <template #footer>
                <van-button size="small">打卡</van-button>
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" :style="{ height: '100%' }" />
            </template>
          </van-swipe-cell>
          <van-swipe-cell v-for="item in list" :key="item">
            <van-card
              tag="运动"
              desc="30个"
              title="俯卧撑"
              thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586093636131&di=2ab32d0917bc1c7900b478e6107a4adf&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%3Dshijue1%2C0%2C0%2C294%2C40%2Fsign%3D31a14f2251b5c9ea76fe0ba0bd50dc75%2F14ce36d3d539b6003fc9769ee350352ac65cb797.jpg"
              @click-thumb="Modify_plan"
            >
              <template #bottom>
                <van-progress :percentage="50" stroke-width="5" />
              </template>
              <template #footer>
                <van-button size="small">打卡</van-button>
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" :style="{ height: '100%' }" />
            </template>
          </van-swipe-cell>

          <van-swipe-cell v-for="item in list" :key="item">
            <van-card
              tag="习惯"
              desc="一幅"
              title="画画"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              @click-thumb="Modify_plan"
            >
              <template #bottom>
                <van-progress :percentage="50" stroke-width="5" />
              </template>
              <template #footer>
                <van-button size="small">打卡</van-button>
              </template>
            </van-card>
            <template #right>
              <van-button square text="删除" type="danger" :style="{ height: '100%' }" />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    
  </div>
</template>

<style>
.bar_sty {
  background: #14c1bb;
}
</style>

<script>
import Vue from "vue";
import { Icon, Calendar } from "vant";
Vue.use(Calendar);
Vue.use(Icon);

export default {
  data() {
    return {
      //顶上弹出设置
      showR: false,
      showL: false,
      showXR:false,
      //上拉菜单设定
      value: 0,
      option: [
        { text: "学习", value: 0 },
        { text: "工作", value: 1 },
        { text: "运动", value: 2 },
        { text: "习惯", value: 3 },
        { text: "其他", value: 4 }
      ],
      value1: "",

      //计划列表
      list: [],
      loading: false,
      finished: false,
      refreshing: false,

      //日历数据
      showdata: false,
      datavalue: ""
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
      this.datavalue = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    //个人信息页的跳转
    GoSetting() {
      this.$router.push({ path: "/setting" });
    },
    GoGood() {
      this.$router.push({ path: "/good" });
    },
    //列表函数
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 2; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 2) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    Modify_plan() {
      this.showXR = true;
    }
  }
};
</script>