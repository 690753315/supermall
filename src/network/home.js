// 这里存放首页的所有网络请求
import {request} from './request.js';

export function getHomeMultidata(){
  return request({
    url: 'home/multidata'
  })
}