# vue 정리
- 'vue.js 첫걸음' 및 강의 참고

## vue-cli 2 기반 (vue cli 3는 따로 작성)

### CDN
- 웹페이지에 vue 라이브러리 포함시킬 경우 이용
```
https://unpkg.com/vue@<version>/dist/vue.js
https://unpkg.com/vue@<version/dist/vue.min.js

https://cdn.jsdelivr.net/npm/vue@<version>/dist/vue.js
https://cdn.jsdelivr.net/npm/vue@<version>/dist/vue.min.js

https://cdnjs.cloudflare.com/ajax/libs/vue/<version>/vue.js
https://cdnjs.cloudflare.com/ajax/libs/vue/<version>/vue.min.js
```

### vue-cli
- node는 알아서 설치
- npm install -g vue-cli (참고, vue-cli 3는 다르게 깔음)
- vue init webpack hello

### 빌드 도구 
- 참고로 vue-cli는 기본 **'빌드' 템플릿**으로 webpack, browserify 등을 제공
  - 왜 빌드란 것이 필요 한 것인지????? 궁금스해서 정리함
- **(한번쯤 봐둘만한 것 같지만, 책에 설명을 너무 못써놔서 나열만 해놓음)**
- **빌드 도구**가 필요한 이유는, 자바스크립트가 **기본적으로 '모듈화 기능'을 지원하지 않기** 때문
  - 모듈화가 되어서 하나로 잘 묶인다면 브라우저에서 쓰기 편하니까 그런가? 
  - **UMD** (Universal Module Definition)
    - Vue는 내부적으로 (템플릿의 **컴파일 부분** + 컴파일된 코드 및 vue 코드를 실행하는 **런타임 부분**)으로 나눔
    - UMD 기반으로 번들링한 vue.js 라이브러리 파일의 경우에 (컴파일러 + 런타임 부분을 합한 파일)을 제공함. 
      - (런타임만 포함시켜 번들링할 수도) -> 이 경우 컴파일러가 없으므로 용량이 30%정도 줄어든다고함...
    - 그렇기 때문에, 만약 template을 구현한다면, 웹페이지에 CDN을 쓸 때, 반드시 컴파일러가 포함된 라이브러리를 사용해야함.
      - 먼 느낌인진 알겠다.
- 방식만 다를 뿐 UMD 외에도 **'모듈 번들러'(문맥상 '빌드 도구'와 비슷한 말인듯 싶다)**는
  - CommonJS, Browserify, Webpack 등 여러가지가 있음
- 걍 **프로젝트를 번들화 해서 하나로 묶어**주는 역할인 듯
  - Browserify 에 대해서 간단히 살펴보면
    ```
    bundle
    - node_module
      - sum.js
      - vue.common.js (vue 라이브러리)
    - main.js
    - index.html
    ```
    sum.js
    ```js
    function sum(i, j) {
      return i + j
    }
    module.exports = sum;
    ```
    main.js
    ```js
    var sum = require("sum");
    var Vue = require("vue.common");
    
    var app = new Vue({
      el: "#app",
      data: {
        message: sum(1,3)
      }
    });
    ```
    index.html
    ```html
    <div id="app">
        {{ message }}
    </div>
    <script src="bundle.js"></script>
    ```
    뭐, 이런식으로 구조를 만들고 나서 **browserify를 이용한 번들링**을 하면!!
    브라우저에 구현이 안된 '모듈을 불러오는 작업'을 위해서 js파일을 하나로 묶어버릴 수 있다. bundle.js 라는 아웃풋으로.
    ```
    browserify main.js -o bundle.js
    ```
    파일 하나로 번들링 해버림 (bundle.js만 포함하면 vue.js 는따로 요청 안해도됨, 이미 합해져있어서)
    
