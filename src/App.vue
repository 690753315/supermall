<template>
  <div>
    <!-- 因为在首页点击商品 进入详情页后 返回到首页 再次点击其他商品
    要让商品里面的内容改变 所有Detail销毁再创建 所以要排除 -->
    <keep-alive exclude="Detail">
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