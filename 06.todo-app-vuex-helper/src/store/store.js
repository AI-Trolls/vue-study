import Vue from 'vue'
import Vuex from 'vuex'

// Make sure to call Vue.use(Vuex) first if using a module system
Vue.use(Vuex); // Vue plugin https://kr.vuejs.org/v2/guide/plugins.html

const storage = {
	fetch() {
		const arr = [];
		if (localStorage.length > 0) {
			for (let i = 0; i < localStorage.length; i ++) {
				console.log('this', localStorage.getItem(localStorage.key(i)));
				const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
				arr.push(item);
			}	
		}	
		return arr;
	}
}

export const store = new Vuex.Store({
	state: {
		todoItems: storage.fetch()
	},
	getters: {
		storedTodoItems(state) {
			return state.todoItems;	
		}
	},
	mutations: {
		addOneItem(state, todoItem) {
			const obj = {completed: false, item: todoItem};
			localStorage.setItem(todoItem, JSON.stringify(obj));
			state.todoItems.push(obj);
		},
		removeOneItem(state, payload) {
			const {todoItem, index} = payload;
			localStorage.removeItem(todoItem.item);
			state.todoItems.splice(index, 1);
		},
		toggleOneItem(state, index) {
			localStorage.setItem(state.todoItems[index].item, JSON.stringify(state.todoItems[index]));
			state.todoItems[index].completed = !state.todoItems[index].completed;
		},
		clearAllItems(state) {
			localStorage.clear();	
			state.todoItems = [];
		}		
	}
});

