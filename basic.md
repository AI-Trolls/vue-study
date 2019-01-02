# cli 3 기반의 vue basic
강의 및 책을 통해 공부한 것 정리, 시행착오 정리

## vue cli 3
- [문서](https://cli.vuejs.org/guide/)

## 설치한 것
	```
	sudo npm i @vue/cli
	```

## 명령
	```
	vue -v

	vue create hello-world

	```

## ec2 환경에서 개발하기
- 외부 접근이 막혀있다. (이것 때문에 한두시간 날림)
	- vue.config.js 파일을 만들어 devServer에 대한 설정을 해줘야한다.
	```js
	module.exports = {
		devServer: {
			disableHostCheck: true
		}
	};
	- vue.config.js ? [참고문서](https://cli.vuejs.org/config/#global-cli-config)
	```
