
import {
  ADD_TO_CART,
  ADD_COUNT
} from './mutations-types'

export default {
  [ADD_TO_CART](state, payload){
    payload.count = 1
    payload.isChecked = true
    state.cartList.push(payload)
  },
  [ADD_COUNT](state, payload){
    payload.count++
  }
}