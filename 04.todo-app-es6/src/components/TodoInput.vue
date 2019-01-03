<template>
	<!-- component당 root element는 하나만 --> 
	<div class="inputBox shadow">
		<input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
		<span class="addContainer" v-on:click="addTodo">
			<i class="fas fa-plus addBtn"></i>
		</span>

		<modal v-if="showModal" @close="showModal = false">
			<h3 slot="header">
				경고!
				<i class="fas fa-times closeModalBtn" @click="showModal = false"></i>
			</h3>
			<h3 slot="body">
				TodoItem을 입력하시오.
			</h3>
			<h3 slot="footer">
			</h3>
		</modal>
	</div>
</template>

<script>
import Modal from './common/Modal.vue';

export default {
	data() {
		return {
			newTodoItem: "",
			showModal: false,
		}	
	},
	methods: {
		addTodo() {
			if (this.newTodoItem !== '') {
				this.$emit('addTodoItem', this.newTodoItem); // to App.vue
				this.clearInput();
			} else {
				this.showModal = !this.showModal;	
			}
		},
		clearInput() {
			this.newTodoItem = "";	
		}
	},
	components: {
		modal: Modal,			
	}
}
</script>

<style scoped>
input:focus {
	outline: none;
}
.inputBox {
	background: white;
	height: 50px;
	line-height: 50px;
	border-radius: 5px;
}
.inputBox input {
	border-style: none;
	font-size: 0.9rem;
}
.addContainer {
	float: right;
	background: linear-gradient(right, #6478FB, #8763FB);
	display: block;
	width: 3rem;
	border-radius: 0 5px 5px 0;
	cursor: pointer;
}
.addBtn {
	color: white;
	vertical-align: middle;
}
.closeModalBtn {
	color: gray; 
	cursor: pointer;
}
</style>

