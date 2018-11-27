# vue 정리
- 'vue.js 첫걸음' 및 강의 참고
- 헷갈리는 개념만 readme 에 정리
- 코드는 따로작성!

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

### 빌드(모듈화)방식/형식과, 빌드도구(모듈번들러) -> 일단 쓸줄 몰라도. 뭔지는 알고 있어야  
- 참고로 vue-cli는 기본 **'빌드' 템플릿**으로 webpack, browserify 등을 제공
  - 왜 **빌드**란 것이 필요 한 것인지????? 궁금스해서 정리함
  
- **빌드 도구**가 필요한 이유는, 자바스크립트가 **기본적으로 '모듈화 기능'을 지원하지 않기** 때문
  - 모듈화가 되어서 하나로 잘 묶인다면 브라우저에서 쓰기 편하니까 그런가?
    - ㅇㅇ, webpack 이나 browserify와 같은 모듈번들러를 이용하면   
      프로그램을 single file로 만들 수 있어 쉽게 배포 가능!
    
- **UMD** (Universal Module Definition) 빌드 방식
  - 'UMD 기반으로 작성한 모듈 파일'이 있으면 브라우저에서 vue.js 파일을 쉽게 사용할 수 있다!?
  - ★ Vue 라이브러리는 내부적으로 
    - (템플릿을 **컴파일하는 부분** + 컴파일된 코드 및 vue 코드를 실행하는 **런타임 부분**)으로 나눔
  - UMD 기반으로 번들링된 vue.js 라이브러리 파일의 경우에
    - (컴파일러 + 런타임 부분을 합한) 버전인 vue.js or vue.min.js
    - (런타임 부분만을 포함한) vue.runtime.js or vue.runtime.min.js 라이브러리 파일들을 제공한다.
  - 따라서 템플릿이 미리 컴파일 되어 있다면, 런타임 라이브러리만 포함시켜 번들링할 수 있다.  
    -> 이 경우 컴파일러가 없으므로 용량이 30%정도 줄어든다고함...(컴파일러까지 포함된 빌드 파일에 비해)
  - 그렇기 때문에, 만약 웹페이지에 vue template을 구현한다면,  
    웹페이지에 CDN을 추가할 때, 반드시 컴파일러가 포함된 라이브러리를 사용해야함.
    - 먼 느낌인지만 알겠다.

- UMD, CommonJS, Browserify, Webpack 등 듣도 보지도 못한 용어들이 계속 나오는데!!!!!
    - **UMD, CommonJS**는 **모듈 형식; 모듈 방식, 빌드 형식**을 말하는 것 같고
    - **Browserify, Webpack**은 모듈 형식에 기반한 **모듈 번들러; 빌드도구**를 의미하는 것 같다...  
    (책에 뭔가 두서없이 정리되어있어 답답스ㅡㅡ;)
    
- 번들러 역할은, 걍 **프로젝트를 번들화 해서 하나로 묶어**주는 역할인 듯 ( + 코드 난독화 및 압축의 효과 )

- **CommonJS**에 대해서 간략히 살펴보면 (이또한 UMD 같은 빌드 타입인듯 싶다)
  - ES6가 나오기 이전에 **자바스크립트 모듈화를 위해** 사용하던 것
  - Node.js 에서 채택한 방식이라고함
  - vue.js 는 commonjs 기반의 빌드를 위한 파일또한 제공한다 
    - (vue.common.js, vue.runtime.common.js)
    - commonjs 모듈 형식의 파일은 browserify, webpack 1등의 모듈 번들러와 사용 가능하다!!
      - 이 CommonJS 기반의 번들러인 **Browserify** 에 대해서 간단히 살펴보면
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
        var Vue = require("vue.common"); // commonjs 기반으로 제공되는 vue.js 파일

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
        브라우저에 구현이 안된 **CommonJS 기반으로 모듈을 불러오는 작업**을 위해서  
        js파일을 하나로 묶어버릴 수 있다.   
        (여기서 commonjs 기반의 모듈이 왜나오냐면, browserify에서 지원하는 '모듈 형식' 중 하나기 때문)
        bundle.js 라는 아웃풋으로.
        ```
        browserify main.js -o bundle.js
        ```
        파일 하나로 번들링 해버림 (bundle.js만 포함하면 vue.js 는따로 요청 안해도됨, 이미 합해져있어서)
        - 추가적으로, Browserify는 파일만 합쳐줄 뿐,  
          난독화/압축 작업 안하기 때문에 필요하면 uglify라는 것을 이용.
        - 주의할 점 하나, Browserify는 모듈 파일이 node_modules에 모두 존재해야 하므로, 주의
      - **Webpack 1**
        - 바로 앞 예제를 webpack 1 번들러를 통해서 번들링할 수도 있음
        - npm install -g webpack@1
        - webpack main.js bundle.js 하면 끝
        - 여러 추가 기능이 있음
  
- **ES Module**
  - UMD, CommonJS같은 모듈 방식(빌드 방식)
  - 2015년 발표한 ES6 이후 **서버사이드(nodejs) 및 클라이언트(웹페이지) 개발 모두에서 사용할 수** 있는 '모듈화 형식'
  - vue.js 는 ES6 이상의 모듈(ES Module)을 빌드하기 위해 vue.esm.js, vue.runtime.esm.js 를 제공함
    - ES 라이브러리? (ES6 스크립트에서 사용할 수 있도록 빌드된 vue.js 라이브러리 파일)
  - ES Module 빌드
    프로젝트 구조
    ```
    bundle
    - node_modules
      - sum.js
      - vue.js
    - webpack.config.js
    - main.js
    - index.html
    ```
    ES Module 빌드를 위해 vue.js 설치
    ```js
    npm install vue
    ```
    sum.js
    ```
    export default function (i, j) {
      return i + j;
    }
    ```
    main.js
    ```js
    import Vue from "vue"
    import sum from "sum"
    
    const app = new Vue({
     el: "#app",
     data: {
      message: sum(1, 5)
     }
    });
    ```
    이후에, **webpack 3 모듈 번들러** 필요
    ```
    npm install -g webpack@3
    ```
    webpack.config.js (앱을 빌드 할 때, 어떤 스크립트를 번들 파일로 만들고, 위치 시키고, 최적화 시킬지)
    ```js
    const webpack = require('webpack');
    var path = require('path');
    
    module.exports = {
      entry: {
        app: './main.js'  // app이라는 key는 [name]으로 재사용 가능, value는 번들링 대상
      },
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',  // 번들링 이후에 /dist/app.js 가 생성될 것임
        publicPath: '/'
      },
      plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
      ],
      resolve: { // ES Module을 불러 사용하기 위해 옵션 추가.
        alias: {
          'vue$': 'vue/dist/vue.esm.js' // js 파일에서 어떤 이름으로 ES Module을 참조할지 지정
        },
        extensions: ['.js'] // webpack 실행시, 명시된 확장자와 일치하는 파일 내에선(?) alias 옵션 참조 가능
      },
    }
    ```
    index.html
    ```html
    <div id="app">
      {{ message }}
    </div>
    <script src="dist/app.js"></script>
    ```
    마지막으로
    ```
    webpack
    ```
    명령어를 실행함으로써 app.js를 생성한다.
  
- 이 외에도, **Rollup 모듈 번들러**도 있다고함. (webpack3같은 ESM 전용 번들러) 
  - 궁금스 하면 책참고

