<template>
  <div>
    <nav-bar class="nab-bar">
      <!-- 方法1 -->
      <!-- <div slot="center">购物车({{cartLength}})</div> -->

      <!-- 方法2 -->
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
  import {mapGetters} from 'vuex'
  import CartList from './childComps/CartList'
  import CartButtomBar from './childComps/CartBottomBar'

export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    CartButtomBar
  },
  computed:{
    // 方法1
    // ...mapGetters(['cartLength', 'cartList'])
    // 方法2
    ...mapGetters({
      length: 'cartLength',
      cartList:  'cartList'
    })
  }
}
</script>

<style>
  .nab-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>