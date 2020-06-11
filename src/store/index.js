import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList : []
  },
  mutations:{
    addToCart(state, payload){

      // 判读当前商品是否重复添加到购物车，
      // 是的话，该商品的购买件数加1，
      // 不是的话把该商品加入到购物车，购物车商品的总数加一
      let oldProduct = state.cartList.find( item => item.iid === payload.iid )

      console.log( oldProduct )

      if ( !oldProduct ){
        payload.count = 1
        state.cartList.push(payload)
      } else {
        oldProduct.count++
      }
    }
  }
})

export default store