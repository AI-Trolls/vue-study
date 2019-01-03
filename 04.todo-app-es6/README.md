# todo-app

## ES6

### const & let
- 블록({}) 단위 범위 제한
- const (상수), let (변수)

### Hoisting
- 인터프리터가 함수와 변수를 최상단으로 끌어 올린 것 처럼 인식한다.
- 코드 순서와 관계 없이 함수 '선언식'과 '변수(var)'를 위한 메모리 공간 먼저 확보
	```js
	var sum = 5;
	sum = sum + i;

	function sumAllNumbers() {
		// ...	
	}
	var i = 10;
	```
	```js
	// '선언'들만 hoisting
	var sum;
	function sumAllNumbers() {}
	var i;

	sum = 5;
	sum = sum + i;
	i = 10;
	```

### Arrow Function
- =>
	```js
	var sum = function(a, b) {
		return a + b;	
	}

	var sum = (a, b) => {
		return a + b;	
	}
	```
	```js
	var arr = ['a', 'b', 'c'];
	arr.forEach(function(value) {
		console.log(value);	
	});

	arr.forEach(value => console.log(value));
	```

### Enhanced Object Literals
- 객체의 속성을 메서드로 사용할 때 더 간단해짐
	```js
	var dictionary = {
		words: 100,
		// ES5
		lookup: function() {
			console.log('find words');	
		},
		// ES6
		lookup() {
			console.log("find words");	
		}
	}
	```
- 객체의 속성명과 값 명이 동일할 경우
	```js
	var figures = 10;
	var dic = {
		// figures: figures,	
		figures
	}
	```

### Modules
- es5 기준으로 자바스크립트에 모듈화 방법이 없었음
	- AMD, CommonJS 라이브러리 등을 써서 모듈화를 했었음
	- 모듈화를 왜하는데? 유용한 기능을 묶어 재사용
- 어쨌든 이제 js 언어 차원에서 지원하고, export 한 것들의 경우 호출될 때까지 실행/동작 안함
	```js
	// lib/math.js
	export funciton sum(x, y) {
		return x + y;	
	}
	export var pi = 3.141593;

	// math.js
	import { sum } from 'libs/math.js';
	sum(1, 2);
	```
- default export
	- 한 파일당 하나만 export 됨
	```js
	// util.js
	export default function (x) { // 익명!
		return console.log(x);
	}

	// main.js
	import util from 'util.js';
	console.log(util);
	util('hi');

	// app.js
	import log from 'util.js';
	console.log(log);
	log('hi');
	```

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
