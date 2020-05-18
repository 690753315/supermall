<template>
  <tab-bar>
    <!-- 在父组件里使用子组件，并设置子组件的静态props，不需要父子组件传值没用到动态props -->
    <!-- 第一个prop为活跃时的路由path， 第二个为活跃时的字体颜色 -->
    <tab-bar-item path="/home" activeColor="lightBlue">
      <!-- 因为已经在webpack.base.conf.js里设置了别名，template通过 ~加别名的形式组成绝对路径 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="Green">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="#cdc">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'mainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>