// 这里存放首页的所有网络请求
import {request} from './request.js';

export function getHomeMultidata(){
  return request({
    url: 'api/n3/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url: 'api/n3/home/data',
    params: {
      type,
      page
    }
  })
}