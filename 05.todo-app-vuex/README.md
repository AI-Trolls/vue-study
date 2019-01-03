# todo-app

## [참고 블로그](https://joshua1988.github.io/web-development/vuejs/vuex-start/)

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

- 설치
	```
	npm i vuex
	```

- store 생성
	- src/store/store.js 생성
	- src/main.js 에 임포트 및 추가

- Vuex 기술 요소
	- state: 여러 컴포넌트에 공유되는 데이터 data
		```js
		<p>{{ this.$store.state.message }}</p>
		```
	- getters: 연산된 state 값을 접근하는 속성 computed
		-	state 값에 대하여 computed 처럼 미리 연산된 값을 접근할 수 있는 기능
		```js
		// store.js
		state: {
			num: 10	
		},
		getters: {
			doubleNumber(state) {
				return state.num *= 2;	
			}	
		}

		// template
		<p>{{ this.$store.getters.doubleNumber }}</p>
		```
	- mutations: **state 값을 변경**하는 이벤트 로직/메서드 methods
		- state의 값을 변경할 수 있는 유일한 창구
		- **commit()** 으로 동작 (mutations을 동작시키는 명령어)
		```js
		// store.js
		state: { num: 10 },
		mutations: {
			addNumbers(state, anotherNum) {
				return state.num += anotherNum;	
			}
		}

		// App.vue
		this.$store.commit('addNumbers', 20);
		// 더 많은 인자를 넘겨줘야 한다면 { } 를 넘겨주면 됨(payload)
		```
		- **mutations에서만 상태를 변경해야 하는 이유**
			- 각 컴포넌트에서 this.$store.state.variable에 직접 접근해 변경을 할 수 있지만
				- 이렇게 하게되면, 어느 컴포넌트에서 해당 state를 변경했는지 추적이 어렵다.
				- state는 여러 컴포넌트에서 공유하고 있기 때문에, 각 컴포넌트에서 변경해버리면 추적을 해야하는데 이게 안돼
					- **어느 시점에 누가 뭐를 변경했는지 알기 어렵**
					- mutations 를 통한 변경만 devTools를 통해 추적 가능
				- 데이터가 바뀌면 이를 인지하고 업데이트 하는 반응성의 관점에서도 흐름을 망가뜨리게됨(화면 갱신)
	- actions: 비동기 처리 로직을 선언하는 메서드 async methods
		- data 요청, Promise, async와 같은 **비동기 처리**는 모두 actions에 선언
		```js
		// store.js
		state: {
			num: 10	
		},
		mutations: {
			doubleNumber(state) {
				state.num *= 2;	
			},
			setData(state, fetchedData) {
				state.product = fetchedData;	
			}
		},
		actions: {
			delayedDoubleNumber(context) {
				setTimeout(() => context.commit('doubleNumber'), 2000);
			},
			fetchProductData(context) {
				return axios.get('http:~~~')
										.then(resp => context.commit('setData', resp));
			}
		} 

		// App.vue
		this.$store.dispatch('delayedDoubleNumber');
		this.$store.dispatch('fetchProductData');
		```
		- 왜 actions에만 비동기 처리 로직을 두어야 하나
			- 이것도 마찬가지로, 각 컴포넌트에서 비동기 처리를 한 이후에 commit을 해버리면
			- vue 입장에선 어떤 컴포넌트가 몇초의 비동기 처리 이후에 어떤 commit을 한 것인지 추적이 안돼(컴포넌트가 많아질 수록)
			- 따라서 한 곳에 모아놓고 흐름을 추적 및 관리하겠다는 의도
				- 값 변경은 무조건 mutations로 들고가서 처리하고

- Vuex document
	- https://vuex.vuejs.org/guide/	


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
