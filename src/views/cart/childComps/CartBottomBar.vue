<template>
  <div class="cart-button-bar">
    <div class="select-all-button">
      <check-button class="check-button"
        :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      合计: {{totalPrice}}
    </div>
    <div class="total-length">
      去结算: {{totalLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapGetters} from 'vuex'
export default {
  name:"CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList
        .filter( item => item.isChecked )
        .reduce( (total, currentValue) => total + currentValue.price * currentValue.count, 0 )
        // .toFixed(2)
    },
    totalLength(){
      return this.cartList
        .filter( item => item.isChecked ).length
    },
    isSelectAll(){
      // 非0数字取反为false
      // return !(this.cartList.filter( item => !item.isChecked ).length)

      // 对象取反为false
      if ( this.cartList.length === 0 ) return false
      return !this.cartList.find( item => !item.isChecked )
    }
  },
  methods:{
    checkClick(){
      if ( this.isSelectAll ){
        this.cartList.forEach(currentValue => currentValue.isChecked = false )
      } else {
        this.cartList.forEach(currentValue => currentValue.isChecked = true )
      }
    }
  }
}
</script>

<style>
  .cart-button-bar{
    height: 40px;
    background-color: #ccc;
    /* 可见区域的高度 减去 导航栏 减去 底部 减去 CartBottomBar的40px  剩下的高度就是可滚动区域的高度
      相对的,可见区域的高度减去顶部，底部，滚动区域的高度，就是CartBottomBar高度
      CartBottomBar默认会出现先cart-list后面， 设置了position:relative;
      即使不设置top，bottom也还是会相对原来的位置，处于cart-list后面，
      且高度为除顶部，底部，cart-list后的所有可视区域的高度
    */
    position: relative;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }

  .cart-button-bar>div{
    height: 40px;
    line-height: 40px;
  }

  .select-all-button{
    display: flex;
    align-items: center;
  }

  .select-all-button .check-button{
    width: 20px;
    height: 20px;
    line-height: 5px;
    margin: 0 5px 0 10px;
  }

  .totalPrice{
    flex: 1;
  }

  .total-length{
    background-color: red;
    padding: 0 15px;
  }
</style>