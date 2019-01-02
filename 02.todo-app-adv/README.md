# todo-app

## 이전 프로젝트 까지의 문제점
- 컴포넌트간 통신이 없다, 같은 것을 의미하는 데이터를 별도로 각자 조작하고 있다.
	- TodoInput에서 todo를 추가해도 TodoList 컴포넌트가 다시 그려지지 못함(새로 고침을 해서 created가 실행되어야..)
	- 마찬가지로 TodoFooter에서 clear를 해도 TodoList가 모름

## 따라서
- 전체 컴포넌트가 하나의 데이터만 바라보도록 구조화
	- App.vue 한 곳에서 데이터를 관리 
	- 하위에 있는 컴포넌트 들은 데이터를 표현만 할 것임
	- 실질적인 데이터 조작에 관한 것은 App.vue(공통 상위 컴포넌트)
- App.vue는 컨테이너(비즈니스로직)라 표현함, 나머지 하위는 프레젠터 컴포넌트
- 데이터를 한 곳으로 모으고, 한 군데에서만 데이터 조작을 한다

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
