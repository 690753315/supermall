<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">导航栏</div>
    </nav-bar>

    <scroll class="scroll">
      <!-- 用props 父组件给子组件动态传值 -->
      <home-swiper :banners="banners"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <!-- @itemClick="itemClick" 要写在对应的tab-control标签上， 不能写到其他标签上(比如说goods-list) -->
      <tab-control :titles="tabControlTitles" @itemClick="itemClick"></tab-control>

      <!-- 传递要显示的商品列表的数据给子组件 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

  </div>
</template>

<script>
  // 导航栏
  import NavBar from 'components/common/navbar/NavBar'

  // 轮播
  import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
  // 推荐
  import RecommendView from 'views/home/childComps/RecommendView.vue'
  // 本周流行
  import FeatureView from 'views/home/childComps/FeatureView.vue'
  // 流行、新款、精选 按钮
  import TabControl from 'components/content/tabControl/TabControl'

  // 商品列表
  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  // 网络请求
  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: 'home',
    data() {
      return {
        banners: [],
        recommends: [],
        // tabControl组件要显示的titles
        tabControlTitles: ['流行', '新款', '精选'],
        // 商品列表数据
        goods: {
          // 流行
          pop: {
            page: 0,
            list: []
          },
          // 新款
          new: {
            page: 0,
            list: []
          },
          // 精选
          sell: {
            page: 0,
            list: []
          },
        },
        // 当前tabControl显示的类型
        currentType: 'pop'
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    computed:{
      // tabControl显示的类型改变时
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 为了简化created()里面的代码，把请求放到methods里进行，在created里面调用方法
      this.getHomeMultidata()

      // 初始化请求商品列表数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /*
        下面是网络请求的相关方法
      */
      // 获取banners和recommends数据
      getHomeMultidata(){
        getHomeMultidata().then( res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      // 获取商品列表数据
      getHomeGoods(type){
        const page = ++this.goods[type].page
        getHomeGoods(type, page).then( res => {
          this.goods[type].list.push(...res.data.data.list)
        })
      },

      /*
        下面是事件监听的相关方法
      */
      // tabControl点击时，获取点击的type
      itemClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      }
    }
  }
</script>

<style>
  #home{
    padding-top: var(--nav-bar-height);
    /* tab-bar高度加上tab-bar的box-shadow高度，不设置商品列表的底部会被tab-bar挡住 */
    padding-bottom: calc( var(--tab-bar-height) + 3px);

    position: relative;

    height: 100vh;
  }

  .home-nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);

    /* 将导航栏固定在顶部 */
    position: fixed;
    top: 0;
    /* 设置宽度100% */
    left: 0;
    right: 0;

    z-index: 9;
  }

  .scroll{
    position: absolute;
    /* top: 44px;
    bottom: 49px;

    left: 0;
    right: 0; */
  }
</style>