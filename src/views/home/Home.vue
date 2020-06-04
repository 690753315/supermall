<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">导航栏</div>
    </nav-bar>

    <!--
      复制一份tab-control放在这里，用于做tabControl的吸顶效果
      固定在顶部，不随滚动条滚动，所以放scroll外面。
      ref="xxxx" xxxx好像可以随意命名 不一定要用对应组件的变量名
      这里默认隐藏，当下面的TabControl滑动到顶部时，让下面的TabControl继续随滚动条移动上去，
      这里的TabControl1则显示固定在顶部，使页面看起来就像是tabControl2固定在顶部一样
    -->
      <tab-control :titles="tabControlTitles"
        @itemClick="itemClick"
        ref="tabControl1"
        class="tab-control-fixed"
        v-show="isTabControlFixed">
      ></tab-control>

    <!-- 注意prop的大小写问题，不要用驼峰 -->
    <scroll class="scroll" ref="scroll"
      :probe-type="3" @scroll="scroll"
      :pull-up-load="true" @pullingUp="pullingUp"
    >

      <!-- 用props 父组件给子组件动态传值 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <!-- @itemClick="itemClick" 要写在对应的tab-control标签上， 不能写到其他标签上(比如说goods-list) -->
      <tab-control :titles="tabControlTitles"
        @itemClick="itemClick"
        ref="tabControl2"
      ></tab-control>

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
  // 共通的方法：防抖函数
  import {debounce} from 'common/utils'
  // 混入
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

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
        // TabControl到顶部的距离
        taboffsetTop: 0,
        // TabControl是否固定在顶部
        isTabControlFixed: false,
        // Home组件离开时，滚动条的位置
        saveY: 0,

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

    },
    // 组件活跃时
    activated() {
      // 活跃时滚动条回到记录的位置
      this.$refs.scroll.backTop(0, this.saveY, 0)
      // 滚动后最好刷新下，不然可能会莫名其妙回到顶部
      this.$refs.scroll.refresh()
    },
    // 组件不活跃时
    deactivated() {
      // 不活跃时记录滚动条的位置
      this.saveY = this.$refs.scroll.getScrollY()

      this.$bus.$off('imageLoad', this.itemImgListener)
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
        // 使两个TabControl组件当前高亮的类型一样
        this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index
      },
      // 接受Scroll的滚动事件
      scroll(position){
        // console.log(position)

        /*
        判断backTop是否显示
        向下滑，position.y小于0，
          所以滚动距离当超过1000时为 position.y< -1000
        */
        this.isBackTopShow = (position.y < -1000)

        this.listenShowBackTop(positionY)

      },
      // 接受Scroll的上拉事件
      pullingUp(){
        // console.log('上拉')
        // 加载更多
        this.getHomeGoods(this.currentType)
      },
      // banner 至少一张加载完成
      swiperImageLoad(){
        // .$el 获取当前组件的$el属性， 也就是当前组件对应的DOM对象
        // offsetTop 元素距离顶部的距离
        /* 初始化化，TabControl上方的banner还未加载完成
        (RecommendView和FeatureView的图片比较小张，这里忽略)，
        这时获取的TabControl的offsetTop是不准确的
        所以要判断banner的图片至少有一张加载完成
        */
        this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log( this.$refs.tabControl2.$el.offsetTop )
      }
    },
    mixins: [itemListenerMixin]
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

  /* TabControl 到顶端的时候，显示scroll外面的TabControl */
  .tab-control-fixed{
    position: absolute;
    top: var(--nav-bar-height);
    left: 0;
    right: 0;
    z-index: 9;
    background-color: var(--color-background);
  }

</style>