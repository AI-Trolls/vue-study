# todo-app

## Vuex
- 컴포넌트가 정말 많아졌을 때 데이터를 효율적으로 관리하기 위해
- Flux 패턴(React)
	- 모든 데이터의 흐름이 한 방향으로 흐름(Unidirectional data flow)
		- Action => Dispatcher => Model(Store) => View => Action ...
		- 화면에서의 이벤트 혹은 사용자의 입력 => 데이터를 변경(메서드) => 화면에 표시할 데이터 => 사용자가 보는 화면
	- MVC 패턴	
		- Controller => Model <=> View (모델뷰가 서로 데이터를 주고 받고 갱신, 만약 뷰가 여러개라면 ...))
		- data 처리가 여러 방향으로 흐름
- 주요 속성 state(data property), getters(computed), mutations(method), actions(async method)
- Helper 기능

- Vuex가 필요한 이유? 
	- 컴포넌트간 통신을 이벤트버스(전역 Vue 객체 선언 후 이벤트용으로 활용)로 해결할 수 있지만
		- 혹은 props, this.$emit(event), v-on:event 를 이용한 해결
	- **"어디서 이벤트를 보냈는지, 어디서 이벤트를 받았는지 알기 어려워"**
	- 컴포넌트 간 데이터 전달이 명시적이지 않다
		- vuex를 통해 이를 명시적으로 표현할 수 있음
		- 여러 개의 컴포넌트가 같은 데이터 업데이트 할 시 동기화도 가능

- Vuex의 컨셉 (비유)
	- **State**: 컴포넌트 간에 공유하는 데이터 data()
	- **View**: 데이터를 표시하는 화면 template
	- **Action**: 사용자의 입력에 따라 데이터를 변경하는 methods
	- View => Actions => State => View => ...

- Vuex 구조
	- **컴포넌트 => 비동기 로직(actions) => 동기 로직(mutations) => 상태(state)**
		- state는 mutations(method)에서만 바꿀수 있다!
	![vuex structure](https://cdn-images-1.medium.com/max/701/1*vmhxmp5jRp-4Rtfh3skrgQ.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
