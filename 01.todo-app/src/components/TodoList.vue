<template>
	<div>
		<ul>
			<li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow">
				<i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
					v-on:click="toggleComplete(todoItem, index)"></i>
				<span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
				<span class="removeBtn" v-on:click="removeTodo(todoItem, index)">  
					<i class="fas fa-trash-alt"></i>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			todoItems: [],
		}	
	},
	methods: {
		removeTodo: function(todoItem, index) {
			console.log(todoItem, index);	
			localStorage.removeItem(todoItem.item);
			this.todoItems.splice(index, 1);
		},
		toggleComplete: function(todoItem, index) {
			todoItem.completed = !todoItem.completed;
			localStorage.removeItem(todoItem.item); // 없어도 됌
			localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
		}
	},
	created: function() {
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i ++) {
				var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
				this.todoItems.push(item);
			}	
		}
	}
}
</script>

<style scoped>
ul {
	list-style-type: none;
	padding-left: 0px;
	margin-top: 0;
	text-align: left;
}
li {
	display: flex;
	min-height: 50px;
	height: 50px;
	line-height: 50px;
	margin: 0.5rem 0;
	padding: 0 0.9rem;
	background: white;
	border-radius: 5px;
}
.removeBtn {
	margin-left: auto;
	color: #de4343;
	cursor: pointer;
}
.checkBtn {
	line-height: 45px;
	color: #62acde;
	margin-right: 5px;
	cursor: pointer;
}
.checkBtnCompleted {
	color: #b3adad;
}
.textCompleted {
	text-decoration: line-thorugh;
	color: #b3adad;
}
</style>

