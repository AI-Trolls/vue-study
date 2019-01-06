# todo-app

## [참고 블로그](https://joshua1988.github.io/web-development/vuejs/vuex-start/)

## Vuex Helper
- 각 속성을 더 편하게 사용
- vue 권고 사항 => template은 최대한 깔끔하게 작성하라 연산은 script로 빼고!!
	- state -> mapState
		```js
		// App.vue
		import { mapState } from 'vuex'

		computed() {
			...mapState(['num'])	
			// num() { return this.$store.state.num; }
		}

		// store.js
		state: {
			num: 10	
		}

		// template
		<!--<p>{{ this.$store.state.num}}</p>-->
		<p>{{ this.num }}</p>
		```
	- getters -> mapGetters
		```js
		// App.vue
		import { mapGetters } from 'vuex'

		computed() { 
			...mapGetters(['reverseMessage']) 
		}

		// store.js
		getters: {
			reverseMessage(state) {
				return state.msg.split('').reverse().join('');	
			}	
		}

		// template
		<!-- <p>{{ this.$store.getters.reverseMessage }}</p> -->
		<p>{{ this.reverseMessage }}</p>
		```
	- mutations -> mapMutations
		```js
		// App.vue
		import { mapMutations } from 'vuex'

		methods: {
			...mapMutations(['clickBtn']),	
			authLogin() {},
			displayTable() {}
		}

		// store.js
		mutations: {
			clickBtn(state) {
				alert(state.msg);	 
			}	
		}
		```
	- actions -> mapActions
		```js
		// App.vue
		import { mapActions } from 'vuex

		methods: {
			...mapActions(['delayClickBtn']),
		}

		// store.js
		actions: {
			delayClickBtn(context) {
				setTimeout(() => context.commit('clickBtn'), 2000);	
			}	
		}

		```
- 정리하면, 헬퍼함수를 이용해서 스토어에 있는 메서드나 스테이트에 짧은 문법으로 접근할 수 있다는 편리함 

## ES6 object spread operator
	```js
	let josh = {
		field: 'web',
		language: 'js',
	}:
	let dev = {
		nation: 'korea',	
		...josh, // field만 뽑아서 추가해준다
	}
	console.log(dev);
	```

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
