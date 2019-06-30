<template>
  <div id="app">
    <h1>App组件</h1>
    <img class="logo" src="./assets/images/logo.png" alt="logo">
    <div>
      <router-link to="/a">A路由</router-link>
      &nbsp;&nbsp;&nbsp;
      <router-link to="/b">B路由</router-link>
    </div>
    <hr>
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    padding 10px
    h1
      color red
    .logo
      width 100px
      height 100px
    
</style>
