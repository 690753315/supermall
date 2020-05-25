// 存放公共的工具类、方法

// 防抖函数
export function debounce(func, delay){
  let timer = null
  // 闭包
  return function(...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() =>{
      func.apply(this, args)
    }, 100)
  }
}