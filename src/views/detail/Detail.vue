<template>
  <div id="detail">
    <!-- 注意props命名 -->
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick"  ref="DetailNavBar"/>
    <!-- 一定要设置可滚动的高度，不然不能滚动 -->
    <scroll class="scroll" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="DetailParamInfo" :param-info="paramInfo"/>
      <detail-comment-info ref="DetailCommentInfo" :comment-info="commentInfo" />
      <goods-list ref="GoodsList" :goods="recommends"/>
    </scroll>

    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

    <!-- native是事件修饰符 监听组件根元素的原生事件  没加native @click无效 -->
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
// 导航栏
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  // 轮播图
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  // 基本信息
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  // 店铺信息
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
  // better-scroll
  import Scroll from 'components/common/scroll/Scroll'
  // 商品详细数据
  import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
  // 商品参数
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
  // 评论
  import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
  // 商品推荐列表
  import GoodsList from 'components/content/goods/GoodsList'
  // 防抖函数
  import {debounce} from 'common/utils'
  // 混入
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  // 底部工具栏
  import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'

  // 网络请求详情页数据  详情页商品基本信息类 店铺信息类 商品详细数据类 商品参数类 网络请求商品推荐数据
  import {getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

export default {
  name: "Detail",
  data(){
    return {
      id: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
    }
  },
  created(){
    // 获取商品的id
    this.id = this.$route.params.id
    // 获取详情页数据
    this.getDetail(this.id)
    // 获取商品推荐数据
    this.getRecommend()

    /**标题与内容联动效果
      将debounce的回调函数赋值给this.getThemeTopYs，所以this.getThemeTopYs是个函数，但并未执行，
      this.getThemeTopYs() 这样才是执行函数,这里相当于定义this.getThemeTopYs这个函数而已，所以this.$refs在这里没有执行
    */
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [0]
      this.themeTopYs.push(this.$refs.DetailParamInfo.$el.offsetTop)
      this.themeTopYs.push(this.$refs.DetailCommentInfo.$el.offsetTop)
      this.themeTopYs.push(this.$refs.GoodsList.$el.offsetTop)

      this.themeTopYs.push(Number.MAX_VALUE)

      console.log(this.$refs.DetailParamInfo.$el.offsetTop)
    }, 100)
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  methods:{
    // 网络请求
    // 获取详情页数据
    getDetail(id){
      getDetail(id).then( res=>{
        // console.log(res)

        const data = res.data.result
        // 轮播图
        this.topImages = data.itemInfo.topImages
        // 商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 店铺信息
        this.shop = new Shop(data.shopInfo)
        // 商品详细数据
        this.detailInfo = data.detailInfo
        // 商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 评论
        if ( data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        // 使用this.$nextTick 虽然能获取值，但是图片还是没加载完成，获取到的值不对
        // this.$nextTick(()=>{
        //   this.themeTopYs = [0]
        //   console.log(this.$refs.DetailParamInfo.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.DetailParamInfo.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.DetailCommentInfo.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.GoodsList.$el.offsetTop)
        // })

      })
    },
    // 获取详情页商品推荐数据
    getRecommend(){
      getRecommend().then( res => {
        this.recommends = res.data.data.list
      })
    },


    // 事件
    // 商品详细数据的所有图片加载完成
    imageLoad(){
      // 重新获取content高度
      // console.log('刷新')
      this.$refs.scroll.refresh()

      // 获取各个标题对应内容的高度
      this.getThemeTopYs()
    },
    // 点击标题，滚动到标题对应内容的位置
    titleClick(index){
      this.$refs.scroll.backTop(0, -this.themeTopYs[index], 500)
    },
    // 滚动
    scroll(position){
      const positionY = -position.y

      // 方法1
      // if  ( this.$refs.DetailNavBar.currentIndex !== 0 && (this.themeTopYs[0] <= positionY && positionY < this.themeTopYs[1]) ){
      //   console.log(0)
      //   this.$refs.DetailNavBar.currentIndex = 0
      // } else if  ( this.$refs.DetailNavBar.currentIndex !== 1 && (this.themeTopYs[1] <= positionY && positionY < this.themeTopYs[2]) ){
      //   console.log(1)
      //   this.$refs.DetailNavBar.currentIndex = 1
      // } else if  ( this.$refs.DetailNavBar.currentIndex !== 2 && (this.themeTopYs[2] <= positionY && positionY < this.themeTopYs[3]) ){
      //   console.log(2)
      //   this.$refs.DetailNavBar.currentIndex = 2
      // } else if ( (this.$refs.DetailNavBar.currentIndex !== 3) && ( this.themeTopYs[3] <= positionY ) ){
      //   console.log(3)
      //   this.$refs.DetailNavBar.currentIndex = 3
      // }

      // 方法2
      // let length = this.themeTopYs.length
      // for (let i in this.themeTopYs){
      //   i = parseInt(i)
      //   if (
      //     (this.$refs.DetailNavBar.currentIndex !== i) &&
      //     ( (i<length-1) && (this.themeTopYs[i] <= positionY) && (positionY < this.themeTopYs[i+1]) ||
      //     (i===length-1) && (this.themeTopYs[i] <= positionY) )
      //   ){
      //     console.log(i)
      //     this.$refs.DetailNavBar.currentIndex = i
      //   }
      // }

      // 方法3
      let length = this.themeTopYs.length
      for (let i in this.themeTopYs){
        i = parseInt(i)
        if ( (this.$refs.DetailNavBar.currentIndex !== i) && (this.themeTopYs[i] <= positionY) && (positionY < this.themeTopYs[i+1]) ){
          this.$refs.DetailNavBar.currentIndex = i
        }
      }

      this.listenShowBackTop(positionY)
    },
    // 加入购物车
    addToCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.id

      console.log( product )

      this.$store.commit('addToCart', product)
    }
  },
  updated() {
    /* 因为下面这些子组件的标签用了 v-if 在mounted中还未渲染 所以在mounted中获取不到
        在updated中ref和数据都渲染了，可以获取
    */
    // 每次更新的时候重置 this.themeTopYs = [0]
    /* 但是这时候图片可能还在加载中  所以获取到的高度不对
      所以放到图片加载完成后再获取
    */
    // this.themeTopYs = [0]
    // console.log(this.$refs.DetailParamInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.DetailParamInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.DetailCommentInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.GoodsList.$el.offsetTop)
  },
  // 这里不要忘记写！！！
  mixins: [itemListenerMixin, backTopMixin]
}
</script>

<style>
  /* 详情页的内容不让tabbar盖住 */
  #detail{
    position: relative;
    z-index: 10;
  }

  /* 设置可滚动的高度 */
  .scroll{
    height: calc(100vh - var(--nav-bar-height));
    background-color: #fff;
  }
  /* 防止navbar在页面上滑的时候被挡到 */
  .detail-nav-bar{
    /* 能用相对定位的就不要用绝对定位和fixed */
    position: relative;
    z-index: 9;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
  }
</style>
