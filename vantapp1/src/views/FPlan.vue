<template>
    <div class="body">
        <van-nav-bar
            title="好友打卡生涯"
            left-arrow
            @click-left="backmyf"
        />
        <div class="cardtop">
          <van-card
            title="用户名"
            centered
          >
          <template #thumb>
                  <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
         </template>
          </van-card>
        </div>
        
        <div style="height:15px;"></div>

            <van-panel title="2020/03/12" icon="flower-o">  
            
                <van-steps direction="vertical" :active="0">
                    <van-step>
                        <h4>跑步</h4>
                        <p>2020-03-12 07:00</p>
                    </van-step>
                    <van-step>
                        <h4>背单词</h4>
                        <p>2020-03-12 08:00</p>
                    </van-step>
                    <van-step>
                        <h4>写作业</h4>
                        <p>2020-03-12 09:00</p>
                    </van-step>
                    <van-step>
                        <h4>睡觉</h4>
                        <p>2020-03-12 22:00</p>
                    </van-step>
                </van-steps>

            </van-panel> 

             <van-panel title="2020/03/10" icon="flower-o">  
            
                <van-steps direction="vertical" :active="0">
                    <van-step>
                        <h4>跑步</h4>
                        <p>2020-03-12 07:00</p>
                    </van-step>
                    <van-step>
                        <h4>背单词</h4>
                        <p>2020-03-12 08:00</p>
                    </van-step>
                    <van-step>
                        <h4>写作业</h4>
                        <p>2020-03-12 09:00</p>
                    </van-step>
                    <van-step>
                        <h4>睡觉</h4>
                        <p>2020-03-12 22:00</p>
                    </van-step>
                </van-steps>

            </van-panel> 

            <van-panel title="2020/03/12" icon="flower-o">  
            
                <van-steps direction="vertical" :active="0">
                    <van-step>
                        <h4>跑步</h4>
                        <p>2020-03-12 07:00</p>
                    </van-step>
                    <van-step>
                        <h4>背单词</h4>
                        <p>2020-03-12 08:00</p>
                    </van-step>
                    <van-step>
                        <h4>写作业</h4>
                        <p>2020-03-12 09:00</p>
                    </van-step>
                    <van-step>
                        <h4>睡觉</h4>
                        <p>2020-03-12 22:00</p>
                    </van-step>
                </van-steps>

            </van-panel> 
       
    </div>
</template>

<script>
export default {
    data(){
        return{
            headerimg:require('../assets/2.png')
        }
    },

    methods:{
        backmyf(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>