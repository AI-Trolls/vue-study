const addOneItem = (state, todoItem) => {
	const obj = {completed: false, item: todoItem};
	localStorage.setItem(todoItem, JSON.stringify(obj));
	state.todoItems.push(obj);
}

const removeOneItem = (state, payload) => {
	const {todoItem, index} = payload;
	localStorage.removeItem(todoItem.item);
	state.todoItems.splice(index, 1);
}

const toggleOneItem = (state, index) => {
	localStorage.setItem(state.todoItems[index].item, JSON.stringify(state.todoItems[index]));
	state.todoItems[index].completed = !state.todoItems[index].completed;
}

const clearAllItems = (state) => {
	localStorage.clear();	
	state.todoItems = [];
}

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems }
