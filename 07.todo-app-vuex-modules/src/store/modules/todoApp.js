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

const state = {
	todoItems: storage.fetch()
};

const getters = {
	storedTodoItems(state) {
		return state.todoItems;	
	}
};

const mutations = {
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
	},
};

// default => 한 개의 파일에서 한개만 추출 될 수 있는걸 의미한다고함(?)
export default {
	state,
	getters,
	mutations,
}
