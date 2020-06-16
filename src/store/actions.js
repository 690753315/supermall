import {
  ADD_TO_CART,
  ADD_COUNT
} from './mutations-types'

export default {
  addToCart({state, commit}, payload){
    return new Promise((resolve, reject ) => {
      let oldProduct = state.cartList.find( item => item.iid === payload.iid )

      if (!oldProduct){
        commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      } else {
        commit(ADD_COUNT, oldProduct)
        resolve('当前商品数量加1')
      }
    })
  }
}