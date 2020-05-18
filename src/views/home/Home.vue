<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">导航栏</div>
    </nav-bar>

    <h1>首页</h1>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'

export default {
  name: 'home',
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components:{
    NavBar
  },
  created(){
    getHomeMultidata().then( res => {
      // console.log(res)
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
  }
}
</script>

<style>
  .home-nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }
</style>