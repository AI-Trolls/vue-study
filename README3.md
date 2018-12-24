
## router 설정

1. src/main.js 파일에서
  ```js
  import router from './router'
  Vue.use(router)
  ```
  위 두줄을 추가하고, ```new Vue({``` 안에 ```render``` 추가!
  
2. router/index.js 파일 생성
router 폴더도 생성되어있지 않으니 생성!
index.js 파일의 내용은 아래와 같이!
```js
import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import About from '../components/About'

Vue.use(Router)
export default new Router ({
  routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
    {
    path: '/about',
    name: 'about',
    component: About
  },
  ]
})
```
이에 해당하는 components인 Home과 About이 생성되어있어야 함!

3. 스크롤바가 내용/바디/컨텐츠를 밀어내는 것을 막고 싶을 때,
  아래의 css style 코드를 추가!
  ```css
  html {
    overflow-y: scroll;
  }
  ```

## 추쳔
### Menu
[vue-quick-menu](https://ashleylv.github.io/vue-quick-menu/index.html#/) - This is web navigation component base on vue2.0+. It can be used in both PC and mobile.
[vue-burger-menu](https://vue-burger-menu.netlify.com/) - An off-canvas sidebar vue component with a collection of effects and styles using CSS transitions and SV
### Gallery
[vue-gallery](https://github.com/RobinCK/vue-gallery) - VueJS responsive and customizable image and video gallery, carousel and lightbox, optimized for both mobile and desktop web browsers.
G path animations.
