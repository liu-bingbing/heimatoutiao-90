// 专门处理路由拦截器;
import router from '../router'

// 全局前置守卫，当路由发生改变时，这个方法里的回调函数就会执行
router.beforeEach(function (to, from, next) {
  // 权限拦截;认为有token让过，没有不让过;
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()// 直接放过；
  }
})
