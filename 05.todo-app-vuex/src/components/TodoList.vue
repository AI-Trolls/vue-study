<template>
	<div>
		<!-- name은 transition class(css) 이름과 관계됨 -->
		<transition-group name="list" tag="ul"> 
		<!--<ul>-->
			<li v-for="(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
				<i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
					v-on:click="toggleComplete(index)"></i>
				<span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
				<span class="removeBtn" v-on:click="removeTodo(todoItem, index)">  
					<i class="fas fa-trash-alt"></i>
				</span>
			</li>
		<!--</ul>-->
		</transition-group>
	</div>
</template>

<script>
export default {
	methods: {
		removeTodo(todoItem, index) {
			const payload = { todoItem, index };
			this.$store.commit('removeOneItem', payload);
		},
		toggleComplete(index) {
			this.$store.commit('toggleOneItem', index);
		}
	},
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
	text-decoration: line-through;
	color: #b3adad;
}

/* List-Transition https://vuejs.org/v2/guide/transitions.html#List-Transitions*/
/* https://vuejs.org/v2/guide/transitions.html#Transition-Classes */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>

