<template>
  <div id="detail">
    <!-- 注意props命名 -->
    <detail-nav-bar class="detail-nav-bar"/>
    <!-- 一定要设置可滚动的高度，不然不能滚动 -->
    <scroll class="scroll" ref="scroll">
      <detail-swiper :top-images="topImages"  />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends"/>
    </scroll>
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
  import {itemListenerMixin} from 'common/mixin'


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
    }
  },
  created(){
    // 获取商品的id
    this.id = this.$route.params.id
    // 获取详情页数据
    this.getDetail(this.id)
    // 获取商品推荐数据
    this.getRecommend()
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
    GoodsList
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
    }
  },
  mounted(){

  },
  destroyed() {
    this.$bus.$off('imageLoad', this.itemImgListener)
  },
  mixins: [itemListenerMixin]
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
  }
</style>