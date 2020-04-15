<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
name: "App";
export default {
  create() {
    //   在页面加载时读取sessionStorage里的状态信息

    if (sessionStorage.getItem("state")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("state"))
        )
      );
    }

    //   页面刷新时将state数据存储到sessionStorage中

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    });
  }
};
</script>
