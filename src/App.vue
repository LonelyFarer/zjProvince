<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="less">
@media screen and (max-width: 1024px) {
  html {
    font-size: 75px;
  }
}

@media screen and (min-width: 1025px) and (max-width: 1366px) {
  html {
    /* font-size: 87.5px; */
    font-size: 81.25px; /*13px*/
  }
}

@media screen and (min-width: 1367px) {
  html {
    font-size: 100px;
  }
}

@w: 1920;
@h: 1080;

.wCalc(@width) {
  width: calc(@width / @w * 100vw);
}
.hCalc(@height) {
  height: calc(@height / @h * 100vh);
}
.lhCalc(@height) {
  line-height: calc(@height / @h * 100vh);
}
.pCalc(@t, @r, @b, @l) {
  box-sizing: border-box;
  padding: calc(@t / @h * 100vh) calc(@r / @w * 100vw) calc(@b / @h * 100vh)
    calc(@l / @w * 100vw);
}
.mCalc(@t, @r, @b, @l) {
  margin: calc(@t / @h * 100vh) calc(@r / @w * 100vw) calc(@b / @h * 100vh)
    calc(@l / @w * 100vw);
}
// .fCalc(@s) {
//     font-size: calc(@s / @w * 100vw);
// }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 0.16rem;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  height: 100%;
  width: 100%;
}
ul {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.flex-column-space {
  display: flex;
  display: -ms-flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
.flex-row-space {
  display: flex;
  display: -ms-flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  flex-direction: row;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  align-content: space-between;
  -webkit-align-items: center;
}
.flex-row-center {
  display: flex;
  display: -ms-flex;
  display: -webkit-flex;
  flex-direction: row;
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
}
.flex-column-center {
  display: flex;
  display: -ms-flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
}
.amap-logo {
  display: none !important;
}
</style>
