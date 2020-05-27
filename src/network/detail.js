// 这里放详情页的所有请求
import  {request} from './request'

export function getDetail(id){
  return request({
    url: 'detail',
    params:{
      iid:id
    }
  })
}

// 导出商品详情页基本信息类
export class Goods {
  constructor(itemInfo, columns, services){
    this.title     = itemInfo.title
    this.desc      = itemInfo.desc
    this.newPrice  = itemInfo.price
    this.oldPrice  = itemInfo.oldPrice
    this.discount  = itemInfo.discountDesc
    this.columns   = columns
    this.services  = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 导出商品详情页店铺信息类
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}