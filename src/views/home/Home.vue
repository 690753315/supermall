<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">导航栏</div>
    </nav-bar>

    <!-- 注意prop的大小写问题，不要用驼峰 -->
    <scroll class="scroll" ref="scroll"
      :probe-type="3" @scroll="scroll"
      :pull-up-load="true" @pullingUp="pullingUp"
    >
      <!-- 用props 父组件给子组件动态传值 -->
      <home-swiper :banners="banners"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <!-- @itemClick="itemClick" 要写在对应的tab-control标签上， 不能写到其他标签上(比如说goods-list) -->
      <tab-control :titles="tabControlTitles" @itemClick="itemClick"></tab-control>

      <!-- 传递要显示的商品列表的数据给子组件 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- native是事件修饰符 监听组件根元素的原生事件  没加native @click无效 -->
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>

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
  // 滚动
  import Scroll from 'components/common/scroll/Scroll'
  // 回顶部按钮
  import BackTop from 'components/content/backTop/BackTop'
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
        currentType: 'pop',
        // 控制backTop组件的显示和隐藏
        isBackTopShow: false,

      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
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
    mounted(){
      // 监听图片加载完成
      /* 因为有用到$refs获取DOM元素的内容,
      所以必须放在mounted里，created里组件还未挂载到页面上 */
      // 组件之间使用this.$bus.$on传值之前需要先this.$bus.$off注销事件
      this.$bus.$off(event).$on('imageLoad', () => {
        // console.log(this.$refs.scroll.refresh)
        this.$refs.scroll.refresh()
        console.log('图片加载完成z')
      })
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

          // 加个定时器，防止一直上拉加载。至少1秒才能进行一次上拉加载
          setTimeout(() => {
          // 加载完更多后要执行Scroll.finishPullUp()，不然只能进行一次上拉操作
            this.$refs.scroll.finishPullUp()
          }, 1000)

          // 数据变多，content高度更新了，重新计算this.$refs.scroll.scrollerHeight的高度
          this.$refs.scroll.refresh()
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
      },
      // 点击回顶部按钮
      backClick(){
        // 不知道是什么原因，电脑端的手机模式用鼠标滚轮滑下去后点击没反应
        // 要用鼠标模拟手机下滑页面后 点击才有效果
        // 不是已经兼容PC端了吗
        this.$refs.scroll.backTop(0, 0, 300 )
      },
      // 接受Scroll的滚动事件
      scroll(position){
        // console.log(position)
        /* 向下滑，position.y小于0，
          所以滚动距离当超过1000时为 position.y< -1000
        */
        this.isBackTopShow = (position.y < -1000)
      },
      // 接受Scroll的上拉事件
      pullingUp(){
        // console.log('上拉')
        // 加载更多
        this.getHomeGoods(this.currentType)
      }
    }
  }
</script>

<style>
  #home{
    padding-top: var(--nav-bar-height);
    /* tab-bar高度加上tab-bar的box-shadow高度，不设置商品列表的底部会被tab-bar挡住 */
    padding-bottom: calc( var(--tab-bar-height) + 3px);
    /* 方法1  父级相对定位
      .scroll绝对定位 top bottom 设置滚动的高度
     */
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
    /* 方法1  父级相对定位
      .scroll绝对定位 top bottom 设置滚动的高度
     */
    position: absolute;
    top: var(--nav-bar-height);
    bottom: var(--tab-bar-height);
    /* 设置宽度100% */
    left: 0;
    right: 0;
    /* 方法2  用calc  100vh - navbar高度 - tabbar高度 */
    /* height: calc( 100vh - var(--nav-bar-height) - var(--tab-bar-height) ); */
  }
</style>