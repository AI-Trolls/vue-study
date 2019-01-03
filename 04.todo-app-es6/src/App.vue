<template>
  <div id="app">
		<todo-header></todo-header>
		<todo-input v-on:addTodoItem="addOneItem"></todo-input>
		<todo-list v-bind:propsdata="todoItems" 
			v-on:removeItem="removeOneItem" 
			v-on:toggleItem="toggleOneItem"></todo-list>
		<todo-footer v-on:clearAll="clearAllItems"></todo-footer>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
/*
	App.vue가Container component로서 모든 데이터 조작이 일어나고,
	나머지 컴포넌트는 Presentational component, 즉 UI적으로 표현만 함
	데이터 처리는 상위(App.vue)로 올려 처리
*/
export default {
	data() {
		return {
			todoItems: [],	
		}	
	},
	methods: {
		addOneItem(todoItem) {
			const obj = {completed: false, item: todoItem};
			localStorage.setItem(todoItem, JSON.stringify(obj));
			this.todoItems.push(obj);
		},
		removeOneItem(todoItem, index) {
			localStorage.removeItem(todoItem.item);
			this.todoItems.splice(index, 1);
		},
		toggleOneItem(index) {
			this.todoItems[index].completed = !this.todoItems[index].completed;
			localStorage.setItem(this.todoItems[index].item, JSON.stringify(this.todoItems[index]));
		},
		clearAllItems() {
			localStorage.clear();	
			this.todoItems = [];
		}
	},
	created() {
		if (localStorage.length > 0) {
			for (let i = 0; i < localStorage.length; i ++) {
				console.log('this', localStorage.getItem(localStorage.key(i)));
				const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
				this.todoItems.push(item);
			}	
		}
	},
	components: {
		'todo-header': TodoHeader,
		'todo-input': TodoInput,
		'todo-list': TodoList,
		'todo-footer': TodoFooter,
	}	
}
</script>

<style>
body {
	text-align: center;
	background: rgb(233,233,233,0.5);
}
input {
	border-style: groove;
	width: 200px;
}
button {
	border-style: groove;
}
.shadow {
	box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
