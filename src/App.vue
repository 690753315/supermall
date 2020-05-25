<template>
  <div>
    <keep-alive>
      <!-- 路由显示的位置 -->
      <router-view></router-view>
    </keep-alive>


    <!-- tabbar的内容 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 导入tabbar组件
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
  /* 在style里导入css文件 */
  @import "assets/css/base.css"
</style>