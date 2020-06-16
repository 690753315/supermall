<template>
  <div class="cart-list">
    <scroll ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid"
        :product="item" />
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
export default {
  name:'CartList',
  computed:{
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    CartListItem
  },
  // 每次添加新商品后，购物车页面的高度会增加,
  // 所以当回到购物车页面的时候，最好先刷新下，获取最新的scrollerHeight
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style>
  .cart-list .wrapper{
    /* 可见区域的高度 减去 导航栏 减去 底部 减去 CartBottomBar的40px  剩下的高度就是可滚动区域的高度
      相对的,可见区域的高度减去顶部，底部，滚动区域的高度，就是CartBottomBar高度
      CartBottomBar默认会出现先cart-list后面， 设置了position:relative;即使不设置top，bottom也还是会相对原来的位置，处于cart-list后面，且高度为除顶部，底部，cart-list后的所有可视区域的高度
    */
    height:calc(100vh - var(--nav-bar-height) - var(--tab-bar-height) - 40px );
    overflow: hidden;
  }
</style>